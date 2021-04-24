import React from 'react'
import styled from 'styled-components'
import { Heading } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import NftList from './components/NftList'
import NftProvider, {KotrtNftProvider, KdfnNftProvider} from './contexts/NftProvider'
import KotrtNftList from './components/KotrtNftList'
import KdfnNftList from './components/KdfnNftList'

const StyledHero = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.textSubtle};
  margin-bottom: 24px;
  padding-bottom: 32px;
`

const Nft = () => {
  const TranslateString = useI18n()

  return (
    <StyledHero>
      <KdfnNftProvider>
        <Page>
          <StyledHero>
            <Heading as="h1" size="xxl" color="secondary" mb="24px">
              NFTs for Purchase
            </Heading>
            <Heading as="h2" size="lg" color="secondary">
              {TranslateString(999, 'NFTs for Sale!')}
            </Heading>
          </StyledHero>
          <KdfnNftList />
        </Page>
      </KdfnNftProvider>
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
