import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import styled, { keyframes } from 'styled-components'
import { Text, Button, Heading } from '@pancakeswap-libs/uikit'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import useRefresh from 'hooks/useRefresh'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import UnlockButton from 'components/UnlockButton'
import { useBattlefieldHarvest } from 'hooks/useHarvest'
import { fetchFarmUserDataAsync } from 'state/actions'

import Countdown from 'react-countdown';
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { getBalanceNumber } from 'utils/formatBalance'
import { getBattlefieldContract, getShillingContract } from 'utils/contractHelpers'
import { getShillingAddress } from 'utils/addressHelpers'
import { now } from 'lodash'

type State = {
  earnings: number
  holdings: number
  formattedClaimDate: string
  claimBnbAvailable: boolean
  shillingLaunched: boolean
  timeToLaunch: Record<string,any>
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


export const ShillingRewardsCard = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const battlefieldContract = getBattlefieldContract()
  const shillingContract = getShillingContract()
  const shillingAddress = getShillingAddress()
  const shillingBFRewardsPid = 0
  const dispatch = useDispatch()
  const { fastRefresh, slowRefresh } = useRefresh()
  const { account }: { account: string } = useWallet()
  const [state, setState] = useState<State>({
    earnings: 0,
    holdings: 0,
    formattedClaimDate: "",
    claimBnbAvailable: false,
    shillingLaunched: false,
    timeToLaunch: {days: 0, hours: 0, minutes: 0, seconds: 0}
    })

  const timeConverter = (timestamp: number) =>{
    const a = new Date(timestamp * 1000)
    const time = a
    return time;
  }

  const calculateTimeLeft = (date) => {
    const difference = +date - +new Date();
    let timeLeft = {days: 0, hours: 0, minutes: 0, seconds: 0}

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
    };
  }

  return timeLeft;

  }

  const unformattedShillingLaunchDate = timeConverter(1620428400) // 7PM EDT on 5/7
  const formattedShillingLaunchDate = unformattedShillingLaunchDate.toString()
  

  useEffect(() => {
    let unmounted = false;
    const fetchShillingDetails = async (acct: string) => {
      let earnings = 0
      let holdings = 0
      let nextClaimDate = 0
      let claimBnbAvailable = false
      let shillingLaunched = false
      let timeToLaunch = {}

      if(acct){
        earnings = await battlefieldContract.methods.getUserCurrentRewards(acct, shillingBFRewardsPid).call()
        holdings = await shillingContract.methods.balanceOf(acct).call()
        nextClaimDate = await shillingContract.methods.nextAvailableClaimDate(acct).call()
      }

      
      
      const unformattedClaimDate = timeConverter(nextClaimDate)

      if(unformattedClaimDate <= new Date()){
        claimBnbAvailable = true
      } else {
        claimBnbAvailable = false
      }

      if(unformattedShillingLaunchDate <= new Date()){
        shillingLaunched = true
      } else {
        shillingLaunched = false
        timeToLaunch = calculateTimeLeft(unformattedShillingLaunchDate)
      }

      const formattedClaimDate = unformattedClaimDate.toString()



      setState((prevState) => ({
        ...prevState,
        earnings,
        holdings,
        formattedClaimDate,
        claimBnbAvailable,
        shillingLaunched,
        timeToLaunch
      }))   
    }
    if(!unmounted){
      fetchShillingDetails(account)
    }
    return () => { unmounted = true };
  }, [fastRefresh, account, battlefieldContract, shillingContract, shillingBFRewardsPid, unformattedShillingLaunchDate, formattedShillingLaunchDate])

  const { onReward } = useBattlefieldHarvest(shillingBFRewardsPid)

  if(state.shillingLaunched){
    return (
      <FCard>
        <StyledCardAccent />
          <Heading mb="12px">
            SHILLING
          </Heading>
          <Heading>  <img src="images/battlefield/shilling.svg" alt="Shilling Logo" style={{
              height: '48px'
            }}/>
          </Heading>
        <Divider />
        <Text mb="2px">Your Holdings </Text>
        <Text mb="2px">{(state.holdings/1e18).toFixed()} SHILLING</Text>
        <Text mb="12px">~(${(state.holdings/1e25).toLocaleString()})</Text>
        <Button as="a" variant="secondary" href={`https://exchange.pancakeswap.finance/#/swap?outputCurrency=${shillingAddress}`} target="_blank">
            Buy Shilling
        </Button>
        <Divider />
        <Text mb="2px">Earned SHILLING from Battlefield</Text>
        <Text mb="2px">{(state.earnings/1e18).toLocaleString()} SHILLING</Text>
        <Text mb="12px">~(${(state.earnings/1e18).toLocaleString()})</Text>
        <Button variant="secondary" onClick={onReward}> 
          Harvest Shilling
        </Button>
        <Divider />
        <Heading mb="12px">Next BNB Claim Date </Heading>
        <Text mb="12px">{state.formattedClaimDate}</Text>
        {state.claimBnbAvailable
        ?
        <Button variant="secondary"onClick={onReward}>
          Claim BNB
        </Button> :
        <Text />
        }
      </FCard>
        
    )
  }
  return (
  <FCard>
      <StyledCardAccent />
      <Heading size='xl' mb="12px">Shilling Launch</Heading>
      <Heading size='lg' mb="12px"> {formattedShillingLaunchDate}</Heading>
      <Heading>{state.timeToLaunch.days} Days {state.timeToLaunch.hours} Hours {state.timeToLaunch.minutes} Minutes {state.timeToLaunch.seconds} Seconds</Heading>
  </FCard>
      )
}

export default ShillingRewardsCard