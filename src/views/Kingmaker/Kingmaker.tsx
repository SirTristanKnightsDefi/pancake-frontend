import React, { useEffect, useCallback, useState } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
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
  width: 60px;
  margin: 0 8px;
  padding: 0 8px;

  ${({ theme }) => theme.mediaQueries.xs} {
    width: 80px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
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
  const [score, setScore] = React.useState(0);
  const [farmerBuyAmt, setFarmerBuyAmt] = React.useState(1);
  const [knightBuyAmt, setKnightBuyAmt] = React.useState(1);
  const [nobleBuyAmt, setNobleBuyAmt] = React.useState(1);
  const [kingBuyAmt, setKingBuyAmt] = React.useState(1);
  const [multiplier, setMultiplier] = React.useState(1);
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if (account) {
      console.log(account)
    }
  }, [account, dispatch, fastRefresh])

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
        }
      }
      catch (err) {
        console.log(err);
      }
    }
    updateUnits();
    
  }, [account, dispatch, fastRefresh, kingmakerContract])

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

  // /!\ This function will be removed soon
  // This function compute the APY for each battlefield and will be replaced when we have a reliable API
  // to retrieve assets prices against USD

  return (
    <Page>
      <div>
      <FlexLayoutWide>
        <Route exact path={`${path}`}>
          <Heading as="h1" size="xl">
          
          <FCard>
            <StyledCardAccent />
            <Heading mb="8px">⚔️ Kingmaker ⚔️</Heading>
            <Text> Develop your army over time.  Boost speed by holding KNIGHT and/or buying boosts in the marketplace.</Text>
            <br />
            <Heading> Score: {score}</Heading>
            <Heading> Multiplier Based on Knight Holdings: {multiplier.toFixed(2)}x</Heading>
            <br />
            <Button variant="primary" onClick={startGame} >
              <Text color="tertiary">Start Game</Text>
            </Button>
            <Divider />
            <Heading>Peasants: {peasants}</Heading>
            <Heading>Farmers: {farmers}</Heading>
            <Text>Amount of Farmers to Buy (10 Peasants per Farmer)</Text>
            <StyledInput type='number' onChange={async (e) => {
              const value = e.target.valueAsNumber;
              setFarmerBuyAmt(value);
            }}/>
            <Flex alignItems="center">
              <Button variant="primary" onClick={handleBuyFarmers} mt="8px" mb="8px">
                <Text color="tertiary">Buy Farmers</Text>
              </Button>
              <Button variant="primary" onClick={handleBuyMaxFarmers} mt="8px" mb="8px">
                <Text color="tertiary">Buy Max Farmers</Text>
              </Button>
            </Flex>
            <Heading>Knights: {knights}</Heading>
            <Text>Amount of Knights to Buy (1,000 Farmers per Knight)</Text>
            <StyledInput type='number' onChange={async (e) => {
              const value = e.target.valueAsNumber;
              setKnightBuyAmt(value);
            }}/>
            <Flex>
              <Button variant="primary" onClick={handleBuyKnights} mt="8px" mb="8px">
                <Text color="tertiary">Buy Knights</Text>
              </Button>
              <Button variant="primary" onClick={handleBuyMaxKnights} mt="8px" mb="8px">
                <Text color="tertiary">Buy Max Knights</Text>
              </Button>
            </Flex>
            <Heading>Nobles: {nobles}</Heading>
            <Text>Amount of Nobles to Buy (100,000 Knights per Noble)</Text>
            <StyledInput type='number' onChange={async (e) => {
              const value = e.target.valueAsNumber;
              setNobleBuyAmt(value);
            }}/>
            <Flex>
              <Button variant="primary" onClick={handleBuyNobles} mt="8px" mb="8px">
                <Text color="tertiary">Buy Nobles</Text>
              </Button>
              <Button variant="primary" onClick={handleBuyMaxNobles} mt="8px" mb="8px">
                <Text color="tertiary">Buy Max Nobles</Text>
              </Button>
            </Flex>
            <Heading>Kings: {kings}</Heading>
            <Text>Amount of Kings to Buy (10,000,000 Nobles per King)</Text>
            <StyledInput type='number' onChange={async (e) => {
              const value = e.target.valueAsNumber;
              setKingBuyAmt(value);
            }}/>
            <Flex>
              <Button variant="primary" onClick={handleBuyKings} mt="8px" mb="8px">
                <Text color="tertiary">Buy Kings</Text>
              </Button>
              <Button variant="primary" onClick={handleBuyMaxKings} mt="8px" mb="8px">
                <Text color="tertiary">Buy Max Kings</Text>
              </Button>
            </Flex>
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
                  <Heading mb="8px"> 1st Place: </Heading>
                  <Heading mb="8px"> 2nd Place: </Heading>
                  <Heading mb="8px"> 3rd Place: </Heading>
                  <Divider/>
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

export default KingmakerView
