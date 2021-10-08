import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { useWallet } from 'use-wallet'
import multicall from 'utils/multicall'
import { getKingmakerAddress } from 'utils/addressHelpers'
import masterChefABI from 'config/abi/masterchef.json'
import { battlefieldConfig } from 'config/constants'
import { BattlefieldConfig } from 'config/constants/types'
import useRefresh from './useRefresh'
import { useKingmaker } from './useContract'

const buyFarmers = (pid: number) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const kingmakerContract = useKingmaker()

  const handleBuyFarmers = useCallback(
    async (amount: string) => {
      const txHash = await kingmakerContract.methods.buyFarmers(amount)
      console.info(txHash)
    },
    [account, dispatch, kingmakerContract, pid],
  )

  return { onBuyFarmers: handleBuyFarmers }
}

export default buyFarmers
