import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { Text, Button, Heading } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js'
import useWeb3 from 'hooks/useWeb3'
import useRefresh from 'hooks/useRefresh'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import UnlockButton from 'components/UnlockButton'
import { useBattlefieldShillingWithdraw } from 'hooks/useUnstake'
import { useShillingBnbHarvest } from 'hooks/useHarvest'
import { getBattlefieldContract, getShillingContract } from 'utils/contractHelpers'
import { getShillingAddress } from 'utils/addressHelpers'
import { usePriceShillingBusd, usePriceBnbBusd } from 'state/hooks'


type State = {
  earnings: number
  holdings: number
  formattedClaimDate: string
  claimBnbAvailable: boolean
  bnbToClaim: number
  bfStaking: number
  totalRewards: number
  bnbPool: number
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


export const ShillingRewardsCard = () => {
  const battlefieldContract = getBattlefieldContract()
  const shillingContract = getShillingContract()
  const shillingAddress = getShillingAddress()
  const shillingPrice = usePriceShillingBusd().toNumber()
  const bnbPrice = usePriceBnbBusd().toNumber()
  const shillingBFRewardsPid = 4 // Change to Battlefield PID for Shilling Rewards after launch.
  const { fastRefresh, slowRefresh } = useRefresh()
  const { account }: { account: string } = useWallet()
  const web3 = useWeb3()
  const [showExpandableSection, setShowExpandableSection] = useState(false)
  const [state, setState] = useState<State>({
    earnings: 0,
    holdings: 0,
    formattedClaimDate: "",
    claimBnbAvailable: false,
    bnbToClaim: 0,
    bfStaking: 0,
    totalRewards: 0,
    bnbPool: 0
    })

/*   
  const calculateTimeLeft = (date, now) => {
    const difference = +date - +now;
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

  } */

  /* const unformattedShillingLaunchDate = timeConverter(1620428400) // 7PM EDT on 5/7/2021
  const formattedShillingLaunchDate = unformattedShillingLaunchDate.toString()
  const timeToLaunch = calculateTimeLeft(unformattedShillingLaunchDate, new Date())
  
  let shillingLaunched = false
  if(unformattedShillingLaunchDate <= new Date()){
    shillingLaunched = true
  }
 */
  
  
  useEffect(() => {
    console.log("clean up")
  }, [])
  
  useEffect(() => {
      const fetchShillingDetails = async () => {
        if(account){
          let earnings = 0
          let holdings = 0
          let nextClaimDate = 0
          let claimBnbAvailable = false
          let bnbToClaim = 0
          let bfStaking = 0
          let bnbPoolString = ""
          let bnbPool = 0
          const bfContract = getBattlefieldContract()
          const shillContract = getShillingContract()
          const shillBFRewardsPid = 4 // Change to Battlefield PID for Shilling Rewards after launch.
         

          earnings = await bfContract.methods.getUserCurrentRewards(account, shillBFRewardsPid).call()
          bfStaking = await bfContract.methods.userHoldings(account, shillBFRewardsPid).call()
          holdings = await shillContract.methods.balanceOf(account).call()
          nextClaimDate = await shillContract.methods.nextAvailableClaimDate(account).call()
          bnbToClaim = await shillContract.methods.calculateBNBReward(account).call()
          bnbPoolString = await web3.eth.getBalance(getShillingAddress())
          
          const timeConverter = (timestamp: number) =>{
            const a = new Date(timestamp * 1000)
            const time = a
            return time;
          }
        
          const totalRewards = (new BigNumber(earnings).plus(new BigNumber(bfStaking))).toNumber()

          // get BNB Claim date
          const unformattedClaimDate = timeConverter(nextClaimDate)
          
          if(unformattedClaimDate < new Date() && nextClaimDate > 0){
            claimBnbAvailable = true
          }
          
          if(bnbPoolString !== ""){
            bnbPool = parseInt(bnbPoolString)
          }

          let formattedClaimDate = unformattedClaimDate.toString()

          if(!claimBnbAvailable && nextClaimDate> 0){
            formattedClaimDate = unformattedClaimDate.toString()
          } else if (nextClaimDate < 1){
            formattedClaimDate = "You have not purchased any SHILLING.  Please purchase to be able to claim."
          } else {
            formattedClaimDate = (new Date()).toString()
          }

          setState((prevState) => ({
            ...prevState,
            earnings,
            holdings,
            formattedClaimDate,
            claimBnbAvailable,
            bnbToClaim,
            bfStaking,
            totalRewards,
            bnbPool
          }))
        }
      }
    fetchShillingDetails()
  }, [slowRefresh, account, web3])

  const { onUnstake } = useBattlefieldShillingWithdraw(shillingBFRewardsPid, state.bfStaking)
  const { onBnbReward } = useShillingBnbHarvest()

  if(account){
    return (
      <FCard>
        <StyledCardAccent />
          <Heading mb="12px">
            SHILLING Token
          </Heading>
          <Heading>  <img src="images/battlefield/shilling.svg" alt="Shilling Logo" style={{
              height: '48px'
            }}/>
          </Heading>
          <Divider />
            
            
            <Heading mt="12px">Your Next BNB Claim: {(state.bnbToClaim/1e18).toFixed(4)} (~${(bnbPrice*state.bnbToClaim/1e18).toLocaleString()})</Heading>
            <Text mb="12px">Your Next Claim Date: {state.formattedClaimDate}</Text>
            {state.claimBnbAvailable 
            ?
            <Button variant="secondary" onClick={onBnbReward}>
              Claim BNB
            </Button> :
            <Button variant="tertiary">
              Cannot Claim BNB Until Claim Date
            </Button>
            }
            <Divider />
            <Button mt="8px" as="a" variant="secondary" href="https://docs.knightsdefi.com/shilling" target="_blank">
                Read More
            </Button>
        <Divider />
        
        <ExpandableSectionButton
          onClick={() => setShowExpandableSection(!showExpandableSection)}
          expanded={showExpandableSection}
          showText='Details'
          hideText='Hide'
        />
        <ExpandingWrapper expanded={showExpandableSection}>
          <Wrapper>
            <Text mb="2px">Your Holdings </Text>
            <Text mb="2px">{new BigNumber((state.holdings/1e18).toFixed(0)).toNumber().toLocaleString()} SHILLING</Text>
            <Text mb="12px">~($ {((state.holdings/1e18)*(shillingPrice)).toFixed(2)})</Text>
            <Button as="a" variant="secondary" href={`https://psidex.passive-income.io/#/swap?outputCurrency=${shillingAddress}`} target="_blank">
                Buy Shilling
            </Button>
            <Divider />
            <Heading mb="12px">Total BNB in Pool: {(state.bnbPool/1e18).toFixed(2)} (~${(bnbPrice*state.bnbPool/1e18).toLocaleString()})</Heading>
            <Heading mb="12px">Your Next BNB Claim: {(state.bnbToClaim/1e18).toFixed(4)} (~${(bnbPrice*state.bnbToClaim/1e18).toLocaleString()})</Heading>
            <Text mb="12px">Your Estimated Annual BNB: {(state.bnbToClaim/1e18*(365/3)).toFixed(4)} (~${(bnbPrice*(state.bnbToClaim/1e18*(365/3))).toLocaleString()})</Text>
            <Divider />
            <Text mb="2px">Earned SHILLING from Battlefield</Text>
            <Text mb="2px">{new BigNumber(((state.totalRewards)/1e18).toFixed(0)).toNumber().toLocaleString()} SHILLING</Text>
            <Text mb="12px">~($ {((state.totalRewards/1e18)*(shillingPrice)).toFixed(2)})</Text>
            {state.earnings > 0
            ?
            <Button variant="secondary" onClick={onUnstake}>
              Harvest Shilling
            </Button> :
            <Button variant="tertiary">
              No Shilling to Harvest from Battlefield
            </Button>
            }

            
            </Wrapper>
        </ExpandingWrapper>
      </FCard>
        
    )
  }
 /*  if(!shillingLaunched){
  return (
  <FCard>
      <StyledCardAccent />
      <Heading size='xl' mb="12px">SHILLING Token Launch</Heading>
      <Divider />
      <Heading size='lg' mb="12px">{formattedShillingLaunchDate}</Heading>
      <Heading mb="12px">{timeToLaunch.days} Days {timeToLaunch.hours} Hours {timeToLaunch.minutes} Minutes</Heading>
      <Button as="a" variant="secondary" href="https://docs.knightsdefi.com/shilling" target="_blank">
            Read More
      </Button>
  </FCard>
  )
  } */
  
  return (
    <FCard>
      <StyledCardAccent />
          <Heading mb="12px">
            SHILLING Token
          </Heading>
          <Heading mb="12px">  <img src="images/battlefield/shilling.svg" alt="Shilling Logo" style={{
              height: '48px'
            }}/>
          </Heading>
      <UnlockButton />
    </FCard>
  )
}

export default ShillingRewardsCard