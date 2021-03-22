import React from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout } from '@pancakeswap-libs/uikit'
import Page from 'components/layout/Page'
import FarmStakingCard from 'views/Home/components/FarmStakingCard'
import CakeStats from 'views/Home/components/CakeStats'
import TableStats from 'views/Home/components/TableStats'
import LegendStats from 'views/Home/components/LegendStats'
import TotalValueLockedCard from 'views/Home/components/TotalValueLockedCard'
import TwitterCard from './components/TwitterCard';

const Hero = styled.div`
  align-items: center;
  background-image: url('/images/excalibur.png');
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  padding-top: 116px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    background-image: url('/images/excalibur.png'), url('/images/excalibur.png');
    background-position: left center, right center;
    background-size: contain;
    height: 165px;
    padding-top: 0;
  }
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

const FatHeading = styled(Heading)`
  font-weight: 800;
`

const FatText = styled(Text)`
  font-weight: 600;
`

const Home: React.FC = () => {
  return (
    <Page>
      <Hero>
        <FatHeading as="h1" size="xl" mb="24px" color="primary">
          {/* TranslateString(576, 'Knights of the Round Table') */}
          Knights of the Round Table DeFi
        </FatHeading>
        <FatText>
          {/* TranslateString(578, 'A new approach to DeFi with Integrity.') */}
          A new approach to DeFi with Integrity and Honor.
        </FatText>
      </Hero>
      <Cards>
        <FarmStakingCard />
        <TwitterCard />
        <TotalValueLockedCard />
        <CakeStats />
        <TableStats />
        <LegendStats />
      </Cards>
    </Page>
  )
}

export default Home
