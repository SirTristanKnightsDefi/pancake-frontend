import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
import { fetchFarmUserDataAsync, fetchBattlefieldUserDataAsync, updateUserBalance, updateUserPendingReward } from 'state/actions'
import { soushHarvest, soushHarvestBnb, harvest, battlefieldWithdrawReward, battlefieldWithdrawAllRewards } from 'utils/callHelpers'
import { useMasterchef, useSousChef, useBattlefield } from './useContract'

export const useHarvest = (farmPid: number) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useMasterchef()

  const handleHarvest = useCallback(async () => {
    const txHash = await harvest(masterChefContract, farmPid, account)
    dispatch(fetchFarmUserDataAsync(account))
    return txHash
  }, [account, dispatch, farmPid, masterChefContract])

  return { onReward: handleHarvest }
}

export const useBattlefieldHarvest = (battlefieldPid: number) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const battlefieldContract = useBattlefield()

  const handleHarvest = useCallback(async () => {
    const txHash = await battlefieldWithdrawReward(battlefieldContract, battlefieldPid, account)
    dispatch(fetchFarmUserDataAsync(account))
    return txHash
  }, [account, dispatch, battlefieldPid, battlefieldContract])

  return { onReward: handleHarvest }
}

export const useBattlefieldHarvestAll = () => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const battlefieldContract = useBattlefield()

  const handleHarvest = useCallback(async () => {
    const txHash = await battlefieldWithdrawAllRewards(battlefieldContract, account)
    dispatch(fetchFarmUserDataAsync(account))
    return txHash
  }, [account, dispatch, battlefieldContract])

  return { onWithdrawAllRewards: handleHarvest }
}

export const useAllHarvest = (farmPids: number[]) => {
  const { account } = useWallet()
  const masterChefContract = useMasterchef()

  const handleHarvest = useCallback(async () => {
    const harvestPromises = farmPids.reduce((accum, pid) => {
      return [...accum, harvest(masterChefContract, pid, account)]
    }, [])

    return Promise.all(harvestPromises)
  }, [account, farmPids, masterChefContract])

  return { onReward: handleHarvest }
}

export const useSousHarvest = (sousId, isUsingBnb = false) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const sousChefContract = useSousChef(sousId)
  const masterChefContract = useMasterchef()

  const handleHarvest = useCallback(async () => {
    if (sousId === 0) {
      await harvest(masterChefContract, 0, account)
    } else if (isUsingBnb) {
      await soushHarvestBnb(sousChefContract, account)
    } else {
      await soushHarvest(sousChefContract, account)
    }
    dispatch(updateUserPendingReward(sousId, account))
    dispatch(updateUserBalance(sousId, account))
  }, [account, dispatch, isUsingBnb, masterChefContract, sousChefContract, sousId])

  return { onReward: handleHarvest }
}
