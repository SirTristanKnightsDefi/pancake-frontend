import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Heading, Button, Text } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import useRefresh from 'hooks/useRefresh'
import {getKdfnNFTsAddress, getKotrtNFTsAddress, getKdfnNFTsBetaAddress, getTheGrailNFTsAddress} from 'utils/addressHelpers'
import NftList from './components/NftList'
import NftProvider, {KotrtNftProvider, KdfnNftProvider, KdfnNftBetaProvider} from './contexts/NftProvider'
import KotrtNftList from './components/KotrtNftList'
import KdfnNftList from './components/KdfnNftList'
import KdfnNftBetaList from './components/KdfnNftBetaList'

type State = {
  kdfnCopied: boolean
  kdfnBetaCopied: boolean
  kotrtCopied: boolean
  theGrailCopied: boolean
}

const StyledHero = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.textSubtle};
  margin-bottom: 24px;
  padding-bottom: 32px;
`

const Nft = () => {
  const TranslateString = useI18n()
  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  const [state, setState] = useState<State>({
    kdfnCopied: false,
    kdfnBetaCopied: false,
    kotrtCopied: false,
    theGrailCopied: false
  })
  
  const { account} = useWallet()

  const copyKDFN = () => {
    const address = getKdfnNFTsAddress()
    navigator.clipboard.writeText(address)
    const kdfnCopied = true
    const kdfnBetaCopied = false
    const kotrtCopied = false
    const theGrailCopied = false

    setState((prevState) => ({
      ...prevState, 
      kdfnCopied,
      kdfnBetaCopied,
      kotrtCopied,
      theGrailCopied
    }))
  }
  const copyKDFNBeta = () => {
    
    const address = getKdfnNFTsBetaAddress()
    navigator.clipboard.writeText(address)

    const kdfnCopied = false
    const kdfnBetaCopied = true
    const kotrtCopied = false
    const theGrailCopied = false

    setState((prevState) => ({
      ...prevState, 
      kdfnCopied,
      kdfnBetaCopied,
      kotrtCopied,
      theGrailCopied
    }))
  } 
  const copyKOTRT = () => {
    
    const address = getKotrtNFTsAddress()
    navigator.clipboard.writeText(address)
    const kdfnCopied = false
    const kdfnBetaCopied = false
    const kotrtCopied = true
    const theGrailCopied = false


    setState((prevState) => ({
      ...prevState, 
      kdfnCopied,
      kdfnBetaCopied,
      kotrtCopied,
      theGrailCopied
    }))
  } 
  const copyTheGrail = () => {
    const address = getTheGrailNFTsAddress()
    navigator.clipboard.writeText(address)

    const kdfnCopied = false
    const kdfnBetaCopied = false
    const kotrtCopied = false
    const theGrailCopied = true

    setState((prevState) => ({
      ...prevState, 
      kdfnCopied,
      kdfnBetaCopied,
      kotrtCopied,
      theGrailCopied
    }))
  } 

  useEffect(() => {
    const refresh = true
  }, [account, dispatch, fastRefresh])

  return (
    <StyledHero>
      <KdfnNftProvider>
        <Page>
          <StyledHero>
            <Heading as="h1" size="xxl" color="secondary" mb="24px">
              Knights DeFi Marketplace 
            </Heading>
            <Heading as="h2" size="lg" color="primary" mb="24px">
              NFTs for Purchase
            </Heading>
            {state.kdfnCopied ?
            (<Button>
              Copied ✔
              </Button>): 
            (<Button onClick={copyKDFN}>
              Copy Contract
            </Button>)
            }
          </StyledHero>
          
          <KdfnNftList />
        </Page>
      </KdfnNftProvider>
      <KdfnNftBetaProvider>
        <Page>
          <StyledHero>
            <Heading as="h1" size="xxl" color="secondary" mb="24px">
              Beta NFTs
            </Heading>
            <Heading as="h2" size="lg" color="primary" mb="24px">
              NFTs exclusive for Beta Testers
            </Heading>
            {state.kdfnBetaCopied ?
            (<Button>
              Copied ✔
              </Button>): 
            (<Button onClick={copyKDFNBeta}>
              Copy Contract
            </Button>)
            }
          </StyledHero>
          <KdfnNftBetaList />
        </Page>
      </KdfnNftBetaProvider>
      <KotrtNftProvider>
        <Page>
          <StyledHero>
            <Heading as="h1" size="xxl" color="secondary" mb="24px">
              Knights of the Round Table
            </Heading>
            <Heading as="h2" size="lg" color="primary" mb="24px">
              {TranslateString(999, 'Unique NFTs for Knights of the Round Table!')}
            </Heading>
            {state.kotrtCopied ?
            (<Button>
              Copied ✔
              </Button>): 
            (<Button onClick={copyKOTRT}>
              Copy Contract
            </Button>)
            }
          </StyledHero>
          <KotrtNftList />
        </Page>
      </KotrtNftProvider>
      <NftProvider>
        <Page>
          <StyledHero>
            <Heading as="h1" size="xxl" color="secondary" mb="24px">
              The Grail Team
            </Heading>
            <Heading as="h2" size="lg" color="primary" mb="24px">
              {TranslateString(999, 'Unique NFTs for The Grail Team!')}
            </Heading>
            {state.theGrailCopied ?
            (<Button>
              Copied ✔
              </Button>): 
            (<Button onClick={copyTheGrail}>
              Copy Contract
            </Button>)
            }
          </StyledHero>
          <NftList />
        </Page>
      </NftProvider>
    </StyledHero>
  )
}

export default Nft
