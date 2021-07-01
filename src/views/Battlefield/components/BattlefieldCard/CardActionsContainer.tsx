import React, { useMemo, useState, useCallback } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { provider } from 'web3-core'
import { getContract } from 'utils/erc20'
import { getAddress } from 'utils/addressHelpers'
import { Button, Flex, Text } from '@pancakeswap-libs/uikit'
import { Battlefield} from 'state/types'
import { useBattlefieldFromSymbol, useBattlefieldUser } from 'state/hooks'
import useI18n from 'hooks/useI18n'
import UnlockButton from 'components/UnlockButton'
import { useBattlefieldApprove } from 'hooks/useApprove'
import StakeAction from './StakeAction'
import HarvestAction from './HarvestAction'
import CompoundAction from './CompoundAction'

const Action = styled.div`
  padding-top: 16px;
`
export interface BattlefieldWithStakedValue extends Battlefield {
  apy?: BigNumber
}

interface BattlefieldCardActionsProps {
  battlefield: BattlefieldWithStakedValue
  ethereum?: provider
  account?: string
  addLiquidityUrl?: string
  earnedValue?: BigNumber
  stakedBalanceFormatted?: string
}

const CardActions: React.FC<BattlefieldCardActionsProps> = ({ battlefield, ethereum, account, addLiquidityUrl, earnedValue, stakedBalanceFormatted }) => {
  const TranslateString = useI18n()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { pid, lpAddresses } = useBattlefieldFromSymbol(battlefield.lpSymbol)
  const { allowance, tokenBalance, stakedBalance, earnings } = useBattlefieldUser(pid)
  const lpAddress = getAddress(lpAddresses)
  const lpName = battlefield.lpSymbol.toUpperCase()
  const isApproved = account && allowance && allowance.isGreaterThan(0)

  const lpContract = useMemo(() => {
    return getContract(ethereum as provider, lpAddress)
  }, [ethereum, lpAddress])

  const { onApprove } = useBattlefieldApprove(lpContract)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApprove])

  const renderApprovalOrStakeButton = () => {
    return isApproved ? (
      <StakeAction
        stakedBalance={stakedBalance}
        tokenBalance={tokenBalance}
        tokenName={lpName}
        pid={pid}
        addLiquidityUrl={addLiquidityUrl}
        stakedBalanceFormatted={stakedBalanceFormatted}
      />
    ) : (
      <Button mt="8px" disabled={requestedApproval} onClick={handleApprove}>
        {TranslateString(758, 'Approve Contract')}
      </Button>
    )
  }

  return (
    <Action>
    {account ?
      <Action>
      <Flex>
        <Text bold textTransform="uppercase" color="secondary" fontSize="12px" pr="3px">
          {lpName}
        </Text>
        <Text bold textTransform="uppercase" color="textSubtle" fontSize="12px">
          {TranslateString(1074, 'Staked')}
        </Text>
      </Flex>{
        isApproved ? (
          <StakeAction
            stakedBalance={stakedBalance}
            tokenBalance={tokenBalance}
            tokenName={lpName}
            pid={pid}
            addLiquidityUrl={addLiquidityUrl}
            stakedBalanceFormatted={stakedBalanceFormatted}
          />
        ) : (
          <Button mt="8px" disabled={requestedApproval} onClick={handleApprove}>
            {TranslateString(758, 'Approve Contract')}
          </Button>
        )}
      </Action>
      : <UnlockButton mt="8px"  />
  }
  </Action>
    
  )
}

export default CardActions
