import React, { useState, useCallback, useMemo} from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button, Text } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useI18n from 'hooks/useI18n'
import { useAllHarvest } from 'hooks/useHarvest'
import { usePriceCakeBusd, usePriceLegendBusd, usePriceTableBusd, usePriceSquireBusd, useBattlefieldUser } from 'state/hooks'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import UnlockButton from 'components/UnlockButton'
import AllAction from 'views/Battlefield/components/AllAction'
import { getBalanceNumber } from 'utils/formatBalance'
import CakeHarvestBalance from './CakeHarvestBalance'
import CakeWalletBalance from './CakeWalletBalance'

const StyledFarmStakingCard = styled(Card)`
  // background-image: url('/images/table.svg');
  background-repeat: no-repeat;
  background-position: right top;
  background-size: 75%;
`

const Block = styled.div`
  margin-bottom: 16px;
`

const CardImage = styled.img`
  margin-bottom: 16px;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
`

const Actions = styled.div`
  margin-top: 24px;
`

const FarmedStakingCard = () => {

  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWallet()
  const TranslateString = useI18n()
  const farmsWithBalance = useFarmsWithBalance()
  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)
  const knightPrice = getBalanceNumber(usePriceCakeBusd())
  const legendPrice = getBalanceNumber(usePriceLegendBusd())
  const tablePrice = getBalanceNumber(usePriceTableBusd())
  const squirePrice = getBalanceNumber(usePriceSquireBusd())
  const { earnings } = useBattlefieldUser(0)
  const knightEarnings = new BigNumber(getBalanceNumber(earnings.multipliedBy(1e18)) * knightPrice).toFixed(2)

  const { onReward } = useAllHarvest(balancesWithValue.map((farmWithBalance) => farmWithBalance.pid))

  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true)
    try {
      await onReward()
    } catch (error) {
      // Find a way to handle when the user rejects transaction or it fails
    } finally {
      setPendingTx(false)
    }
  }, [onReward])

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading size="xl" mb="24px">
          {TranslateString(542, 'Farms & Staking')}
        </Heading>
        <Block>
          <Label>KNIGHT to Harvest:</Label>
          <CakeHarvestBalance />
        </Block>
        <Block>
          <Label>KNIGHT in Wallet:</Label>
          <CakeWalletBalance />
        </Block>
        <Actions>
          {account ? (
            <Button
              id="harvest-all"
              disabled={balancesWithValue.length <= 0 || pendingTx}
              onClick={harvestAllFarms}
              
              mb="24px"
            >
              {pendingTx
                ? <Text color="tertiary">Collecting KNIGHT</Text>
                : <Text color="tertiary">Harvest all ({balancesWithValue.length})</Text>
              }
          </Button>
            
          ) : (
            <UnlockButton  />
          )}
        </Actions>
        <Heading size="xl" mb="24px">
          {TranslateString(542, 'Battlefield Rewards')}
        </Heading>   
        {account ? (
            <AllAction/>
            
          ) : (
            <UnlockButton  />
          )}     
        
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default FarmedStakingCard
