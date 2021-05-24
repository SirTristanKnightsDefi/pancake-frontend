import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { Button, Flex, Heading, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useBattlefieldHarvest } from 'hooks/useHarvest'
import { getBalanceNumber } from 'utils/formatBalance'

interface BattlefieldCardActionsProps {
  earnings?: BigNumber
  pid?: number
}

const HarvestAction: React.FC<BattlefieldCardActionsProps> = ({ earnings, pid }) => {
  const TranslateString = useI18n()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useBattlefieldHarvest(pid)

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

  return (
    <Flex mb="8px" justifyContent="space-between" alignItems="center">
      <Heading color={rawEarningsBalance === 0 ? 'textDisabled' : 'text'}>{displayBalance}</Heading>
      <Button
        disabled={rawEarningsBalance === 0 || pendingTx}
        onClick={async () => {
          setPendingTx(true)
          await onReward()
          setPendingTx(false)
        }}
      >
        <Text color="tertiary">Harvest</Text>
      </Button>
    </Flex>
  )
}

export default HarvestAction
