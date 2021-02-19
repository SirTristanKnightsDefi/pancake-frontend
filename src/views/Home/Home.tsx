import React from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout } from '@pancakeswap-libs/uikit'
import Page from 'components/layout/Page'
import FarmStakingCard from 'views/Home/components/FarmStakingCard'
import CakeStats from 'views/Home/components/CakeStats'
import TotalValueLockedCard from 'views/Home/components/TotalValueLockedCard'

const Hero = styled.div`
  align-items: center;
  background-image: url('/images/pan-bg-mobile.svg');
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
    background-image: url('/images/milk.png'), url('/images/milk.png');
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

const Home: React.FC = () => {
  return (
    <Page>
      <Hero>
        <Heading as="h1" size="xl" mb="24px" color="secondary">
          {/* TranslateString(576, 'PancakeSwap') */}
          MilkSwap
        </Heading>
        <Text>
          {/* TranslateString(578, 'The #1 AMM and yield farm on Binance Smart Chain.') */}
          The milkiest AMM and yield farm on Binance Smart Chain.
        </Text>
      </Hero>
      <div>
        <Cards>
          <FarmStakingCard />
          <div style={{
            display: 'grid',
            gridRowGap: 'inherit',
          }}>
            <TotalValueLockedCard />
            <CakeStats />
          </div>
        </Cards>
      </div>
    </Page>
  )
}

export default Home
