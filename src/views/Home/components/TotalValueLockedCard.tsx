import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Skeleton, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useGetStats } from 'hooks/api'

import {
  useTotalValue, useTotalRewards
} from 'state/hooks'

const StyledTotalValueLockedCard = styled(Card)`
  align-items: center;
  display: flex;
  flex: 1;
`

const TotalValueLockedCard = () => {
  const TranslateString = useI18n()
  // const tvl = data ? data.total_value_locked_all.toLocaleString('en-US', { maximumFractionDigits: 0 }) : null
  const tvl = useTotalValue()
  const totalRewards = useTotalRewards()

  return (
    <StyledTotalValueLockedCard>
      <CardBody>
        <Heading size="lg" mb="24px">
          {TranslateString(762, 'Total Value Locked (TVL)')}
        </Heading>
        {tvl ? (
          <>
            <Heading size="xl">${tvl.toNumber().toLocaleString('en-US', { maximumFractionDigits: 0 })}</Heading>
            <Text color="textSubtle">{TranslateString(764, 'Across all Farms, Pools, and Battlefield')}</Text>
          </>
        ) : (
          <>
            <Skeleton height={66} />
          </>
        )}

        <Heading mt="12px"  size="lg" mb="24px">
          {TranslateString(762, 'Total Battlefield Rewards Remaining')}
        </Heading>
        {tvl ? (
          <>
            <Heading size="xl">${totalRewards.toNumber().toLocaleString('en-US', { maximumFractionDigits: 0 })}</Heading>
            <Text color="textSubtle">{TranslateString(764, 'In Battlefield')}</Text>
          </>
        ) : (
          <>
            <Skeleton height={66} />
          </>
        )}
      </CardBody>
    </StyledTotalValueLockedCard>
  )
}

export default TotalValueLockedCard
