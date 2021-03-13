import React from 'react'
import { Card, CardBody, Heading, Text } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupplyLegend, useBurnedBalance } from 'hooks/useTokenBalance'
import { getLegendAddress } from 'utils/addressHelpers'
import { usePriceLegendBusd } from 'state/hooks'
import CardValue from './CardValue'


const StyledCakeStats = styled(Card)`
  align-items: center;
  display: flex;
  flex: 1;
`
const CardBodyExtended = styled(CardBody)`
  width: 100%;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const LegendStats = () => {
  const totalSupply = useTotalSupplyLegend()
  const burnedBalance = useBurnedBalance(getLegendAddress())
  const legendSupply = totalSupply ? getBalanceNumber(totalSupply) - getBalanceNumber(burnedBalance) : 0
  const legendMarketCap = usePriceLegendBusd().toNumber() * legendSupply 

  return (
    <StyledCakeStats>
      <CardBodyExtended>
        <Heading size="xl" mb="24px">
          LEGEND Stats
        </Heading>
        <Row>
          <Text fontSize="14px">Total LEGEND Supply</Text>
          {legendSupply && <CardValue fontSize="14px" decimals={1} value={legendSupply} />}
        </Row>
        <Row>
          <Text fontSize="14px">Total LEGEND Burned</Text>
          <CardValue fontSize="14px" decimals={1}value={getBalanceNumber(burnedBalance)} />
        </Row>
        <Row>
          <Text fontSize="14px">LEGEND Market Cap</Text>
          <CardValue fontSize="14px" decimals={0} value={legendMarketCap} />
        </Row>
        <Row>
          <Text fontSize="14px">{"\n"}</Text>
        </Row>
      </CardBodyExtended>
    </StyledCakeStats>
  )
}

export default LegendStats
