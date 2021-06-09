import React, {useState} from 'react'
import BigNumber from 'bignumber.js'
import styled, { keyframes } from 'styled-components'
import { Text, Button, Heading} from '@pancakeswap-libs/uikit'
import { Battlefield } from 'state/types'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { useBattlefieldUser, useBattlefieldFromSymbol, usePriceCakeBusd, usePriceSquireBusd, usePriceLegendBusd, usePriceTableBusd, usePriceShillingBusd } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'



export interface BattlefieldOverviewWithStakedValue extends Battlefield {
  apy?: BigNumber
  userArmyStrength?: BigNumber
  userArmyPercent?: BigNumber
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

interface BattlefieldOverviewProps {
  battlefield: BattlefieldOverviewWithStakedValue
}

const BattlefieldOverview: React.FC<BattlefieldOverviewProps> = ({ battlefield }) => {
  const knightPrice = usePriceCakeBusd()
  const squirePrice = usePriceSquireBusd()
  const legendPrice = usePriceLegendBusd()
  const tablePrice = usePriceTableBusd()
  const shillingPrice = usePriceShillingBusd()
  const [showExpandableSection, setShowExpandableSection] = useState(false)
  
  const { pid, lpAddresses } = useBattlefieldFromSymbol(battlefield.lpSymbol)
  const { allowance, tokenBalance, stakedBalance, earnings, userArmyStrength, userArmyPercent } = useBattlefieldUser(pid)
  const rawArmyStrength = getBalanceNumber(userArmyStrength).toLocaleString()
  const rawArmyPercent = new BigNumber(getBalanceNumber(userArmyPercent)).multipliedBy(100).toFixed(6)
  const rawTotalArmyStrength = new BigNumber(battlefield.totalArmyStrength).toNumber().toLocaleString()

  const lpLabel = battlefield.lpSymbol && battlefield.lpSymbol.toUpperCase().replace('PANCAKE', '')
  const battlefieldAPY = battlefield.apy && battlefield.apy.times(new BigNumber(100)).toNumber().toLocaleString('en-US').slice(0, -1)

  const { quoteTokenAdresses, quoteTokenSymbol, tokenAddresses } = battlefield
  const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAdresses, quoteTokenSymbol, tokenAddresses })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`

  // Hardcoded values on rewards per day, update these.  It beats making a separate call to each Battlefield for an overview card... maybe.
  const squireRewards = new BigNumber(getBalanceNumber(new BigNumber(rawArmyPercent).dividedBy(100).multipliedBy(2304000).multipliedBy(1e18))).toFixed(0);
  const knightRewards = new BigNumber(getBalanceNumber(new BigNumber(rawArmyPercent).dividedBy(100).multipliedBy(7200).multipliedBy(1e18))).toFixed(1);
  const legendRewards = new BigNumber(getBalanceNumber(new BigNumber(rawArmyPercent).dividedBy(100).multipliedBy(.5).multipliedBy(1e18))).toFixed(4);
  const tableRewards = new BigNumber(getBalanceNumber(new BigNumber(rawArmyPercent).dividedBy(100).multipliedBy(.0288).multipliedBy(1e18))).toFixed(6);
  const shillingRewards = new BigNumber(getBalanceNumber(new BigNumber(rawArmyPercent).dividedBy(100).multipliedBy(2880000000).multipliedBy(1e18))).toFixed(0);
  const formattedSquireRewards = new BigNumber(squireRewards).toNumber().toLocaleString()
  const formattedKnightRewards = new BigNumber(knightRewards).toNumber().toLocaleString()
  const formattedTableRewards = new BigNumber(tableRewards).toNumber().toLocaleString()
  const formattedLegendRewards = new BigNumber(legendRewards).toNumber().toLocaleString()
  const formattedShillingRewards = new BigNumber(shillingRewards).toNumber().toLocaleString()

  const squireRewardValue = new BigNumber(squireRewards).multipliedBy(squirePrice).toFixed(2);
  const knightRewardValue = new BigNumber(knightRewards).multipliedBy(knightPrice).toFixed(2);
  const legendRewardValue = new BigNumber(legendRewards).multipliedBy(legendPrice).toFixed(2);
  const tableRewardValue = new BigNumber(tableRewards).multipliedBy(tablePrice).toFixed(2);
  const shillingRewardValue = ((shillingPrice.isGreaterThan(0)) ? (new BigNumber(shillingRewards).multipliedBy(shillingPrice).toFixed(2)) : 0)

  const totalRewardValue = (Number(squireRewardValue)+Number(knightRewardValue)+Number(legendRewardValue)+Number(tableRewardValue)+Number(shillingRewardValue)).toFixed(2);

  return (
    <FCard>
      <StyledCardAccent />
      <Heading mb="8px"> The Battlefield </Heading>
      <Text> Earn multiple reward tokens at the same time by sending SQUIRE, KNIGHT, LEGEND, and TABLE to war!</Text>
      <Divider />
      <Button as="a" variant="secondary" mt="12px" ml="12px" href="https://docs.knightsdefi.com/battlefield" target="_blank">
            Read More
      </Button>
      <Divider/>
      <ExpandableSectionButton
        onClick={() => setShowExpandableSection(!showExpandableSection)}
        expanded={showExpandableSection}
        showText="Details"
        hideText="Hide"
      />
      <ExpandingWrapper expanded={showExpandableSection}>
        <Wrapper>
          <Text> Total Army Strength: {rawTotalArmyStrength} </Text>
          <Divider/> 
          <Text> Your Army Strength: {rawArmyStrength} </Text>
          <Text> Your Army Percent: {rawArmyPercent}% </Text>
          <Divider/> 
          <Text> Your <b>Estimated</b> Daily Spoils:</Text>
          <Text> SHILLING: {formattedShillingRewards} - ${shillingRewardValue}</Text>
          <Text> SQUIRE: {formattedSquireRewards} - ${squireRewardValue}</Text>
          <Text> KNIGHT: {knightRewards} - ${knightRewardValue}</Text>
          <Text> LEGEND: {legendRewards} - ${legendRewardValue}</Text>
          <Text> TABLE: {tableRewards} - ${tableRewardValue}</Text>
          <Text> Total: ${totalRewardValue} </Text>
        </Wrapper>
      </ExpandingWrapper>
    </FCard>
  )
}

export default BattlefieldOverview
