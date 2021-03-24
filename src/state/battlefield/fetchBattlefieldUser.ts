import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import battlefieldABI from 'config/abi/battlefield.json'
import multicall from 'utils/multicall'
import battlefieldsConfig from 'config/constants/battlefield'
import { getAddress, getBattlefieldAddress } from 'utils/addressHelpers'

export const fetchBattlefieldUserAllowances = async (account: string) => {
  const battlefieldAddress = getBattlefieldAddress()

  const calls = battlefieldsConfig.map((battlefield) => {
    const lpContractAddress = getAddress(battlefield.lpAddresses)
    return { address: lpContractAddress, name: 'allowance', params: [account, battlefieldAddress] }
  })

  const rawLpAllowances = await multicall(erc20ABI, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance).toJSON()
  })
  return parsedLpAllowances
}

export const fetchBattlefieldUserTokenBalances = async (account: string) => {
  const calls = battlefieldsConfig.map((battlefield) => {
    const lpContractAddress = getAddress(battlefield.lpAddresses)
    return {
      address: lpContractAddress,
      name: 'balanceOf',
      params: [account],
    }
  })

  const rawTokenBalances = await multicall(erc20ABI, calls)
  const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
    return new BigNumber(tokenBalance).toJSON()
  })
  return parsedTokenBalances
}

export const fetchBattlefieldUserStakedBalances = async (account: string) => {
  const battlefieldAddress = getBattlefieldAddress()

  const calls = battlefieldsConfig.map((battlefield) => {
    return {
      address: battlefieldAddress,
      name: 'userHoldings',
      params: [account, battlefield.pid],
    }
  })

  const rawStakedBalances = await multicall(battlefieldABI, calls)
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0]._hex).toJSON()
  })
  return parsedStakedBalances
}

export const fetchBattlefieldUserArmyStrength = async (account: string) => {
  const battlefieldAddress = getBattlefieldAddress()

  const calls = battlefieldsConfig.map((battlefield) => {
    return {
      address: battlefieldAddress,
      name: 'getHolderArmyStrength',
      params: [account],
    }
  })

  const userArmyStrength = await multicall(battlefieldABI, calls)

  return userArmyStrength
}

export const fetchBattlefieldUserEarnings = async (account: string) => {
  const battlefieldAddress = getBattlefieldAddress()

  const calls = battlefieldsConfig.map((battlefield) => {
    return {
      address: battlefieldAddress,
      name: 'getUserCurrentRewards',
      params: [account, battlefield.pid],
    }
  })

  const rawEarnings = await multicall(battlefieldABI, calls)
  const parsedEarnings = rawEarnings.map((earnings) => {
    return new BigNumber(earnings).toJSON()
  })
  return parsedEarnings
}
