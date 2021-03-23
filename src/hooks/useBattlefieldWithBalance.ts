import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import multicall from 'utils/multicall'
import { getBattlefieldAddress } from 'utils/addressHelpers'
import masterChefABI from 'config/abi/masterchef.json'
import { battlefieldConfig } from 'config/constants'
import { BattlefieldConfig } from 'config/constants/types'
import useRefresh from './useRefresh'

export interface BattlefieldWithBalance extends BattlefieldConfig {
  balance: BigNumber
}

const useBattlefieldWithBalance = () => {
  const [battlefieldWithBalances, setBattlefieldWithBalances] = useState<BattlefieldWithBalance[]>([])
  const { account } = useWallet()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalances = async () => {
      const calls = battlefieldConfig.map((battlefield) => ({
        address: getBattlefieldAddress(),
        name: 'pendingKnight',
        params: [battlefield.pid, account],
      }))

      const rawResults = await multicall(masterChefABI, calls)
      const results = battlefieldConfig.map((battlefield, index) => ({ ...battlefield, balance: new BigNumber(rawResults[index]) }))

      setBattlefieldWithBalances(results)
    }

    if (account) {
      fetchBalances()
    }
  }, [account, fastRefresh])

  return battlefieldWithBalances
}

export default useBattlefieldWithBalance
