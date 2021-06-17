import React from 'react'
import { Card, CardBody, Heading, Text, Button } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupplyTable, useTableBurnedBalance } from 'hooks/useTokenBalance'
import { getTableAddress } from 'utils/addressHelpers'
import { usePriceTableBusd } from 'state/hooks'
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

const TableStats = () => {
  const totalSupply = useTotalSupplyTable()
  const burnedBalance = useTableBurnedBalance()
  const tablePrice = usePriceTableBusd().toNumber()
  const tableSupply = totalSupply ? getBalanceNumber(totalSupply) - getBalanceNumber(burnedBalance) : 0
  const tableMarketCap = usePriceTableBusd().toNumber() * tableSupply 

  return (
    <StyledCakeStats>
      <CardBodyExtended>
        <Heading size="lg" mb="12px">
        <img
              src="https://ipfs.io/ipfs/QmXv83F1Qp1kv812msr2QfcHh8Uh5S1Gb1XeH5qZFS8EVV?filename=table.png"
              alt="TABLE Logo"
              style={{
                width: "48px",
                marginRight: "8px",
              }}
            />
            TABLE Stats
        </Heading>
        <Button as="a" variant="secondary" mb="12px" href={`https://psidex.passive-income.io/#/swap?outputCurrency=${getTableAddress()}`} target="_blank">
            Buy Table
        </Button>
        <Button as="a" variant="secondary" mb="12px" ml="12px" href={`https://poocoin.app/tokens/${getTableAddress()}`} target="_blank">
            Table Chart
        </Button>
        <Row>
          <Text fontSize="14px">TABLE Price</Text>
          {tablePrice && <CardValue fontSize="14px" decimals={2} value={tablePrice} prefix='$'/>}
        </Row>
        <Row>
          <Text fontSize="14px">Total TABLE Supply</Text>
          {tableSupply && <CardValue fontSize="14px" decimals={3} value={tableSupply} />}
        </Row>
        <Row>
          <Text fontSize="14px">Total TABLE Burned</Text>
          <CardValue fontSize="14px" decimals={3}value={getBalanceNumber(burnedBalance)} />
        </Row>
        <Row>
          <Text fontSize="14px">TABLE Market Cap</Text>
          <CardValue fontSize="14px" decimals={0} value={tableMarketCap} prefix='$'/>
        </Row>
        <Row>
          <Text fontSize="14px">{"\n"}</Text>
        </Row>
      </CardBodyExtended>
    </StyledCakeStats>
  )
}

export default TableStats
