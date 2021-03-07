import React from 'react'
import { Card, CardBody, Heading, Text } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupplyTable, useBurnedBalance } from 'hooks/useTokenBalance'
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
  const burnedBalance = useBurnedBalance(getTableAddress())
  const tableSupply = totalSupply ? getBalanceNumber(totalSupply) - getBalanceNumber(burnedBalance) : 0
  const tableMarketCap = usePriceTableBusd().toNumber() * tableSupply 

  return (
    <StyledCakeStats>
      <CardBodyExtended>
        <Heading size="xl" mb="24px">
          TABLE Stats
        </Heading>
        <Row>
          <Text fontSize="14px">Total TABLE Supply</Text>
          {tableSupply && <CardValue fontSize="14px" decimals={1} value={tableSupply} />}
        </Row>
        <Row>
          <Text fontSize="14px">Total TABLE Burned</Text>
          <CardValue fontSize="14px" decimals={1}value={getBalanceNumber(burnedBalance)} />
        </Row>
        <Row>
          <Text fontSize="14px">TABLE Market Cap</Text>
          <CardValue fontSize="14px" decimals={0} value={tableMarketCap} />
        </Row>
        <Row>
          <Text fontSize="14px">{"\n"}</Text>
        </Row>
      </CardBodyExtended>
    </StyledCakeStats>
  )
}

export default TableStats
