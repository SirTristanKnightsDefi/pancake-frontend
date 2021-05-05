import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import cakeABI from 'config/abi/cake.json'
import tableABI from 'config/abi/table.json'
import legendABI from 'config/abi/legend.json'
import squireABI from 'config/abi/squire.json'
import shillingABI from 'config/abi/shilling.json'
import { getContract } from 'utils/web3'
import { getTokenBalance } from 'utils/erc20'
import { getCakeAddress, getTableAddress, getLegendAddress, getSquireAddress, getShillingAddress } from 'utils/addressHelpers'
import { useSquire, useKnight, useShilling, useLegend, useTable } from 'hooks/useContract'
import useRefresh from './useRefresh'

const useTokenBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getTokenBalance(ethereum, tokenAddress, account)
      setBalance(new BigNumber(res))
    }

    if (account && ethereum) {
      fetchBalance()
    }
  }, [account, ethereum, tokenAddress, fastRefresh])

  return balance
}

export const useTotalSupply = () => {
  const { slowRefresh } = useRefresh()
  const [totalSupply, setTotalSupply] = useState<BigNumber>()

  useEffect(() => {
    async function fetchTotalSupply() {
      const cakeContract = getContract(cakeABI, getCakeAddress())
      const supply = await cakeContract.methods.totalSupply().call()
      setTotalSupply(new BigNumber(supply))
    }

    fetchTotalSupply()
  }, [slowRefresh])

  return totalSupply
}

export const useTotalSupplyTable = () => {
  const { slowRefresh } = useRefresh()
  const [totalSupply, setTotalSupply] = useState<BigNumber>()

  useEffect(() => {
    async function fetchTotalSupply() {
      const tableContract = getContract(tableABI, getTableAddress())
      const supply = await tableContract.methods.totalSupply().call()
      setTotalSupply(new BigNumber(supply))
    }

    fetchTotalSupply()
  }, [slowRefresh])

  return totalSupply
}

export const useTotalSupplyLegend = () => {
  const { slowRefresh } = useRefresh()
  const [totalSupply, setTotalSupply] = useState<BigNumber>()

  useEffect(() => {
    async function fetchTotalSupply() {
      const legendContract = getContract(legendABI, getLegendAddress())
      const supply = await legendContract.methods.totalSupply().call()
      setTotalSupply(new BigNumber(supply))
    }

    fetchTotalSupply()
  }, [slowRefresh])

  return totalSupply
}

export const useTotalSupplySquire = () => {
  const { slowRefresh } = useRefresh()
  const [totalSupply, setTotalSupply] = useState<BigNumber>()

  useEffect(() => {
    async function fetchTotalSupply() {
      const squireContract = getContract(squireABI, getSquireAddress())
      const supply = await squireContract.methods.totalSupply().call()
      setTotalSupply(new BigNumber(supply))
    }

    fetchTotalSupply()
  }, [slowRefresh])

  return totalSupply
}

export const useTotalSupplyShilling = () => {
  const { slowRefresh } = useRefresh()
  const [totalSupply, setTotalSupply] = useState<BigNumber>()

  useEffect(() => {
    async function fetchTotalSupply() {
      const shillingContract = getContract(shillingABI, getShillingAddress())
      const supply = await shillingContract.methods.totalSupply().call()
      setTotalSupply(new BigNumber(supply))
    }

    fetchTotalSupply()
  }, [slowRefresh])

  return totalSupply
}

export const useBurnedBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getTokenBalance(ethereum, tokenAddress, '0x000000000000000000000000000000000000dEaD')
      setBalance(new BigNumber(res))
    }

    if (ethereum) {
      fetchBalance()
    }
  }, [account, ethereum, tokenAddress, slowRefresh])

  return balance
}

export const useShillingBurnedBalance = () => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const shillingContract = useShilling()

  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await shillingContract.methods.balanceOf('0x000000000000000000000000000000000000dEaD').call()
      setBalance(new BigNumber(res))
    }
      fetchBalance()
  }, [shillingContract, slowRefresh])

  return balance
}

export const useSquireBurnedBalance = () => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const squireContract = useSquire()

  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await squireContract.methods.balanceOf('0x000000000000000000000000000000000000dEaD').call()
      setBalance(new BigNumber(res))
    }
      fetchBalance()
  }, [squireContract, slowRefresh])

  return balance
}

export const useKnightBurnedBalance = () => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const knightContract = useKnight()

  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await knightContract.methods.balanceOf('0x000000000000000000000000000000000000dEaD').call()
      setBalance(new BigNumber(res))
    }
      fetchBalance()
  }, [knightContract, slowRefresh])

  return balance
}

export const useLegendBurnedBalance = () => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const legendContract = useLegend()

  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await legendContract.methods.balanceOf('0x000000000000000000000000000000000000dEaD').call()
      setBalance(new BigNumber(res))
    }
      fetchBalance()
  }, [legendContract, slowRefresh])

  return balance
}

export const useTableBurnedBalance = () => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const tableContract = useTable()

  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await tableContract.methods.balanceOf('0x000000000000000000000000000000000000dEaD').call()
      setBalance(new BigNumber(res))
    }
      fetchBalance()
  }, [tableContract, slowRefresh])

  return balance
}


export default useTokenBalance
