import React from 'react'
import { Card, CardBody, Heading, Text } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { getCakeAddress } from 'utils/addressHelpers'
import { usePriceCakeBusd } from 'state/hooks'
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

const CakeStats = () => {
  const totalSupply = useTotalSupply()
  const burnedBalance = useBurnedBalance(getCakeAddress())
  const cakeSupply = totalSupply ? getBalanceNumber(totalSupply) - getBalanceNumber(burnedBalance) : 0
  const knightMarketCap = usePriceCakeBusd().toNumber() * cakeSupply
  const knightPerBlock = 3

  return (
    <StyledCakeStats>
      <CardBodyExtended>
        <Heading size="xl" mb="24px">
          KNIGHT Stats
        </Heading>
        <Row>
          <Text fontSize="14px">Total KNIGHT Supply</Text>
          {cakeSupply && <CardValue fontSize="14px" decimals={1} value={cakeSupply} />}
        </Row>
        <Row>
          <Text fontSize="14px">Total KNIGHT Burned</Text>
          <CardValue fontSize="14px" decimals={1}value={getBalanceNumber(burnedBalance)} />
        </Row>
        <Row>
          <Text fontSize="14px">New KNIGHT/block</Text>
          <CardValue fontSize="14px" decimals={0} value={knightPerBlock} />
        </Row>
        <Row>
          <Text fontSize="14px">KNIGHT Market Cap</Text>
          <CardValue fontSize="14px" decimals={0} value={knightMarketCap} />
        </Row>
      </CardBodyExtended>
    </StyledCakeStats>
  )
}

export default CakeStats
