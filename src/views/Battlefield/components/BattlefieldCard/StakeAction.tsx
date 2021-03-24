import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Button, Flex, Heading, IconButton, AddIcon, MinusIcon, useModal, AutoRenewIcon } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import {useBattlefieldStake} from 'hooks/useStake'
import {useBattlefieldUnstake} from 'hooks/useUnstake'
import {useBattlefieldCompound} from 'hooks/useCompound'
import { getBalanceNumber } from 'utils/formatBalance'
import DepositModal from '../DepositModal'
import WithdrawModal from '../WithdrawModal'
import CompoundModal from '../CompoundModal'

interface BattlefieldCardActionsProps {
  stakedBalance?: BigNumber
  tokenBalance?: BigNumber
  tokenName?: string
  pid?: number
  addLiquidityUrl?: string
}

const IconButtonWrapper = styled.div`
  display: flex;
  svg {
    width: 20px;
  }
`

const StakeAction: React.FC<BattlefieldCardActionsProps> = ({
  stakedBalance,
  tokenBalance,
  tokenName,
  pid,
  addLiquidityUrl,
}) => {
  const TranslateString = useI18n()
  const { onStake } = useBattlefieldStake(pid)
  const { onUnstake } = useBattlefieldUnstake(pid)
  const { onCompound } = useBattlefieldCompound(pid)

  const rawStakedBalance = getBalanceNumber(stakedBalance)
  const displayBalance = rawStakedBalance.toLocaleString()

  const [onPresentDeposit] = useModal(
    <DepositModal max={tokenBalance} onConfirm={onStake} tokenName={tokenName} addLiquidityUrl={addLiquidityUrl} />,
  )
  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={stakedBalance} onConfirm={onUnstake} tokenName={tokenName} />,
  )

  const [onPresentCompound] = useModal(
    <CompoundModal max={stakedBalance} onConfirm={onCompound} tokenName={tokenName} />,
  )

  const renderStakingButtons = () => {
    return rawStakedBalance === 0 ? (
      <Button onClick={onPresentDeposit}>{TranslateString(999, 'Stake')}</Button>
    ) : (
      <IconButtonWrapper>
        <IconButton variant="tertiary" onClick={onPresentWithdraw} mr="6px">
          <MinusIcon color="primary" />
        </IconButton>
        <IconButton variant="tertiary" onClick={onPresentDeposit} mr="6px">
          <AddIcon color="primary" />
        </IconButton>
        <IconButton variant="tertiary" onClick={onPresentCompound}>
          <AutoRenewIcon color="primary" />
        </IconButton>
      </IconButtonWrapper>
    )
  }

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Heading color={rawStakedBalance === 0 ? 'textDisabled' : 'text'}>{displayBalance}</Heading>
      {renderStakingButtons()}
    </Flex>
  )
}

export default StakeAction
