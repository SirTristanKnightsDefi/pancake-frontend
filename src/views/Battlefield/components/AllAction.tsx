import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Text, Button, Flex, Heading, IconButton, AddIcon, MinusIcon, useModal, AutoRenewIcon } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useBattlefieldCompoundAll} from 'hooks/useCompound'
import { useBattlefieldHarvestAll } from 'hooks/useHarvest'
import { getBalanceNumber } from 'utils/formatBalance'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'
import CompoundAllModal from './CompoundAllModal'

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

const AllAction: React.FC<BattlefieldCardActionsProps> = () => {
  const TranslateString = useI18n()
  const { onCompoundAll } = useBattlefieldCompoundAll()
  const { onWithdrawAllRewards } = useBattlefieldHarvestAll()

  const renderCompoundAllButton = () => {
    return(   
      <Button variant="primary" onClick={onCompoundAll} mr="6px">
        <Text color="tertiary">Compound All</Text>
      </Button>
    )
  }

  const renderWithdrawAllRewardsButton = () => {
    return(   
      <Button variant="primary" onClick={onWithdrawAllRewards} >
        <Text color="tertiary">Harvest All</Text>
      </Button>
    )
  }

  return (
    <Flex justifyContent="space-between" alignItems="stretch">
      {renderCompoundAllButton()}
      {renderWithdrawAllRewardsButton()}
    </Flex>

  )
}

export default AllAction
