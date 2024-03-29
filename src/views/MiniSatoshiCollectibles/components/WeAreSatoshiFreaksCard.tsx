import React, { useEffect } from 'react'
import BigNumber from 'bignumber.js'
import { useDispatch } from 'react-redux'
import styled, { keyframes } from 'styled-components'
import { Text, Heading, Input, Button, Flex} from '@pancakeswap-libs/uikit'
import { Battlefield } from 'state/types'
import useWeb3 from 'hooks/useWeb3'
import { provider } from 'web3-core'
import useRefresh from 'hooks/useRefresh'
import { useWeAreSatoshiFreaksContract } from 'hooks/useContract'
import UnlockButton from 'components/UnlockButton'
import Image from '../Image'

export interface BattlefieldOverviewWithStakedValue extends Battlefield {
  apy?: BigNumber
  userArmyStrength?: BigNumber
  userArmyPercent?: BigNumber
}

const Wrapper = styled.div`
  margin-top: 24px;
`

const StyledInput = styled(Input)`
  box-shadow: none;
  width: 64px;
  margin: 0 8px;
  padding: 0 8px;

  ${({ theme }) => theme.mediaQueries.xs} {
    width: 64px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 64px;
  }
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

const Hero = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  justify-content: center;
  padding: 8px 0;
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

interface MiniSatProps {
  account: string,
  ethereum: provider
}

const WeAreSatoshiFreaksCard: React.FC<MiniSatProps> = ({ethereum, account}) => {
  const [tokensHeld, setTokensHeld] = React.useState(0);
  const [mintPrice, setMintPrice] = React.useState(0);
  const [tokensMinted, setTokensMinted] = React.useState(0);
  const [tokensMax, setTokensMax] = React.useState(0);
  const [mintActive, setMintActive] = React.useState(false);
  const [numToMint, setNumToMint] = React.useState(1);
  const [soldOut, setSoldOut] = React.useState(false)
  const weAreSatoshiContract = useWeAreSatoshiFreaksContract();
  const dispatch = useDispatch()
  const web3 = useWeb3()
  const { slowRefresh } = useRefresh()

  const mint = async () =>
    weAreSatoshiContract.methods
        .purchaseNfts(numToMint).send({ value: (numToMint*mintPrice).toString(), from: account, to: weAreSatoshiContract.options.address })
        .on('transactionHash', (tx) => {
            console.log("method bypassed")
            return tx.transactionHash
        },
        [account, dispatch, weAreSatoshiContract, numToMint]
    )
  
  useEffect(() => {
      const fetchStakingDetails = async () => {
        let price = 0
        let minted = 0
        let total = 0
        let mintingActive = false;
        let soldOutData = false;
        price = await weAreSatoshiContract.methods.mintCost().call()
        setMintPrice(price)
        minted = await weAreSatoshiContract.methods.totalSupply().call()
        setTokensMinted(minted)
        total = await weAreSatoshiContract.methods.totalAvailable().call()
        setTokensMax(total)
        mintingActive = await weAreSatoshiContract.methods.mintingActive().call()
        setMintActive(mintingActive)
        soldOutData = await weAreSatoshiContract.methods.isSoldOut().call()
        setSoldOut(soldOutData)
        console.log(soldOutData)
        console.log(mintingActive)
        if(account){
          let held = 0
          held = await weAreSatoshiContract.methods.balanceOf(account).call()
          setTokensHeld(held)
          


        }
      }
    fetchStakingDetails()
  }, [slowRefresh, account, web3, weAreSatoshiContract])

  return (
    <FCard>
        <Heading mb="8px">We Are Satoshi Freaks</Heading>
        <Image src="images/nfts/wearesatoshifreaks.gif" alt=""/>
        <Text mb="8px" mt="12px">&quot;We Are Satoshi Freaks&quot; is the 2nd NFT drop by the MiniSatoshiBsc (SBSC) community. A collection of 1000 computer generated freaks existing on the BSC network.</Text>
        <Divider/>
        <Text mb="8px">Minted: {tokensMinted}/{tokensMax}</Text>
        <Text mb="8px">Mint Cost: {(mintPrice/1e18).toFixed(2)} BNB</Text>
        
        {account && mintActive && !soldOut ?
            <div>
            <Hero>
                <Text mb="8px"># to Mint: </Text>
                <StyledInput id='number' min='1' max='15' type='number' value={numToMint} onChange={async (e) => {
                    const value = e.target.valueAsNumber;
                    setNumToMint(value);
                }}/>
            </Hero>
            <Button mt="8px" mb="8px" variant="primary" onClick={mint}>
                <Text color="tertiary">Mint NFTs</Text>
            </Button>
            <Text>You Hold: {tokensHeld}</Text>
            </div>
            :
            <Text />
        }
        {account && mintActive && soldOut ?
            <div>
            <Button mt="8px" mb="8px" variant="tertiary">
                <Text color="primary">Sold Out</Text>
            </Button>
            <Text>You Hold: {tokensHeld}</Text>
            </div>
            :
            <Text />
        }
        {
            account && !mintActive ?
            <div>
            <Button mt="8px" mb="8px" variant="tertiary">
                <Text color="primary">Mint Not Started</Text>
            </Button>
            </div>
            :
            <Text />

        }
        {!account?
            <UnlockButton/>
            :
            <Text />
        }
        <Divider />
        <Text><u>Links</u></Text>
        <Text><a href="https://t.me/MINISATOSHIBSC" target="_blank" rel="noreferrer">Telegram</a></Text>
        <Text><a href="https://lootex.io/stores/we-are-satoshi-freaks" target="_blank" rel="noreferrer">Lootex</a></Text>
        <Text><a href="https://bscscan.com/address/0xBaa9085decA7C887Aba79F08De056903388C28ca#code" target="_blank" rel="noreferrer">NFT Contract</a></Text>        
    </FCard>
  )
}

export default WeAreSatoshiFreaksCard
