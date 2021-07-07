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
import { useBattlefield, usePriceBnbBusd, usePriceCakeBusd, usePriceEthBusd, usePriceLegendBusd, usePriceTableBusd, usePriceSquireBusd, usePriceShillingBusd } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { fetchBattlefieldUserDataAsync } from 'state/actions'
import { QuoteToken } from 'config/constants/types'
import useTheme from 'hooks/useTheme'
import BattlefieldCard, { BattlefieldWithStakedValue } from './components/BattlefieldCard/BattlefieldCard'
import BattlefieldRewards from './components/BattlefieldCard/BattlefieldRewards'
import BattlefieldOverview from './components/BattlefieldCard/BattlefieldOverview'
import {ShillingRewardsCard} from './components/BattlefieldCard/ShillingRewardsCard'
import Divider from './components/Divider'
import AllAction from './components/AllAction'


const Battlefield: React.FC = () => {
  const { path } = useRouteMatch()
  const battlefieldLP = useBattlefield()
  const cakePrice = usePriceCakeBusd()
  const legendPrice = usePriceLegendBusd()
  const squirePrice = usePriceSquireBusd()
  const tablePrice = usePriceTableBusd()
  const shillingPrice = usePriceShillingBusd()
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

  const activeBattlefields = battlefieldLP.filter((battlefield) => battlefield.visible === true)
  const inactiveBattlefields = battlefieldLP.filter((battlefield) => battlefield.multiplier === '0X')
  const stackedOnlyBattlefields = activeBattlefields.filter(
    (battlefield) => battlefield.userData && new BigNumber(battlefield.userData.stakedBalance).isGreaterThan(0),
  )
  
  const { isDark } = useTheme();
  const battleFieldDarkImage = "https://ipfs.io/ipfs/QmPxSu2ABG4Z3mZkYb4kHwc8RqYwZVKwXoaz8isAPxpF1x?filename=BattlefieldDark.png";
  const battleFieldLightImage = "https://ipfs.io/ipfs/QmVfZmVEcSs5LYfRGc3BcCpNZu48eC2dVXAg6PPyqsWc4T?filename=BattlefieldLogo.PNG";

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
          legendPrice={legendPrice}
          tablePrice={tablePrice}
          squirePrice={squirePrice}
          shillingPrice={shillingPrice}
          ethPrice={ethPriceUsd}
          ethereum={ethereum}
          account={account}
        />
      ))
    },
    [battlefieldLP, bnbPrice, legendPrice, tablePrice, squirePrice, shillingPrice, ethPriceUsd, cakePrice, ethereum, account],
  )

  return (
    <Page>
      <div>
      <FlexLayout>
        <Route exact path={`${path}`}>
          <Heading as="h1" size="xl">
            <BattlefieldOverview
              battlefield={
                activeBattlefields[0]
              }
            />
          </Heading>
          <BattlefieldRewards
            
            battlefield={
              activeBattlefields[0]
            } 
            account={account} 
            />
              
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
        <Divider/>
        <Text>*Army Strength is calculated as follows:</Text>
      <Text>(SQUIRE*1e18 + (KNIGHT*1e18 * 500)) * 2^(floor(log10((TABLE*1e18 * LEGEND*1e18 * 5)))</Text>
      </div>
      <Hero><ShillingRewardsCard/></Hero>
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
