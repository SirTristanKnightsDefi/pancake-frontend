import { useCallback } from 'react'
import { useWallet } from 'use-wallet'
import { useDispatch } from 'react-redux'
import {
  fetchFarmUserDataAsync,
  fetchBattlefieldUserDataAsync,
  updateUserStakedBalance,
  updateUserBalance,
  updateUserPendingReward,
} from 'state/actions'
import { unstake, sousUnstake, sousEmegencyUnstake, battlefieldWithdraw } from 'utils/callHelpers'
import { useMasterchef, useSousChef, useBattlefield, useShilling } from './useContract'

const useUnstake = (pid: number) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useMasterchef()

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterChefContract, pid, amount, account)
      dispatch(fetchFarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, masterChefContract, pid],
  )

  return { onUnstake: handleUnstake }
}

export const useBattlefieldUnstake = (pid: number) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const battlefieldContract = useBattlefield()

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await battlefieldWithdraw(battlefieldContract, pid, amount, account)
      dispatch(fetchBattlefieldUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, battlefieldContract, pid],
  )

  return {onUnstake: handleUnstake}
}

export const useBattlefieldShillingWithdraw = (pid: number, amount: number) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const battlefieldContract = useBattlefield()

  const handleUnstake = useCallback(
    async () => {
      let txHash = 0
      if(amount > 0){
        txHash = await battlefieldContract.methods.withdraw(pid, amount, false).send({from: account})
      } else {
        txHash = await battlefieldContract.methods.withdrawReward(pid).send({from: account})
      }
      dispatch(fetchBattlefieldUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, battlefieldContract, pid, amount],
  )

  return {onUnstake: handleUnstake}
}

const SYRUPIDS = [5, 6, 3, 1, 22, 23]

export const useSousUnstake = (sousId) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useMasterchef()
  const sousChefContract = useSousChef(sousId)
  const isOldSyrup = SYRUPIDS.includes(sousId)

  const handleUnstake = useCallback(
    async (amount: string) => {
      if (sousId === 0) {
        const txHash = await unstake(masterChefContract, 0, amount, account)
        console.info(txHash)
      } else if (isOldSyrup) {
        const txHash = await sousEmegencyUnstake(sousChefContract, amount, account)
        console.info(txHash)
      } else {
        const txHash = await sousUnstake(sousChefContract, amount, account)
        console.info(txHash)
      }
      dispatch(updateUserStakedBalance(sousId, account))
      dispatch(updateUserBalance(sousId, account))
      dispatch(updateUserPendingReward(sousId, account))
    },
    [account, dispatch, isOldSyrup, masterChefContract, sousChefContract, sousId],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
