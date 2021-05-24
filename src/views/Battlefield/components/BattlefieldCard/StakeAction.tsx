import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Button, Flex, Heading, IconButton, AddIcon, MinusIcon, useModal, Text } from '@pancakeswap-libs/uikit'
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

  let precision = 0
  if(rawStakedBalance < 1000 && rawStakedBalance >= 100){
    precision = 2
  }
  if(rawStakedBalance < 100 && rawStakedBalance >= 1){
    precision = 3
  }
  if(rawStakedBalance < 1 && rawStakedBalance >= .01){
    precision = 5
  }
  if(rawStakedBalance < .01 && rawStakedBalance >= 0){
    precision = 6
  } 
  if(rawStakedBalance === 0){
      precision = 0
  }

  const displayBalance =  new BigNumber(rawStakedBalance.toFixed(precision)).toNumber().toLocaleString()

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
      <Button onClick={onPresentDeposit}><Text color="tertiary">Stake</Text></Button>
    ) : (
      <IconButtonWrapper>
        <IconButton variant="tertiary" onClick={onPresentWithdraw} mr="6px">
          <MinusIcon color="primary" />
        </IconButton>
        <IconButton variant="tertiary" onClick={onPresentDeposit} mr="6px">
          <AddIcon color="primary" />
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
