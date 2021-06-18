import React, { useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import styled, { keyframes } from 'styled-components'
import { Flex, Text, Skeleton } from '@pancakeswap-libs/uikit'
import { communityBattlefields } from 'config/constants'
import { Battlefield } from 'state/types'
import { provider } from 'web3-core'
import useI18n from 'hooks/useI18n'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import { QuoteToken } from 'config/constants/types'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import { getBalanceNumber } from 'utils/formatBalance'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { useBattlefieldFromSymbol, useBattlefieldUser } from 'state/hooks'
import { fetchBattlefieldUserArmyStrength } from 'state/battlefield/fetchBattlefieldUser'
import {fetchBattlefieldPublicDataAsync} from 'state/battlefield'
import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'
import CardActionsContainer from './CardActionsContainer'
import ApyButton from './ApyButton'

export interface BattlefieldWithStakedValue extends Battlefield {
  apy?: BigNumber
}

const Wrapper = styled.div`
  margin-top: 24px;
`
const RainbowLight = keyframes`
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

const StyledCardAccent = styled.div`
 background: linear-gradient(
    -45deg,
    #ff738e,
    #e4536f 20%,
    #a34054 40%,
    #b7eaff 60%,
    #92cee7 80%,
    #5dc4d9 100%
  );
  background-size: 300% 300%;
  animation: ${RainbowLight} 2s linear infinite;
  border-radius: 16px;
  filter: blur(8px);
  position: absolute;
  display: none;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`

const FCard = styled.div`
  align-self: baseline;
  background: ${(props) => props.theme.card.background};
  border-radius: 32px;
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 24px;
  position: relative;
  text-align: center;
`

const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.borderColor};
  height: 1px;
  margin: 28px auto;
  width: 100%;
`

const ExpandingWrapper = styled.div<{ expanded: boolean }>`
  height: ${(props) => (props.expanded ? '100%' : '0px')};
  overflow: hidden;
`

interface BattlefieldCardProps {
  battlefield: BattlefieldWithStakedValue
  removed: boolean
  cakePrice?: BigNumber
  legendPrice?: BigNumber
  tablePrice?: BigNumber
  squirePrice?: BigNumber
  shillingPrice?: BigNumber
  bnbPrice?: BigNumber
  ethPrice?: BigNumber
  ethereum?: provider
  account?: string
}

const BattlefieldCard: React.FC<BattlefieldCardProps> = ({ battlefield, removed, cakePrice, legendPrice, tablePrice, squirePrice, shillingPrice, bnbPrice, ethPrice, ethereum, account }) => {
  const TranslateString = useI18n()

  const [showExpandableSection, setShowExpandableSection] = useState(false)

  const isCommunityBattlefield = communityBattlefields.includes(battlefield.tokenSymbol)
  // We assume the token name is coin pair + lp e.g. CAKE-BNB LP, LINK-BNB LP,
  // NAR-CAKE LP. The images should be cake-bnb.svg, link-bnb.svg, nar-cake.svg
  const battlefieldImage = battlefield.lpSymbol.split(' ')[0].toLocaleLowerCase()
  const { stakedBalance, earnings } = useBattlefieldUser(battlefield.pid)

  const rewardsBalance = battlefield.rewardsBalance
  const formattedRewardsBalance = new BigNumber(rewardsBalance).toNumber().toLocaleString()
  const formattedTotalAtWarBalance = new BigNumber(battlefield.quoteTokenAmount).toNumber().toLocaleString()

  // const userArmyStrength = fetchBattlefieldUserArmyStrength(account)

  const stakedValue: BigNumber = useMemo(() => {
    if (!stakedBalance) {
      return null
    }
    if (battlefield.tokenSymbol === QuoteToken.BNB) {
      return bnbPrice.times(stakedBalance)
    }
    if (battlefield.tokenSymbol === QuoteToken.CAKE) {
      return cakePrice.times(stakedBalance)
    }
    if (battlefield.tokenSymbol === QuoteToken.KNIGHT) {
      return cakePrice.times(stakedBalance)
    }
    if (battlefield.tokenSymbol === QuoteToken.ETH) {
      return ethPrice.times(stakedBalance)
    }
    if (battlefield.tokenSymbol === QuoteToken.LEGEND) {
      return legendPrice.times(stakedBalance)
    }
    if (battlefield.tokenSymbol === QuoteToken.TABLE) {
      return tablePrice.times(stakedBalance)
    }
    if (battlefield.tokenSymbol === QuoteToken.SQUIRE) {
      return squirePrice.times(stakedBalance)
    }
    if (battlefield.tokenSymbol === QuoteToken.SHILLING) {
      return shillingPrice.times(stakedBalance)
    }
    return new BigNumber(0)
  }, [bnbPrice, cakePrice, ethPrice, legendPrice, tablePrice, squirePrice, shillingPrice, stakedBalance, battlefield.tokenSymbol])

  const holderRewardValue: BigNumber = useMemo(() => {
    if (!earnings) {
      return null
    }
    if (battlefield.tokenSymbol === QuoteToken.BNB) {
      return bnbPrice.times(earnings)
    }
    if (battlefield.tokenSymbol === QuoteToken.CAKE) {
      return cakePrice.times(earnings)
    }
    if (battlefield.tokenSymbol === QuoteToken.KNIGHT) {
      return cakePrice.times(earnings)
    }
    if (battlefield.tokenSymbol === QuoteToken.ETH) {
      return ethPrice.times(earnings)
    }
    if (battlefield.tokenSymbol === QuoteToken.LEGEND) {
      return legendPrice.times(earnings)
    }
    if (battlefield.tokenSymbol === QuoteToken.TABLE) {
      return tablePrice.times(earnings)
    }
    if (battlefield.tokenSymbol === QuoteToken.SQUIRE) {
      return squirePrice.times(earnings)
    }
    if (battlefield.tokenSymbol === QuoteToken.SHILLING) {
      return shillingPrice.times(earnings)
    }
    return new BigNumber(0)
  }, [bnbPrice, cakePrice, ethPrice, legendPrice, tablePrice, squirePrice, shillingPrice, earnings, battlefield.tokenSymbol])

  const rewardValue: BigNumber = useMemo(() => {
    if (!rewardsBalance) {
      return null
    }
    if (battlefield.tokenSymbol === QuoteToken.BNB) {
      return bnbPrice.times(rewardsBalance).times(1e18)
    }
    if (battlefield.tokenSymbol === QuoteToken.CAKE) {
      return cakePrice.times(rewardsBalance).times(1e18)
    }
    if (battlefield.tokenSymbol === QuoteToken.KNIGHT) {
      return cakePrice.times(rewardsBalance).times(1e18)
    }
    if (battlefield.tokenSymbol === QuoteToken.ETH) {
      return ethPrice.times(rewardsBalance).times(1e18)
    }
    if (battlefield.tokenSymbol === QuoteToken.LEGEND) {
      return legendPrice.times(rewardsBalance).times(1e18)
    }
    if (battlefield.tokenSymbol === QuoteToken.TABLE) {
      return tablePrice.times(rewardsBalance).times(1e18)
    }
    if (battlefield.tokenSymbol === QuoteToken.SQUIRE) {
      return squirePrice.times(rewardsBalance).times(1e18)
    }
    if (battlefield.tokenSymbol === QuoteToken.SHILLING) {
      return shillingPrice.times(rewardsBalance).times(1e18)
    }
    return new BigNumber(0)
  }, [bnbPrice, cakePrice, ethPrice, legendPrice, tablePrice, squirePrice, shillingPrice, battlefield.tokenSymbol, rewardsBalance])

  const tvlValue: BigNumber = useMemo(() => {
    if (!battlefield.quoteTokenAmount) {
      return null
    }
    if (battlefield.tokenSymbol === QuoteToken.BNB) {
      return bnbPrice.times(battlefield.quoteTokenAmount).times(1e18)
    }
    if (battlefield.tokenSymbol === QuoteToken.CAKE) {
      return cakePrice.times(battlefield.quoteTokenAmount).times(1e18)
    }
    if (battlefield.tokenSymbol === QuoteToken.KNIGHT) {
      return cakePrice.times(battlefield.quoteTokenAmount).times(1e18)
    }
    if (battlefield.tokenSymbol === QuoteToken.ETH) {
      return ethPrice.times(battlefield.quoteTokenAmount).times(1e18)
    }
    if (battlefield.tokenSymbol === QuoteToken.LEGEND) {
      return legendPrice.times(battlefield.quoteTokenAmount).times(1e18)
    }
    if (battlefield.tokenSymbol === QuoteToken.TABLE) {
      return tablePrice.times(battlefield.quoteTokenAmount).times(1e18)
    }
    if (battlefield.tokenSymbol === QuoteToken.SQUIRE) {
      return squirePrice.times(battlefield.quoteTokenAmount).times(1e18)
    }
    if (battlefield.tokenSymbol === QuoteToken.SHILLING) {
      return shillingPrice.times(battlefield.quoteTokenAmount).times(1e18)
    }
    return new BigNumber(0)
  }, [bnbPrice, cakePrice, ethPrice, legendPrice, tablePrice, squirePrice, shillingPrice, battlefield.tokenSymbol, battlefield.quoteTokenAmount])

  const stakedBalanceFormatted = getBalanceNumber(stakedValue).toLocaleString()
  const rewardBalanceFormatted = getBalanceNumber(rewardValue).toLocaleString()
  const tvlBalanceFormatted = getBalanceNumber(tvlValue).toLocaleString()
  const holderRewardValueFormatted = getBalanceNumber(holderRewardValue).toLocaleString()
  const earnedValue = holderRewardValue

  const lpLabel = battlefield.lpSymbol && battlefield.lpSymbol.toUpperCase().replace('PANCAKE', '')
  const battlefieldAPY = battlefield.apy && battlefield.apy.times(new BigNumber(100)).toNumber().toLocaleString('en-US').slice(0, -1)
  
  const { quoteTokenAdresses, quoteTokenSymbol, tokenAddresses } = battlefield
  const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAdresses, quoteTokenSymbol, tokenAddresses })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`

  return (
    <FCard>
      <CardHeading
        lpLabel={lpLabel}
        multiplier={battlefield.multiplier}
        isCommunityBattlefield={isCommunityBattlefield}
        battlefieldImage={battlefieldImage}
        tokenSymbol={battlefield.tokenSymbol}
        burnPct = {battlefield.burnPct}
        rewardPoolPct = {battlefield.rewardPoolPct}
        externalFeePct = {battlefield.externalFeePct}
        rewardRate = {battlefield.rewardRate}
        earnedValue = {earnedValue}
      />
      <CardActionsContainer battlefield={battlefield} ethereum={ethereum} account={account} addLiquidityUrl={addLiquidityUrl} earnedValue = {earnedValue} stakedBalanceFormatted={stakedBalanceFormatted} />
      <Divider />
      <ExpandableSectionButton
        onClick={() => setShowExpandableSection(!showExpandableSection)}
        expanded={showExpandableSection}
        showText="Details"
        hideText="Hide"
      />
      <ExpandingWrapper expanded={showExpandableSection}>
        <Wrapper>
          <Text >Total at War:</Text> 
          <Text fontSize="14px">{formattedTotalAtWarBalance} (~${tvlBalanceFormatted})</Text>
          <Text>Total Rewards Remaining:</Text> 
          <Text fontSize="14px">{formattedRewardsBalance} (~${rewardBalanceFormatted})</Text>
        </Wrapper>
      </ExpandingWrapper>
    </FCard>
  )
}

export default BattlefieldCard
