import React from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout } from '@pancakeswap-libs/uikit'
import Page from 'components/layout/Page'
import FarmStakingCard from 'views/Home/components/FarmStakingCard'
import CakeStats from 'views/Home/components/CakeStats'
import TableStats from 'views/Home/components/TableStats'
import LegendStats from 'views/Home/components/LegendStats'
import SquireStats from 'views/Home/components/SquireStats'
import ShillingStats from 'views/Home/components/ShillingStats'
import { ShillingRewardsCard } from 'views/Battlefield/components/BattlefieldCard/ShillingRewardsCard'
import TotalValueLockedCard from 'views/Home/components/TotalValueLockedCard'
import useTheme from 'hooks/useTheme'
import LotteryCard from 'views/Home/components/LotteryCard'
import TwitterCard from './components/TwitterCard'
import TwitterCardDark from './components/TwitterCardDark'
import EarnAPYCard from './components/EarnAPYCard'




const Hero = styled.div`
  align-items: center;
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  padding-top: 60px;
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
  const { isDark } = useTheme();
  

  return (
    <Page>
      <Hero>
        <FatHeading as="h1" size="xl" mb="50px" color="primary">
          {/* TranslateString(576, 'Knights of the Round Table') */}
          Knights of the Round Table DeFi
        </FatHeading>
        <FatText>
          {/* TranslateString(578, 'A new approach to DeFi with Integrity.') */}
          A new approach to DeFi with Integrity and Honor.
        </FatText>
      </Hero>
      <Cards>
        <ShillingRewardsCard />
        <FarmStakingCard />
        <LotteryCard />
        {isDark ? <TwitterCardDark /> : <TwitterCard />}
        <EarnAPYCard />
        <ShillingStats />
        <SquireStats />
        <CakeStats />
        <LegendStats />
        <TableStats />
        <TotalValueLockedCard />
      </Cards>
      <Hero>
        <Text>Donate to Community Fund - BSC: 0x97e09Ed54d038295a8D6e6e77524328d7d9D3fca</Text>
        <Text>Donate to Sir Tris - BSC / ETH: 0xb017c481575318017DC2122b59759B25d21f6721</Text>
      </Hero>
        
    </Page>
  )
}

export default Home
