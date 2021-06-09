import React, { createContext, useEffect, useRef, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useRefresh from 'hooks/useRefresh'
import useBlock from 'hooks/useBlock'
import useGetWalletNfts, { NftMap, useGetWalletKotrtNfts, useGetWalletKdfnNfts, useGetWalletKdfnBetaNfts, useGetWalletMilfNfts } from 'hooks/useGetWalletNfts'
import { getTheGrailNFTsContract, getKotrtNFTsContract, getKdfnNFTsContract, getKdfnNFTsBetaContract, getMilfNFTsContract } from 'utils/contractHelpers'


type State = {
  isInitialized: boolean
  hasClaimed: boolean
  endBlockNumber: number
  startBlockNumber: number
  balanceOf: number
}

type Context = {
  nfts: NftMap
  canBurnNft: boolean
  nftBalance?: number
  getTokenIds: (tokenId: number) => number[]
  getNftIds?: (nftId: number) => number[]
  reInitialize: () => void
  getNftMinted?:(nftId:number) => number
} & State

export const NftProviderContext = createContext<Context | null>(null)

const NftProvider: React.FC = ({ children }) => {
  const isMounted = useRef(true)
  const [state, setState] = useState<State>({
    isInitialized: false,
    hasClaimed: false,
    startBlockNumber: 0,
    endBlockNumber: 0,
    balanceOf: 0,
  })
  const { account } = useWallet()
  const currentBlock = useBlock()
  const { nfts: nftList } = useGetWalletNfts()
  const { isInitialized } = state
  const { fastRefresh } = useRefresh()

  // Data from the contract that needs an account
  useEffect(() => {
    const fetchContractData = async () => {
      try {
        const theGrailNFTsContract = getTheGrailNFTsContract()
        const balanceOf = await theGrailNFTsContract.methods.balanceOf(account).call()

        setState((prevState) => ({
          ...prevState,
          isInitialized: true,
          balanceOf,
        }))
      } catch (error) {
        console.error('an error occured', error)
      }
    }

    if (account) {
      fetchContractData()
    }
  }, [isInitialized, account, setState, fastRefresh])

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [isMounted, fastRefresh])

  const canBurnNft = currentBlock <= state.endBlockNumber
  const getTokenIds = (tokenId: number) => nftList[tokenId]?.tokenIds

  /**
   * Allows consumers to re-fetch all data from the contract. Triggers the effects.
   * For example when a transaction has been completed
   */
  const reInitialize = () => {
    // Only attempt to re-initialize if the component is still mounted
    // Transactions can take awhile so it is likely some users will navigate to another page
    // before the transaction is finished
    if (isMounted.current) {
      setState((prevState) => ({ ...prevState, isInitialized: false }))
    }
  }

  return (
    <NftProviderContext.Provider value={{ ...state, nfts: nftList, canBurnNft, getTokenIds, reInitialize }}>
      {children}
    </NftProviderContext.Provider>
  )
}


export const KotrtNftProviderContext = createContext<Context | null>(null)

export const KotrtNftProvider: React.FC = ({ children }) => {
  const isMounted = useRef(true)
  const [state, setState] = useState<State>({
    isInitialized: false,
    hasClaimed: false,
    startBlockNumber: 0,
    endBlockNumber: 0,
    balanceOf: 0,
  })
  const { account } = useWallet()
  const currentBlock = useBlock()
  const { nfts: nftList } = useGetWalletKotrtNfts()
  const { isInitialized } = state
  const { fastRefresh } = useRefresh()

  // Data from the contract that needs an account
  useEffect(() => {
    const fetchContractData = async () => {
      try {
        const kotrtNFTsContract = getKotrtNFTsContract()
        const balanceOf = await kotrtNFTsContract.methods.balanceOf(account).call()

        setState((prevState) => ({
          ...prevState,
          isInitialized: true,
          balanceOf,
        }))
      } catch (error) {
        console.error('an error occured', error)
      }
    }

    if (account) {
      fetchContractData()
    }
  }, [isInitialized, account, setState, fastRefresh])

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [isMounted, fastRefresh])

  const canBurnNft = currentBlock <= state.endBlockNumber
  const getTokenIds = (tokenId: number) => nftList[tokenId]?.tokenIds


  /**
   * Allows consumers to re-fetch all data from the contract. Triggers the effects.
   * For example when a transaction has been completed
   */
  const reInitialize = () => {
    // Only attempt to re-initialize if the component is still mounted
    // Transactions can take awhile so it is likely some users will navigate to another page
    // before the transaction is finished
    if (isMounted.current) {
      setState((prevState) => ({ ...prevState, isInitialized: false }))
    }
  }

  return (
    <KotrtNftProviderContext.Provider value={{ ...state, nfts: nftList, canBurnNft, getTokenIds, reInitialize }}>
      {children}
    </KotrtNftProviderContext.Provider>
  )
}

export const KdfnNftProviderContext = createContext<Context | null>(null)

export const KdfnNftProvider: React.FC = ({ children }) => {
  const isMounted = useRef(true)
  const [state, setState] = useState<State>({
    isInitialized: false,
    hasClaimed: false,
    startBlockNumber: 0,
    endBlockNumber: 0,
    balanceOf: 0,
  })

  
  const { account } = useWallet()
  const currentBlock = useBlock()
  const { nfts: nftList } = useGetWalletKdfnNfts()
  const { isInitialized } = state
  const { fastRefresh } = useRefresh()
  

  // Data from the contract that needs an account
  useEffect(() => {
    const fetchContractData = async () => {
      try {
        const kdfnNFTsContract = getKdfnNFTsContract()
        const balanceOf = await kdfnNFTsContract.methods.balanceOf(account).call()

        setState((prevState) => ({
          ...prevState,
          isInitialized: true,
          balanceOf,
        }))
      } catch (error) {
        console.error('an error occured', error)
      }
    }

    if (account) {
      fetchContractData()
    }
  }, [isInitialized, account, setState, fastRefresh])

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [isMounted, fastRefresh])

    
  const canBurnNft = currentBlock <= state.endBlockNumber
  const getTokenIds = (tokenId: number) => nftList[tokenId]?.tokenIds
  const getNftIds = (nftId: number) => nftList[nftId]?.tokenIds
  

  /**
   * Allows consumers to re-fetch all data from the contract. Triggers the effects.
   * For example when a transaction has been completed
   */
  const reInitialize = () => {
    // Only attempt to re-initialize if the component is still mounted
    // Transactions can take awhile so it is likely some users will navigate to another page
    // before the transaction is finished
    if (isMounted.current) {
      setState((prevState) => ({ ...prevState, isInitialized: false }))
    }
  }

  

  return (
    <KdfnNftProviderContext.Provider value={{ ...state, nfts: nftList, canBurnNft, getTokenIds, getNftIds, reInitialize}}>
      {children}
    </KdfnNftProviderContext.Provider>
  )
}

export const MilfNftProviderContext = createContext<Context | null>(null)

export const MilfNftProvider: React.FC = ({ children }) => {
  const isMounted = useRef(true)
  const [state, setState] = useState<State>({
    isInitialized: false,
    hasClaimed: false,
    startBlockNumber: 0,
    endBlockNumber: 0,
    balanceOf: 0,
  })

  
  const { account } = useWallet()
  const currentBlock = useBlock()
  const { nfts: nftList } = useGetWalletMilfNfts()
  const { isInitialized } = state
  const { fastRefresh } = useRefresh()
  

  // Data from the contract that needs an account
  useEffect(() => {
    const fetchContractData = async () => {
      try {
        const milfNFTsContract = getMilfNFTsContract()
        const balanceOf = await milfNFTsContract.methods.balanceOf(account).call()

        setState((prevState) => ({
          ...prevState,
          isInitialized: true,
          balanceOf,
        }))
      } catch (error) {
        console.error('an error occured', error)
      }
    }

    if (account) {
      fetchContractData()
    }
  }, [isInitialized, account, setState, fastRefresh])

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [isMounted, fastRefresh])

    
  const canBurnNft = currentBlock <= state.endBlockNumber
  const getTokenIds = (tokenId: number) => nftList[tokenId]?.tokenIds
  const getNftIds = (nftId: number) => nftList[nftId]?.tokenIds
  

  /**
   * Allows consumers to re-fetch all data from the contract. Triggers the effects.
   * For example when a transaction has been completed
   */
  const reInitialize = () => {
    // Only attempt to re-initialize if the component is still mounted
    // Transactions can take awhile so it is likely some users will navigate to another page
    // before the transaction is finished
    if (isMounted.current) {
      setState((prevState) => ({ ...prevState, isInitialized: false }))
    }
  }

  

  return (
    <KdfnNftProviderContext.Provider value={{ ...state, nfts: nftList, canBurnNft, getTokenIds, getNftIds, reInitialize}}>
      {children}
    </KdfnNftProviderContext.Provider>
  )
}

export const KdfnNftBetaProviderContext = createContext<Context | null>(null)

export const KdfnNftBetaProvider: React.FC = ({ children }) => {
  const isMounted = useRef(true)
  const [state, setState] = useState<State>({
    isInitialized: false,
    hasClaimed: false,
    startBlockNumber: 0,
    endBlockNumber: 0,
    balanceOf: 0,
  })

  
  const { account } = useWallet()
  const currentBlock = useBlock()
  const { nfts: nftList } = useGetWalletKdfnBetaNfts()
  const { isInitialized } = state
  const { fastRefresh } = useRefresh()
  

  // Data from the contract that needs an account
  useEffect(() => {
    const fetchContractData = async () => {
      try {
        const kdfnNFTsBetaContract = getKdfnNFTsBetaContract()
        const balanceOf = await kdfnNFTsBetaContract.methods.balanceOf(account).call()

        setState((prevState) => ({
          ...prevState,
          isInitialized: true,
          balanceOf,
        }))
      } catch (error) {
        console.error('an error occured', error)
      }
    }

    if (account) {
      fetchContractData()
    }
  }, [isInitialized, account, setState, fastRefresh])

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [isMounted, fastRefresh])

  const canBurnNft = currentBlock <= state.endBlockNumber
  const getTokenIds = (tokenId: number) => nftList[tokenId]?.tokenIds
  const getNftIds = (nftId: number) => nftList[nftId]?.tokenIds
  
  /**
   * Allows consumers to re-fetch all data from the contract. Triggers the effects.
   * For example when a transaction has been completed
   */

  const reInitialize = () => {
    // Only attempt to re-initialize if the component is still mounted
    // Transactions can take awhile so it is likely some users will navigate to another page
    // before the transaction is finished
    if (isMounted.current) {
      setState((prevState) => ({ ...prevState, isInitialized: false }))
    }
  }

  return (
    <KdfnNftBetaProviderContext.Provider value={{ ...state, nfts: nftList, canBurnNft, getTokenIds, getNftIds, reInitialize}}>
      {children}
    </KdfnNftBetaProviderContext.Provider>
  )
}

export default NftProvider
