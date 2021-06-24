import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { Button, Flex, Heading, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useBattlefieldHarvest } from 'hooks/useHarvest'
import { useBattlefieldShillingWithdraw } from 'hooks/useUnstake'
import { getBalanceNumber } from 'utils/formatBalance'
import CompoundAction from './CompoundAction'
import HarvestButton from './HarvestButton'

interface BattlefieldCardActionsProps {
  earnings?: BigNumber
  pid?: number
  earnedValue?: BigNumber
  showCompound?: boolean
  stakingBalance?: number
}

const HarvestOnlyAction: React.FC<BattlefieldCardActionsProps> = ({ earnings, pid, earnedValue, stakingBalance}) => {
  const TranslateString = useI18n()
  const [pendingTx, setPendingTx] = useState(false)
  const { onUnstake } = useBattlefieldShillingWithdraw(pid, stakingBalance)


  let precision = 0
  const rawEarningsBalance = getBalanceNumber(earnings)
  if(rawEarningsBalance < 1000 && rawEarningsBalance >= 100){
    precision = 1
  }
  if(rawEarningsBalance < 100 && rawEarningsBalance >= 1){
    precision = 2
  }
  if(rawEarningsBalance < 1 && rawEarningsBalance >= .01){
    precision = 3
  }
  if(rawEarningsBalance < .01 && rawEarningsBalance >= 0.001){
    precision = 4
  } 
  if(rawEarningsBalance < 0.001 && rawEarningsBalance >= 0){
    precision = 5
  }
  if(rawEarningsBalance === 0){
      precision = 0
  }

  const displayBalance = new BigNumber(rawEarningsBalance.toFixed(precision)).toNumber()
  let newDisplayBalance = "0"
  if(displayBalance > .001){
    newDisplayBalance = displayBalance.toLocaleString()
  } else {
    newDisplayBalance = displayBalance.toFixed(precision)
  }
  const formattedEarnedValue = getBalanceNumber(earnedValue).toLocaleString()

  return (
    <Heading>
      <Flex mb="2px" justifyContent="space-between" alignItems="center">
        <Heading color={rawEarningsBalance === 0 ? 'textDisabled' : 'text'}>{newDisplayBalance}</Heading>
        <HarvestButton
          onClick={async () => {
            setPendingTx(true)
            await onUnstake()
            setPendingTx(false)
          }}
        >
          <Text fontSize="14px">Harvest</Text>
        </HarvestButton>
      </Flex>
      <Flex mb="8px" justifyContent="space-between" alignItems="center">
        <Text fontSize="14px"> (~${formattedEarnedValue})</Text>
      </Flex>

    </Heading>
  )
}

export default HarvestOnlyAction
