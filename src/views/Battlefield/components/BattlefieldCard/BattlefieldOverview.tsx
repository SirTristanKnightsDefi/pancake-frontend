import React, { useMemo, useState, useCallback } from 'react'
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
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import {fetchBattlefieldPublicDataAsync} from 'state/battlefield'
import { useBattlefieldUser, useBattlefieldFromSymbol, usePriceCakeBusd, usePriceSquireBusd, usePriceLegendBusd, usePriceTableBusd } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'
import CardActionsContainer from './CardActionsContainer'
import ApyButton from './ApyButton'


export interface BattlefieldOverviewWithStakedValue extends Battlefield {
  apy?: BigNumber
  userArmyStrength?: BigNumber
  userArmyPercent?: BigNumber
}

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

interface BattlefieldOverviewProps {
  battlefield: BattlefieldOverviewWithStakedValue
}

const BattlefieldOverview: React.FC<BattlefieldOverviewProps> = ({ battlefield }) => {
  const TranslateString = useI18n()
  const knightPrice = usePriceCakeBusd();
  const squirePrice = usePriceSquireBusd();
  const legendPrice = usePriceLegendBusd();
  const tablePrice = usePriceTableBusd();

  const [showExpandableSection, setShowExpandableSection] = useState(false)

  const isCommunityBattlefield = communityBattlefields.includes(battlefield.tokenSymbol)
  // We assume the token name is coin pair + lp e.g. CAKE-BNB LP, LINK-BNB LP,
  // NAR-CAKE LP. The images should be cake-bnb.svg, link-bnb.svg, nar-cake.svg
  const battlefieldImage = battlefield.lpSymbol.split(' ')[0].toLocaleLowerCase()
  
  const { pid, lpAddresses } = useBattlefieldFromSymbol(battlefield.lpSymbol)
  const { allowance, tokenBalance, stakedBalance, earnings, userArmyStrength, userArmyPercent } = useBattlefieldUser(pid)
  const rawArmyStrength = getBalanceNumber(userArmyStrength)
  const rawArmyPercent = new BigNumber(getBalanceNumber(userArmyPercent)).multipliedBy(100).toFixed(6)
  const rawTotalArmyStrength = new BigNumber(battlefield.totalArmyStrength).toFixed(0)

  const lpLabel = battlefield.lpSymbol && battlefield.lpSymbol.toUpperCase().replace('PANCAKE', '')
  const battlefieldAPY = battlefield.apy && battlefield.apy.times(new BigNumber(100)).toNumber().toLocaleString('en-US').slice(0, -1)

  const { quoteTokenAdresses, quoteTokenSymbol, tokenAddresses } = battlefield
  const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAdresses, quoteTokenSymbol, tokenAddresses })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`

  // Hardcoded values on rewards per day, update these.  It beats making a separate call to each Battlefield for an overview card... maybe.
  const squireRewards = new BigNumber(getBalanceNumber(new BigNumber(rawArmyPercent).dividedBy(100).multipliedBy(1152000).multipliedBy(1e18))).toFixed(1);
  const knightRewards = new BigNumber(getBalanceNumber(new BigNumber(rawArmyPercent).dividedBy(100).multipliedBy(7200).multipliedBy(1e18))).toFixed(2);
  const legendRewards = new BigNumber(getBalanceNumber(new BigNumber(rawArmyPercent).dividedBy(100).multipliedBy(.5).multipliedBy(1e18))).toFixed(4);
  const tableRewards = new BigNumber(getBalanceNumber(new BigNumber(rawArmyPercent).dividedBy(100).multipliedBy(.0288).multipliedBy(1e18))).toFixed(6);

  const squireRewardValue = new BigNumber(squireRewards).multipliedBy(squirePrice).toFixed(2);
  const knightRewardValue = new BigNumber(knightRewards).multipliedBy(knightPrice).toFixed(2);
  const legendRewardValue = new BigNumber(legendRewards).multipliedBy(legendPrice).toFixed(2);
  const tableRewardValue = new BigNumber(tableRewards).multipliedBy(tablePrice).toFixed(2);
  const totalRewardValue = (Number(squireRewardValue)+Number(knightRewardValue)+Number(legendRewardValue)+Number(tableRewardValue)).toFixed(2);

  return (
    <FCard>
      <StyledCardAccent />
      <Text> Battle for rewards by sending SQUIRE, KNIGHT, LEGEND, and TABLE to war!</Text>
      <Divider/> 
      <Text> Total Army Strength: {battlefield.totalArmyStrength} </Text>
      <Divider/> 
      <Text> Your Army Strength: {rawArmyStrength} </Text>
      <Text> Your Army Percent: {rawArmyPercent}% </Text>
      <Divider/> 
      <Text> Your <b>Estimated</b> Daily Spoils:</Text>
      <Text> SQUIRE: {squireRewards} - ${squireRewardValue}</Text>
      <Text> KNIGHT: {knightRewards} - ${knightRewardValue}</Text>
      <Text> LEGEND: {legendRewards} - ${legendRewardValue}</Text>
      <Text> TABLE: {tableRewards} - ${tableRewardValue}</Text>
      <Text> Total: ${totalRewardValue} </Text>
    </FCard>
  )
}

export default BattlefieldOverview
