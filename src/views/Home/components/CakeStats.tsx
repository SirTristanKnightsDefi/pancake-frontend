import React from 'react'
import { Card, CardBody, Heading, Text, Button } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { getCakeAddress } from 'utils/addressHelpers'
import { usePriceCakeBusd } from 'state/hooks'
import { CAKE_PER_BLOCK } from 'config'
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
  const knightPerBlock = CAKE_PER_BLOCK.toNumber() * 1
  return (
    <StyledCakeStats>
      <CardBodyExtended>
        <Heading size="lg" mb="12px">
          KNIGHT Stats 
        </Heading>
          <Button as="a" variant="secondary" mb="12px" href={`https://v1exchange.pancakeswap.finance/#/swap?outputCurrency=${getCakeAddress()}`} target="_blank">
            Buy Knight
          </Button>
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
          <CardValue fontSize="14px" decimals={0} value={knightMarketCap} prefix='$'/>
        </Row>
      </CardBodyExtended>
    </StyledCakeStats>
  )
}

export default CakeStats
