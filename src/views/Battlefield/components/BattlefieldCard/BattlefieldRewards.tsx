import React, {useState, useEffect} from 'react'
import BigNumber from 'bignumber.js'
import styled, { keyframes } from 'styled-components'
import { Text, Button, Heading, Link} from '@pancakeswap-libs/uikit'
import { Battlefield } from 'state/types'
import useWeb3 from 'hooks/useWeb3'
import useRefresh from 'hooks/useRefresh'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import FlexLayout from 'components/layout/Flex'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { useBattlefieldShillingWithdraw } from 'hooks/useUnstake'
import { getBattlefieldContract, getShillingContract } from 'utils/contractHelpers'
import UnlockButton from 'components/UnlockButton'
import { useBattlefield, useBattlefieldUser, useBattlefieldFromSymbol, usePriceCakeBusd, usePriceSquireBusd, usePriceLegendBusd, usePriceTableBusd, usePriceShillingBusd } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import useBattlefieldWithBalance from 'hooks/useBattlefieldWithBalance'
import HarvestAction from './HarvestAction'
import HarvestOnlyAction from './HarvestOnlyAction'
import AllAction from '../AllAction'


type State = {
  shillEarnings: number
  bfStaking: number
  totalRewards: number
  totalGuestRewards: BigNumber
}


export interface BattlefieldRewardsWithStakedValue extends Battlefield {
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

interface BattlefieldRewardsProps {
  battlefield: BattlefieldRewardsWithStakedValue,
  account: string
}

const BattlefieldRewards: React.FC<BattlefieldRewardsProps> = ({ battlefield, account }) => {
  const battlefieldContract = getBattlefieldContract()
  const web3 = useWeb3()
  const { fastRefresh, slowRefresh } = useRefresh()
  const knightPrice = usePriceCakeBusd()
  const squirePrice = usePriceSquireBusd()
  const legendPrice = usePriceLegendBusd()
  const tablePrice = usePriceTableBusd()
  const shillingPrice = usePriceShillingBusd()
  let { stakedBalance, earnings } = useBattlefieldUser(0)
  const knightStakingBalance = stakedBalance;
  const knightEarnings = earnings;
  ({ stakedBalance, earnings } = useBattlefieldUser(1))
  const tableStakingBalance = stakedBalance;
  const tableEarnings = earnings;
  ({ stakedBalance, earnings } = useBattlefieldUser(2))
  const legendStakingBalance = stakedBalance;
  const legendEarnings = earnings;
  ({ stakedBalance, earnings } = useBattlefieldUser(3))
  const squireStakingBalance = stakedBalance
  const squireEarnings = earnings;
  ({ stakedBalance, earnings } = useBattlefieldUser(4))
  const shillingEarnings = earnings.plus(stakedBalance);
  const shillingStakingBalance = stakedBalance;
  const [showExpandableSection, setShowExpandableSection] = useState(false)
  let userTotalValue = new BigNumber(0)
  let userTotalEarnings = new BigNumber(0)
  const {userArmyStrength, userArmyPercent } = useBattlefieldUser(0)
  const [state, setState] = useState<State>({
    shillEarnings: 0,
    bfStaking: 0,
    totalRewards: 0,
    totalGuestRewards: new BigNumber(0)
    })

  useEffect(() => {
    const fetchShillingDetails = async () => {
      if(account){
        let bfStaking = 0
        let shillEarnings = 0
        let guestRewards = 0
        const bfContract = getBattlefieldContract()
        const shillBFRewardsPid = 4 // Change to Battlefield PID for Shilling Rewards after launch.
        const guestRewardsPid = 6

        shillEarnings = await bfContract.methods.getUserCurrentRewards(account, shillBFRewardsPid).call()
        bfStaking = await bfContract.methods.userHoldings(account, shillBFRewardsPid).call()
        guestRewards = await bfContract.methods.getUserCurrentRewards(account, guestRewardsPid).call()
        
      
        const totalRewards = (new BigNumber(shillEarnings).plus(new BigNumber(bfStaking))).toNumber()
        const totalGuestRewards = (new BigNumber(guestRewards))

        setState((prevState) => ({
          ...prevState,
          shillEarnings,
          bfStaking,
          totalRewards,
          totalGuestRewards
        }))
      }
    }
  fetchShillingDetails()
}, [slowRefresh, account, web3])

  userTotalValue = knightStakingBalance.dividedBy(1e18).multipliedBy(knightPrice).plus(userTotalValue)
  userTotalValue = squireStakingBalance.dividedBy(1e18).multipliedBy(squirePrice).plus(userTotalValue)
  userTotalValue = tableStakingBalance.dividedBy(1e18).multipliedBy(tablePrice).plus(userTotalValue)
  userTotalValue = legendStakingBalance.dividedBy(1e18).multipliedBy(legendPrice).plus(userTotalValue)

  userTotalEarnings = knightEarnings.dividedBy(1e18).multipliedBy(knightPrice).plus(userTotalEarnings)
  userTotalEarnings = squireEarnings.dividedBy(1e18).multipliedBy(squirePrice).plus(userTotalEarnings)
  userTotalEarnings = tableEarnings.dividedBy(1e18).multipliedBy(tablePrice).plus(userTotalEarnings)
  userTotalEarnings = legendEarnings.dividedBy(1e18).multipliedBy(legendPrice).plus(userTotalEarnings)
  userTotalEarnings = shillingEarnings.dividedBy(1e18).multipliedBy(shillingPrice).plus(userTotalEarnings)

  const rawArmyPercent = new BigNumber(getBalanceNumber(userArmyPercent)).multipliedBy(100).toFixed(6)

  const { quoteTokenAdresses, quoteTokenSymbol, tokenAddresses } = battlefield
  const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAdresses, quoteTokenSymbol, tokenAddresses })

  // Hardcoded values on rewards per day, update these.  It beats making a separate call to each Battlefield for an overview card... maybe.
  const squireRewards = new BigNumber(getBalanceNumber(new BigNumber(rawArmyPercent).dividedBy(100).multipliedBy(2304000).multipliedBy(1e18))).toFixed(0);
  const knightRewards = new BigNumber(getBalanceNumber(new BigNumber(rawArmyPercent).dividedBy(100).multipliedBy(7200).multipliedBy(1e18))).toFixed(1);
  const legendRewards = new BigNumber(getBalanceNumber(new BigNumber(rawArmyPercent).dividedBy(100).multipliedBy(.5).multipliedBy(1e18))).toFixed(4);
  const tableRewards = new BigNumber(getBalanceNumber(new BigNumber(rawArmyPercent).dividedBy(100).multipliedBy(.0288).multipliedBy(1e18))).toFixed(6);
  const shillingRewards = new BigNumber(getBalanceNumber(new BigNumber(rawArmyPercent).dividedBy(100).multipliedBy(2880000000).multipliedBy(1e18))).toFixed(0);
  const guestRewards = new BigNumber(getBalanceNumber(new BigNumber(rawArmyPercent).dividedBy(100).multipliedBy(3).multipliedBy(1e18))).toFixed(3);
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
  const guestRewardValue = new BigNumber(guestRewards).multipliedBy(16).toFixed(2);

  const totalRewardValue = (Number(squireRewardValue)+Number(guestRewardValue)+Number(knightRewardValue)+Number(legendRewardValue)+Number(tableRewardValue)+Number(shillingRewardValue)).toFixed(2);
  const userTotalDollarValue = userTotalValue.toNumber().toLocaleString()
  const userTotalEarningsValue = userTotalEarnings.toNumber().toLocaleString()
  const apr = (((Number(squireRewardValue)+Number(guestRewardValue)+Number(knightRewardValue)+Number(legendRewardValue)+Number(tableRewardValue)+Number(shillingRewardValue))*365)/(userTotalValue.toNumber()))*100
  
  if(account){
    return (
      
      <FCard>
        <StyledCardAccent />
        <Heading mb="8px">💰 Rewards 💰</Heading>
        <FlexLayout>
          <AllAction />
        </FlexLayout>
        <Heading mb="8px"><u>Current Rewards</u></Heading>        
        <Text><img src="\images\battlefield\shilling.svg" alt="Shilling" height="24px" width="24px"/> SHILLING <img src="\images\battlefield\shilling.svg" alt="Shilling" height="24px" width="24px"/></Text>
        <HarvestOnlyAction earnings={shillingEarnings} pid={4} earnedValue={shillingEarnings.multipliedBy(shillingPrice)} stakingBalance={state.bfStaking}>Harvest Shilling</HarvestOnlyAction>
        <Text mt="4px"><img src="\images\battlefield\squire.svg" alt="Squire" height="32px" width="32px"/> SQUIRE <img src="\images\battlefield\squire.svg" alt="Squire" height="32px" width="32px"/></Text>
        <HarvestAction earnings={squireEarnings} pid={3} earnedValue={squireEarnings.multipliedBy(squirePrice)}>Harvest Squire</HarvestAction>
        <Text mt="4px"><img src="\images\battlefield\knight.svg" alt="Knight" height="32px" width="32px"/> KNIGHT <img src="\images\battlefield\knight.svg" alt="Knight" height="32px" width="32px"/></Text>
        <HarvestAction earnings={knightEarnings} pid={0} earnedValue={knightEarnings.multipliedBy(knightPrice)}>Harvest Knight</HarvestAction>
        <Text mt="4px"><img src="\images\battlefield\legend.svg" alt="Legend" height="32px" width="32px"/> LEGEND <img src="\images\battlefield\legend.svg" alt="Legend" height="32px" width="32px"/></Text>
        <HarvestAction earnings={legendEarnings} pid={2} earnedValue={legendEarnings.multipliedBy(legendPrice)}>Harvest Legend</HarvestAction>
        <Text mt="4px"><img src="\images\battlefield\table.svg" alt="Table" height="32px" width="32px"/> TABLE <img src="\images\battlefield\table.svg" alt="Table" height="32px" width="32px"/></Text>
        <HarvestAction earnings={tableEarnings} pid={1} earnedValue={tableEarnings.multipliedBy(tablePrice)}>Harvest Table</HarvestAction>
        <Divider />
        <Heading mb="8px"><u>Guest Rewards</u></Heading>
        <Text><img src="\images\battlefield\CAKE.png" alt="CAKE" height="32px" width="32px"/> CAKE <img src="\images\battlefield\CAKE.png" alt="CAKE" height="32px" width="32px"/></Text>
        <a href="https://www.pancakeswap.finance" target="_newwindow"><Text color="gold">Link to PancakeSwap</Text></a>
        <HarvestOnlyAction earnings={state.totalGuestRewards} pid={6} earnedValue={state.totalGuestRewards.multipliedBy(16.429)} stakingBalance={0}>Harvest Shilling</HarvestOnlyAction>
        <Divider />
        <ExpandableSectionButton
          onClick={() => setShowExpandableSection(!showExpandableSection)}
          expanded={showExpandableSection}
          showText="Details"
          hideText="Hide"
        />
        
        <ExpandingWrapper expanded={showExpandableSection}>
          <Wrapper>
            <Text> Your Estimated Daily Rewards: ${totalRewardValue}</Text>
            <Text> SHILLING: {formattedShillingRewards} - ${shillingRewardValue}</Text>
            <Text> SQUIRE: {formattedSquireRewards} - ${squireRewardValue}</Text>
            <Text> KNIGHT: {knightRewards} - ${knightRewardValue}</Text>
            <Text> LEGEND: {legendRewards} - ${legendRewardValue}</Text>
            <Text> TABLE: {tableRewards} - ${tableRewardValue}</Text>
            <Text  mb="8px"> CAKE (Guest): {guestRewards.toLocaleString()} - ${guestRewardValue}</Text>
            <Text mb="8px"> Current Rewards: ${userTotalEarningsValue}</Text>
            <Text mb="8px">Your Total Stake: ${userTotalDollarValue} </Text>
            <Text>Estimated APR: {apr.toFixed(2)}% </Text>
          </Wrapper>
        </ExpandingWrapper>

      </FCard>
    )
  }
  
  return (
      <FCard>
      <StyledCardAccent />
      <Heading mb="8px">💰 Rewards 💰</Heading>
      <UnlockButton/>
      </FCard>
    )
}

export default BattlefieldRewards
