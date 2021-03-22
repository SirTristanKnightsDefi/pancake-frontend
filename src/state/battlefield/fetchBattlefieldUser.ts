import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import masterchefABI from 'config/abi/masterchef.json'
import multicall from 'utils/multicall'
import battlefieldsConfig from 'config/constants/battlefield'
import { getAddress, getMasterChefAddress } from 'utils/addressHelpers'

export const fetchBattlefieldUserAllowances = async (account: string) => {
  const masterChefAdress = getMasterChefAddress()

  const calls = battlefieldsConfig.map((battlefield) => {
    const lpContractAddress = getAddress(battlefield.lpAddresses)
    return { address: lpContractAddress, name: 'allowance', params: [account, masterChefAdress] }
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
  const masterChefAdress = getMasterChefAddress()

  const calls = battlefieldsConfig.map((battlefield) => {
    return {
      address: masterChefAdress,
      name: 'userInfo',
      params: [battlefield.pid, account],
    }
  })

  const rawStakedBalances = await multicall(masterchefABI, calls)
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0]._hex).toJSON()
  })
  return parsedStakedBalances
}

export const fetchBattlefieldUserEarnings = async (account: string) => {
  const masterChefAdress = getMasterChefAddress()

  const calls = battlefieldsConfig.map((battlefield) => {
    return {
      address: masterChefAdress,
      name: 'pendingKnight',
      params: [battlefield.pid, account],
    }
  })

  const rawEarnings = await multicall(masterchefABI, calls)
  const parsedEarnings = rawEarnings.map((earnings) => {
    return new BigNumber(earnings).toJSON()
  })
  return parsedEarnings
}
