import React, { useEffect, useCallback, useState } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Heading, Text, Button, Input, Flex } from '@pancakeswap-libs/uikit'
import FlexLayoutWide from 'components/layout/FlexWide'
import Page from 'components/layout/Page'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import { getKingmakerContract } from 'utils/contractHelpers'
import { getKingmakerAddress } from 'utils/addressHelpers'
import useRefresh from 'hooks/useRefresh'
import { useKingmaker } from 'hooks/useContract'

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
const StyledInput = styled(Input)`
  box-shadow: none;
  width: 96px;
  margin: 0 8px;
  padding: 0 8px;

  ${({ theme }) => theme.mediaQueries.xs} {
    width: 64px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 96px;
  }
`

const KingmakerView = () => {
  const { path } = useRouteMatch()

  const kingmakerContract = useKingmaker()
  const kingmakerAddress = getKingmakerAddress()
  const [showExpandableSection, setShowExpandableSection] = useState(false)
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const dispatch = useDispatch()
  const [peasants, setPeasants] = React.useState(0);
  const [farmers, setFarmers] = React.useState(0);
  const [knights, setKnights] = React.useState(0);
  const [nobles, setNobles] = React.useState(0);
  const [kings, setKings] = React.useState(0);
  const [score, setScore] = React.useState(0.0);
  const [farmerBuyAmt, setFarmerBuyAmt] = React.useState(1);
  const [knightBuyAmt, setKnightBuyAmt] = React.useState(1);
  const [nobleBuyAmt, setNobleBuyAmt] = React.useState(1);
  const [kingBuyAmt, setKingBuyAmt] = React.useState(1);
  const [multiplier, setMultiplier] = React.useState(1);
  const [firstAccount, setFirstPlaceAccount] = React.useState('');
  const [firstPlaceScore, setFirstPlaceScore] = React.useState(0);
  const [secondAccount, setSecondPlaceAccount] = React.useState('');
  const [secondPlaceScore, setSecondPlaceScore] = React.useState(0);
  const [thirdAccount, setThirdPlaceAccount] = React.useState('');
  const [thirdPlaceScore, setThirdPlaceScore] = React.useState(0);
  const [lpHeld, setLpHeld] = React.useState(0);
  const [knightHeld, setKnightsHeld] = React.useState(0);
  const [nftsHeld, setNftsHeld] = React.useState(0);
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    
    const updateUnits = async () => {
      try {
        if (account) {
          const newPeasants = await kingmakerContract.methods.getPeasants(account).call();
          setPeasants(newPeasants);
          const newFarmers = await kingmakerContract.methods.getFarmers(account).call();
          setFarmers(newFarmers);
          const newKnights = await kingmakerContract.methods.getKnights(account).call();
          setKnights(newKnights);
          const newNobles = await kingmakerContract.methods.getNobles(account).call();
          setNobles(newNobles);
          const newKings = await kingmakerContract.methods.getKings(account).call();
          setKings(newKings);
          const newScore = await kingmakerContract.methods.getScore(account).call();
          setScore(newScore);
          const newMultiplier = await kingmakerContract.methods.getMultiplier(account).call();
          setMultiplier(newMultiplier/1e18);
          const firstPlaceData = await kingmakerContract.methods.leaderboardLeaders(1).call();
          setFirstPlaceAccount(firstPlaceData[0])
          setFirstPlaceScore(firstPlaceData[1])
          const secondPlaceData = await kingmakerContract.methods.leaderboardLeaders(2).call();
          setSecondPlaceAccount(secondPlaceData[0])
          setSecondPlaceScore(secondPlaceData[1])
          const thirdPlaceData = await kingmakerContract.methods.leaderboardLeaders(3).call();
          setThirdPlaceAccount(thirdPlaceData[0])
          setThirdPlaceScore(thirdPlaceData[1])
          const holderBalance = await kingmakerContract.methods.getHolderKnightBalance(account).call();
          setKnightsHeld(holderBalance)
          const lpBalance = await kingmakerContract.methods.getHolderKnightLPBalance(account).call();
          setLpHeld(lpBalance)
          const nftBalance = await kingmakerContract.methods.getHolderNFTBalance(account).call();
          setNftsHeld(nftBalance)
        }
      }
      catch (err) {
        console.log(err);
      }
    }
    updateUnits();
    
  }, [account, fastRefresh, kingmakerContract])

  const handleBuyFarmers = async () =>
    kingmakerContract.methods
      .buyFarmers(farmerBuyAmt).send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      },
    [account, dispatch, kingmakerContract, farmerBuyAmt]
  )

  const handleBuyMaxFarmers = async () =>
    kingmakerContract.methods
      .buyMaxFarmers().send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      },
    [account, dispatch, kingmakerContract]
  )

  const handleBuyKnights = async () =>
    kingmakerContract.methods
      .buyKnights(knightBuyAmt).send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      },
    [account, dispatch, kingmakerContract, knightBuyAmt]
  )

  const handleBuyMaxKnights = async () =>
    kingmakerContract.methods
      .buyMaxKnights().send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      },
    [account, dispatch, kingmakerContract]
  )

  const handleBuyNobles = async () =>
    kingmakerContract.methods
      .buyNobles(nobleBuyAmt).send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      },
    [account, dispatch, kingmakerContract, nobleBuyAmt]
  )

  const handleBuyMaxNobles = async () =>
    kingmakerContract.methods
      .buyMaxNobles().send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      },
    [account, dispatch, kingmakerContract]
  )

  const handleBuyKings = async () =>
    kingmakerContract.methods
      .buyKings(kingBuyAmt).send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      },
    [account, dispatch, kingmakerContract, kingBuyAmt]
  )

  const handleBuyMaxKings = async () =>
    kingmakerContract.methods
      .buyMaxKings().send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      },
    [account, dispatch, kingmakerContract]
  )

  const startGame = async () =>
    kingmakerContract.methods
      .startGame().send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      },
    [account, dispatch, kingmakerContract]
  )


  return (
    <Page>
      <div>
      <FlexLayoutWide>
        <Route exact path={`${path}`}>
          <Heading as="h1" size="xl">
          
          <FCard>
            <StyledCardAccent />
            <Heading mb="8px">⚔️ <img src="/images/kingmaker/banner1.jpg" height="128px" width="128px" alt="Nobles"/> ⚔️</Heading>            
            <Text> &nbsp;Develop your army over time.  Boost speed by holding KNIGHT and/or buying boosts in the marketplace.  Requires holding 1000 KNIGHT to start. No tokens are required to play, only BNB for gas. Top 3 places win KNIGHT after each play cycle. High Scores are only recorded during a transaction.</Text>
            <br />
            <Heading> Score: {score > 100000 ? (score*1).toExponential(3) :  score}</Heading>
            <Heading> Multiplier: {multiplier.toFixed(2)}x</Heading>
            <Heading> Knight Held: {(knightHeld/1e18).toFixed(1)} (+{(knightHeld/1e18/100000).toFixed(2)}x)</Heading>
            <Heading> Knight-BNB LP Held: {(lpHeld/1e18).toFixed(1)} (+{(lpHeld/1e18/50).toFixed(2)}x)</Heading>
            <Heading> NFTs Held: {nftsHeld} (+{(nftsHeld/5).toFixed(2)}x)</Heading>
            <br />
            {peasants > 0 ?
              <Text />
              :
              <Button variant="primary" onClick={startGame} >
                <Text color="tertiary">Start Game</Text>
              </Button>
            }
            <Divider />
            <Heading mb="12px">Peasants: {peasants > 100000 ? (peasants*1).toExponential(3) : peasants}</Heading> <br/>
            <Heading><img src="/images/kingmaker/peasants.jpg" height="64px" width="64px" alt="Farmers"/>&nbsp;Farmers: {farmers > 100000 ? (farmers*1).toExponential(3) : farmers}</Heading>
            <Hero>
              <Text># Farmers to Buy (10 Peasants / Farmer):</Text>
              <StyledInput type='number' value={farmerBuyAmt} onChange={async (e) => {
                const value = e.target.valueAsNumber;
                setFarmerBuyAmt(value);
              }}/>
            </Hero>
            <div>
              <Button variant="primary" onClick={handleBuyFarmers} mt="8px" mb="8px" mr="8px">
                <Text color="tertiary">Buy Farmers</Text>
              </Button>
              <Button variant="primary" onClick={handleBuyMaxFarmers} mt="8px" mb="8px">
                <Text color="tertiary">Buy Max Farmers</Text>
              </Button>
            </div>
            <Heading mt="12px"><img src="/images/kingmaker/soldiers.jpg" height="64px" width="64px" alt="Soldiers"/>&nbsp;Soldiers: {knights > 100000 ? (knights*1).toExponential(3) : knights}</Heading>
            <Hero>
              <Text># of Soldiers to Buy (1,000 Farmers / Soldiers):</Text>
              <StyledInput type='number' value={knightBuyAmt} onChange={async (e) => {
                const value = e.target.valueAsNumber;
                setKnightBuyAmt(value);
              }}/>
            </Hero>
            <div>
              <Button variant="primary" onClick={handleBuyKnights} mt="8px" mb="8px" mr="8px">
                <Text color="tertiary">Buy Soldiers</Text>
              </Button>
              <Button variant="primary" onClick={handleBuyMaxKnights} mt="8px" mb="8px">
                <Text color="tertiary">Buy Max Soldiers</Text>
              </Button>
            </div>
            <Heading><img src="/images/kingmaker/nobles.jpg" height="64px" width="64px" alt="Nobles"/>&nbsp;Nobles: {nobles > 100000 ? (nobles*1).toExponential(3) : nobles}</Heading>
            <Hero>
              <Text># of Nobles to Buy (100,000 Soldiers / Noble):</Text>
              <StyledInput type='number' value={nobleBuyAmt} onChange={async (e) => {
                const value = e.target.valueAsNumber;
                setNobleBuyAmt(value);
              }}/>
            </Hero>
            <div>
              <Button variant="primary" onClick={handleBuyNobles} mt="8px" mb="8px" mr="8px">
                <Text color="tertiary">Buy Nobles</Text>
              </Button>
              <Button variant="primary" onClick={handleBuyMaxNobles} mt="8px" mb="8px">
                <Text color="tertiary">Buy Max Nobles</Text>
              </Button>
            </div>
            <Heading><img src="/images/kingmaker/king.jpg" height="64px" width="64px" alt="Kings"/>&nbsp;Kings: {kings > 100000 ? (kings*1).toExponential(3) : kings}</Heading>
            <Hero>
              <Text># of Kings to Buy (10,000,000 Nobles / King):</Text>
              <StyledInput type='number' value={kingBuyAmt} onChange={async (e) => {
                const value = e.target.valueAsNumber;
                setKingBuyAmt(value);
              }}/>
            </Hero>
            <div>
              <Button variant="primary" onClick={handleBuyKings} mt="8px" mb="8px" mr="8px">
                <Text color="tertiary">Buy Kings</Text>
              </Button>
              <Button variant="primary" onClick={handleBuyMaxKings} mt="8px" mb="8px">
                <Text color="tertiary">Buy Max Kings</Text>
              </Button>
            </div>
            <Divider/>
            <ExpandableSectionButton
              onClick={() => setShowExpandableSection(!showExpandableSection)}
              expanded={showExpandableSection}
              showText="Details"
              hideText="Hide"
            />
            <ExpandingWrapper expanded={showExpandableSection}>
              <Wrapper>
                {account ?
                <Wrapper>
                  <Heading mb="8px"><u> High Scores </u> </Heading>
                  <Heading mb="8px">🥇 1st Place: {firstAccount.substring(0,5)} ...  {firstAccount.substring(38,44)} : {firstPlaceScore > 100000 ? (firstPlaceScore*1).toExponential(3) : firstPlaceScore} </Heading>
                  <Heading mb="8px">🥈 2nd Place: {secondAccount.substring(0,5)} ...  {secondAccount.substring(38,44)} : {secondPlaceScore > 100000 ? (secondPlaceScore*1).toExponential(3) : secondPlaceScore} </Heading>
                  <Heading mb="8px">🥉 3rd Place: {thirdAccount.substring(0,5)} ...  {thirdAccount.substring(38,44)} : {thirdPlaceScore > 100000 ? (thirdPlaceScore*1).toExponential(3) : thirdPlaceScore} </Heading>
                  <Divider/>
                  
                  <Text>Multiplier is Based on NFT, KNIGHT, and KNIGHT-BNB Holdings</Text>
                  <Text>Multiplier = (NFT Balance / 5) + (Knight Balance / 100000) + (Knight-BNB LP Balance / 50)</Text>
                </Wrapper>
                :
                <Text />
                }
              </Wrapper>
            </ExpandingWrapper>
          </FCard>
        
          </Heading>
        </Route>
        </FlexLayoutWide>
        
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
  padding: 12px 0;
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

export default KingmakerView
