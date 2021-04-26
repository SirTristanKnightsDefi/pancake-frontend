import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Heading } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import useRefresh from 'hooks/useRefresh'
import NftList from './components/NftList'
import NftProvider, {KotrtNftProvider, KdfnNftProvider, KdfnNftBetaProvider} from './contexts/NftProvider'
import KotrtNftList from './components/KotrtNftList'
import KdfnNftList from './components/KdfnNftList'
import KdfnNftBetaList from './components/KdfnNftBetaList'

const StyledHero = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.textSubtle};
  margin-bottom: 24px;
  padding-bottom: 32px;
`

const Nft = () => {
  const TranslateString = useI18n()
  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  
  const { account} = useWallet()

  useEffect(() => {
    const refresh = true
  }, [account, dispatch, fastRefresh])

  return (
    <StyledHero>
      <KdfnNftProvider>
        <Page>
          <StyledHero>
            <Heading as="h1" size="xxl" color="secondary" mb="24px">
              The NFT Marketplace!
            </Heading>
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
            <Heading as="h2" size="lg" color="secondary">
              {TranslateString(999, 'Unique NFTs for Knights of the Round Table!')}
            </Heading>
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
            <Heading as="h2" size="lg" color="secondary">
              {TranslateString(999, 'Unique NFTs for The Grail Team!')}
            </Heading>
          </StyledHero>
          <NftList />
        </Page>
      </NftProvider>
    </StyledHero>
  )
}

export default Nft
