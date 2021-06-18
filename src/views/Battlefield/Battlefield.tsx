import React, { useEffect, useCallback, useState } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import { Heading, Text, Link, Flex } from '@pancakeswap-libs/uikit'
import { BLOCKS_PER_YEAR, CAKE_PER_BLOCK, CAKE_POOL_PID } from 'config'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import { useBattlefield, usePriceBnbBusd, usePriceCakeBusd, usePriceEthBusd, usePriceLegendBusd, usePriceTableBusd, usePriceSquireBusd, usePriceShillingBusd } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { fetchBattlefieldUserDataAsync } from 'state/actions'
import { QuoteToken } from 'config/constants/types'
import useTheme from 'hooks/useTheme'
import BattlefieldCard, { BattlefieldWithStakedValue } from './components/BattlefieldCard/BattlefieldCard'
import {CummiesLPStakingCard} from './components/BattlefieldCard/CummiesLPStakingCard'
import { ShillingRewardsCard } from './components/BattlefieldCard/ShillingRewardsCard'
import BattlefieldOverview from './components/BattlefieldCard/BattlefieldOverview'
import Divider from './components/Divider'
import AllAction from './components/AllAction'


const AddressLink = styled(Link)`
  display: inline-block;
  font-weight: 400;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 80px;
  white-space: nowrap;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 16px;
    width: auto;
  }
`

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
      <Hero>
          <CummiesLPStakingCard />
      </Hero>
      
      <div>
        <FlexLayout>
            {battlefieldList(activeBattlefields, true)}
        </FlexLayout>
        <Divider/>
        <FlexLayout>
          <Flex>
            <Text>In collaboration with <Link href="https://www.knightsdefi.com">Knights Defi</Link></Text>
          </Flex>
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
