import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
import { fetchBattlefieldUserDataAsync, updateUserBalance, updateUserPendingReward } from 'state/actions'
import { battlefieldCompound, battlefieldCompoundAll } from 'utils/callHelpers'
import { useBattlefield } from './useContract'

export const useBattlefieldCompound = (battlefieldPid: number) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const battlefieldContract = useBattlefield()

  const handleCompound = useCallback(async () => {
    const txHash = await battlefieldCompound(battlefieldContract, battlefieldPid, account)
    dispatch(fetchBattlefieldUserDataAsync(account))
    return txHash
  }, [account, dispatch, battlefieldPid, battlefieldContract])

  return { onCompound: handleCompound }
}

export const useBattlefieldCompoundAll = () => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const battlefieldContract = useBattlefield()

  const handleCompound = useCallback(async () => {
    const txHash = await battlefieldCompoundAll(battlefieldContract, account)
    dispatch(fetchBattlefieldUserDataAsync(account))
    return txHash
  }, [account, dispatch, battlefieldContract])

  return { onCompoundAll: handleCompound }
}

