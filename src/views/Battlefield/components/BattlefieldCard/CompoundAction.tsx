import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { Button, Flex, Heading, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useBattlefieldCompound } from 'hooks/useCompound'
import { getBalanceNumber } from 'utils/formatBalance'
import HarvestButton from './HarvestButton'

interface BattlefieldCardActionsProps {
  earnings?: BigNumber
  pid?: number
}

const CompoundAction: React.FC<BattlefieldCardActionsProps> = ({ earnings, pid }) => {
  const [pendingTx, setPendingTx] = useState(false)
  const { onCompound } = useBattlefieldCompound(pid)

  const rawEarningsBalance = getBalanceNumber(earnings)

  return (
    <Flex justifyContent="space-between" alignItems="right" flexDirection="column-reverse">
      <HarvestButton
        onClick={async () => {
          setPendingTx(true)
          await onCompound()
          setPendingTx(false)
        }}
      >
        <Text fontSize="14px">Compound</Text>
      </HarvestButton>
    </Flex>
  )
}

export default CompoundAction
