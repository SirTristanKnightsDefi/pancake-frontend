import React, { useEffect, useCallback, useState } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import { Heading, Text } from '@pancakeswap-libs/uikit'
import { BLOCKS_PER_YEAR, CAKE_PER_BLOCK, CAKE_POOL_PID } from 'config'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import { useBattlefield, usePriceBnbBusd, usePriceCakeBusd, usePriceEthBusd } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { fetchBattlefieldUserDataAsync } from 'state/actions'
import { QuoteToken } from 'config/constants/types'
import BattlefieldCard, { BattlefieldWithStakedValue } from './components/BattlefieldCard/BattlefieldCard'
import BattlefieldTabButtons from './components/BattlefieldTabButtons'
import Divider from './components/Divider'
import AllAction from './components/AllAction'

const Battlefield: React.FC = () => {
  const { path } = useRouteMatch()
  const battlefieldLP = useBattlefield()
  const cakePrice = usePriceCakeBusd()
  const bnbPrice = usePriceBnbBusd()
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const ethPriceUsd = usePriceEthBusd()
  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if (account) {
      dispatch(fetchBattlefieldUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const [stackedOnly, setStackedOnly] = useState(false)
  
  const Action = styled.div`
  padding-top: 16px;
`

  const activeBattlefields = battlefieldLP.filter((battlefield) => battlefield.multiplier !== '0X')
  const inactiveBattlefields = battlefieldLP.filter((battlefield) => battlefield.multiplier === '0X')
  const stackedOnlyBattlefields = activeBattlefields.filter(
    (battlefield) => battlefield.userData && new BigNumber(battlefield.userData.stakedBalance).isGreaterThan(0),
  )
  // /!\ This function will be removed soon
  // This function compute the APY for each battlefield and will be replaced when we have a reliable API
  // to retrieve assets prices against USD
  const battlefieldList = useCallback(
    (battlefieldToDisplay, removed: boolean) => {
      const cakePriceVsBNB = new BigNumber(battlefieldLP.find((battlefield) => battlefield.pid === CAKE_POOL_PID)?.tokenPriceVsQuote || 0)
      const battlefieldToDisplayWithAPY: BattlefieldWithStakedValue[] = battlefieldToDisplay.map((battlefield) => {
        if (!battlefield.tokenAmount || !battlefield.lpTotalInQuoteToken || !battlefield.lpTotalInQuoteToken) {
          return battlefield
        }
        const cakeRewardPerBlock = CAKE_PER_BLOCK.times(battlefield.poolWeight)
        const cakeRewardPerYear = cakeRewardPerBlock.times(BLOCKS_PER_YEAR)

        // cakePriceInQuote * cakeRewardPerYear / lpTotalInQuoteToken
        let apy = cakePriceVsBNB.times(cakeRewardPerYear).div(battlefield.lpTotalInQuoteToken)

        if (battlefield.quoteTokenSymbol === QuoteToken.BUSD || battlefield.quoteTokenSymbol === QuoteToken.UST) {
          apy = cakePriceVsBNB.times(cakeRewardPerYear).div(battlefield.lpTotalInQuoteToken).times(bnbPrice)
        } else if (battlefield.quoteTokenSymbol === QuoteToken.ETH) {
          apy = cakePrice.div(ethPriceUsd).times(cakeRewardPerYear).div(battlefield.lpTotalInQuoteToken)
        } else if (battlefield.quoteTokenSymbol === QuoteToken.CAKE) {
          apy = cakeRewardPerYear.div(battlefield.lpTotalInQuoteToken)
        } else if (battlefield.quoteTokenSymbol === QuoteToken.KNIGHT) {
          apy = cakeRewardPerYear.div(battlefield.lpTotalInQuoteToken)
        } else if (battlefield.dual) {
          const cakeApy =
            battlefield && cakePriceVsBNB.times(cakeRewardPerBlock).times(BLOCKS_PER_YEAR).div(battlefield.lpTotalInQuoteToken)
          const dualApy =
            battlefield.tokenPriceVsQuote &&
            new BigNumber(battlefield.tokenPriceVsQuote)
              .times(battlefield.dual.rewardPerBlock)
              .times(BLOCKS_PER_YEAR)
              .div(battlefield.lpTotalInQuoteToken)

          apy = cakeApy && dualApy && cakeApy.plus(dualApy)
        }

        return { ...battlefield, apy }
      })
      return battlefieldToDisplayWithAPY.map((battlefield) => (
        <BattlefieldCard
          key={battlefield.pid}
          battlefield={battlefield}
          removed={removed}
          bnbPrice={bnbPrice}
          cakePrice={cakePrice}
          ethPrice={ethPriceUsd}
          ethereum={ethereum}
          account={account}
        />
      ))
    },
    [battlefieldLP, bnbPrice, ethPriceUsd, cakePrice, ethereum, account],
  )

  return (
    <Page>
      <Hero>
        <img
          src="/images/battlefield/battlefield.png"
          alt="Battlefield icon"
          style={{
            height: '320px',
            marginRight: '48px',
          }}
        />
        <Heading as="h1" size="xl" mb="16px">
          Send your troops to battle for spoils of war!
        </Heading>
      </Hero>
      <div>
        <FlexLayout>
          <Route exact path={`${path}`}>
              <AllAction />
          </Route>
        </FlexLayout>
      </div>
      <div>
        <FlexLayout>
          <Route exact path={`${path}`}>
            {stackedOnly ? battlefieldList(stackedOnlyBattlefields, false) : battlefieldList(activeBattlefields, false)}
          </Route>
          <Route exact path={`${path}/history`}>
            {battlefieldList(inactiveBattlefields, true)}
          </Route>
        </FlexLayout>
      </div>
    </Page>
  )
}

const Hero = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  justify-content: center;
  padding: 48px 0;
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    font-size: 16px;
    li {
      margin-bottom: 4px;
    }
  }
`

export default Battlefield
