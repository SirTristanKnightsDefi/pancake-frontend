import React from 'react'
import { Card, CardBody, Heading, Text, Button } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupplyShilling, useShillingBurnedBalance } from 'hooks/useTokenBalance'
import { getShillingAddress } from 'utils/addressHelpers'
import { usePriceShillingBusd } from 'state/hooks'
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

const ShillingStats = () => {
  const totalSupply = useTotalSupplyShilling()
  const burnedBalance = useShillingBurnedBalance()
  const shillingPrice = usePriceShillingBusd().toNumber()
  const shillingSupply = totalSupply ? getBalanceNumber(totalSupply) - getBalanceNumber(burnedBalance) : 0
  const shillingMarketCap = usePriceShillingBusd().toNumber() * shillingSupply 

  return (
    <StyledCakeStats>
      <CardBodyExtended>
        <Heading size="lg" mb="12px">
          <img
              src="https://ipfs.io/ipfs/Qmey8kWdYJEj5VSQqBqj2aAkga9tzEZKk8ddCAmDSTDDot?filename=shilling.svg"
              alt="SHILLING Logo"
              style={{
                width: "48px",
                marginRight: "8px",
              }}
            />
          SHILLING Stats
        </Heading>
        <Button as="a" variant="secondary" mb="12px" href={`https://psidex.passive-income.io/#/swap?outputCurrency=${getShillingAddress()}`} target="_blank">
            Buy Shilling
        </Button>
        <Button as="a" variant="secondary" mb="12px" ml="12px" href={`https://poocoin.app/tokens/${getShillingAddress()}`} target="_blank">
            Shilling Chart
          </Button>
        <Row>
          <Text fontSize="14px">SHILLING Price</Text>
          {shillingPrice && <CardValue fontSize="14px" decimals={8} value={shillingPrice} prefix='$'/>}
        </Row>
        <Row>
          <Text fontSize="14px">Total SHILLING Supply</Text>
          {shillingSupply && <CardValue fontSize="14px" decimals={0} value={shillingSupply} />}
        </Row>
        <Row>
          <Text fontSize="14px">Total SHILLING Burned</Text>
          <CardValue fontSize="14px" decimals={0}value={getBalanceNumber(burnedBalance)} />
        </Row>
        <Row>
          <Text fontSize="14px">SHILLING Market Cap</Text>
          <CardValue fontSize="14px" decimals={0} value={shillingMarketCap} prefix='$'/>
        </Row>
        <Row>
          <Text fontSize="14px">{"\n"}</Text>
        </Row>
      </CardBodyExtended>
    </StyledCakeStats>
  )
}

export default ShillingStats
