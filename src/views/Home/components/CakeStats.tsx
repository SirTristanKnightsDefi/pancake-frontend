import React from 'react'
import { Card, CardBody, Heading, Text, Button } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useKnightBurnedBalance } from 'hooks/useTokenBalance'
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
  const burnedBalance = useKnightBurnedBalance()
  const cakePrice = usePriceCakeBusd().toNumber()
  const cakeSupply = totalSupply ? getBalanceNumber(totalSupply) - getBalanceNumber(burnedBalance) : 0
  const knightMarketCap = usePriceCakeBusd().toNumber() * cakeSupply
  const knightPerBlock = CAKE_PER_BLOCK.toNumber() * 1
  return (
    <StyledCakeStats>
      <CardBodyExtended>
        <Heading size="lg" mb="12px">
        <img
              src="https://ipfs.io/ipfs/QmREFZU2mdg1Sv1Q2Ma8sB63uWBN9MsJ1WULWZ1Q1vk2ND?filename=knight.png"
              alt="KNIGHT Logo"
              style={{
                width: "48px",
                marginRight: "8px",
              }}
            />
            KNIGHT Stats 
        </Heading>
          <Button as="a" variant="secondary" mb="12px" href={`https://psidex.passive-income.io/#/swap?outputCurrency=${getCakeAddress()}`} target="_blank">
            Buy Knight
          </Button>
          <Button as="a" variant="secondary" mb="12px" ml="12px" href={`https://poocoin.app/tokens/${getCakeAddress()}`} target="_blank">
            Knight Chart
          </Button>
        <Row>
          <Text fontSize="14px">KNIGHT Price</Text>
          {cakeSupply && <CardValue fontSize="14px" decimals={3} value={cakePrice} prefix='$'/>}
        </Row>
        <Row>
          <Text fontSize="14px">Total KNIGHT Supply</Text>
          {cakeSupply && <CardValue fontSize="14px" decimals={0} value={cakeSupply} />}
        </Row>
        <Row>
          <Text fontSize="14px">Total KNIGHT Burned</Text>
          <CardValue fontSize="14px" decimals={0}value={getBalanceNumber(burnedBalance)} />
        </Row>
        <Row>
          <Text fontSize="14px">New KNIGHT/block</Text>
          <CardValue fontSize="14px" decimals={0} value={knightPerBlock} />
        </Row>
        <Row>
          <Text fontSize="14px">Total KNIGHT Left to Farm</Text>
          <CardValue fontSize="14px" decimals={0}value={10000000 - getBalanceNumber(burnedBalance) - cakeSupply} />
        </Row>
        <Row>
          <Text fontSize="14px">KNIGHT Farming Days Left (at current rate)</Text>
          <CardValue fontSize="14px" decimals={0}value={(10000000 - getBalanceNumber(burnedBalance) - cakeSupply)/28800} />
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
