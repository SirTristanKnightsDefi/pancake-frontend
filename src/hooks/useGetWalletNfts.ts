import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useEffect, useReducer } from 'react'
import { getTheGrailNFTsContract, getKotrtNFTsContract, getKdfnNFTsContract, getKdfnNFTsBetaContract, getMilfNFTsContract } from 'utils/contractHelpers'

import makeBatchRequest from 'utils/makeBatchRequest'

const theGrailContract = getTheGrailNFTsContract()
const kotrtContract = getKotrtNFTsContract()
const kdfnContract = getKdfnNFTsContract()
const kdfnBetaContract = getKdfnNFTsBetaContract()
const milfContract = getMilfNFTsContract()

export type NftMap = {
  [key: number]: {
    tokenUri: string
    tokenIds: number[]
    nftIds?: number[]
  }
}

type Action = { type: 'set_nfts'; data: NftMap } | { type: 'reset' }

type State = {
  isLoading: boolean
  nfts: NftMap
}

const initialState: State = {
  isLoading: true,
  nfts: {},
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'set_nfts':
      return {
        ...initialState,
        isLoading: false,
        nfts: action.data,
      }
    case 'reset':
      return {
        ...initialState,
        isLoading: false,
      }
    default:
      return state
  }
}

const useGetWalletNfts = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { account } = useWallet()

  useEffect(() => {
    const fetchNfts = async () => {
      try {
        const balanceOf = await theGrailContract.methods.balanceOf(account).call()

        if (balanceOf > 0) {
          let nfts: NftMap = {}

          const getTokenIdAndBunnyId = async (index: number) => {
            try {
              const { tokenOfOwnerByIndex, tokenURI } = theGrailContract.methods
              const tokenId = await tokenOfOwnerByIndex(account, index).call()
              const [tokenUri] = await makeBatchRequest([tokenURI(tokenId).call])

              return [Number(tokenId), tokenUri]
            } catch (error) {
              return null
            }
          }

          const tokenIdPromises = []

          for (let i = 0; i < balanceOf; i++) {
            tokenIdPromises.push(getTokenIdAndBunnyId(i))
          }

          const tokenIdsOwnedByWallet = await Promise.all(tokenIdPromises)

          nfts = tokenIdsOwnedByWallet.reduce((accum, association) => {
            if (!association) {
              return accum
            }

            const [bunnyId, tokenId, tokenUri] = association

            return {
              ...accum,
              [bunnyId]: {
                tokenUri,
                tokenIds: accum[bunnyId] ? [...accum[bunnyId].tokenIds, tokenId] : [tokenId],
              },
            }
          }, {})

          dispatch({ type: 'set_nfts', data: nfts })
        } else {
          // Reset it in case of wallet change
          dispatch({ type: 'reset' })
        }
      } catch (error) {
        dispatch({ type: 'reset' })
      }
    }

    if (account) {
      fetchNfts()
    }
  }, [account, dispatch])

  return state
}

export const useGetWalletKotrtNfts = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { account } = useWallet()

  useEffect(() => {
    const fetchNfts = async () => {
      try {
        const balanceOf = await kotrtContract.methods.balanceOf(account).call()

        if (balanceOf > 0) {
          let nfts: NftMap = {}

          const getTokenIdAndBunnyId = async (index: number) => {
            try {
              const { tokenOfOwnerByIndex, tokenURI } = kotrtContract.methods
              const tokenId = await tokenOfOwnerByIndex(account, index).call()
              const [tokenUri] = await makeBatchRequest([tokenURI(tokenId).call])

              return [Number(tokenId), tokenUri]
            } catch (error) {
              return null
            }
          }

          const tokenIdPromises = []

          for (let i = 0; i < balanceOf; i++) {
            tokenIdPromises.push(getTokenIdAndBunnyId(i))
          }

          const tokenIdsOwnedByWallet = await Promise.all(tokenIdPromises)

          nfts = tokenIdsOwnedByWallet.reduce((accum, association) => {
            if (!association) {
              return accum
            }

            const [nftId, tokenId, tokenUri] = association

            return {
              ...accum,
              [nftId]: {
                tokenUri,
                tokenIds: accum[nftId] ? [...accum[nftId].tokenIds, tokenId] : [tokenId],
              },
            }
          }, {})

          dispatch({ type: 'set_nfts', data: nfts })
        } else {
          // Reset it in case of wallet change
          dispatch({ type: 'reset' })
        }
      } catch (error) {
        dispatch({ type: 'reset' })
      }
    }

    if (account) {
      fetchNfts()
    }
  }, [account, dispatch])

  return state
}

export const useGetWalletKdfnNfts = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { account } = useWallet()

  useEffect(() => {
    const fetchNfts = async () => {
      try {
        const balanceOf = await kdfnContract.methods.balanceOf(account).call()

        if (balanceOf > 0) {
          let nfts: NftMap = {}

          const getTokenIdAndNftId = async (index: number) => {
            try {
              const { tokenOfOwnerByIndex, tokenURI, tokenNftID } = kdfnContract.methods
              const tokenId = await tokenOfOwnerByIndex(account, index).call()
              const [nftId, tokenUri] = await makeBatchRequest([tokenNftID(tokenId).call, tokenURI(tokenId).call])

              return [Number(nftId), Number(tokenId), [tokenUri]]
            } catch (error) {
              return null
            }
          }

          const tokenIdPromises = []

          for (let i = 0; i < balanceOf; i++) {
            tokenIdPromises.push(getTokenIdAndNftId(i))
          }

          const tokenIdsOwnedByWallet = await Promise.all(tokenIdPromises)

          nfts = tokenIdsOwnedByWallet.reduce((accum, association) => {
            if (!association) {
              return accum
            }

            const [nftId, tokenId, tokenUri] = association

            return {
              ...accum,
              [nftId]: {
                tokenUri,
                tokenIds: accum[nftId] ? [...accum[nftId].tokenIds, tokenId] : [tokenId],
              },
            }
          }, {})

          dispatch({ type: 'set_nfts', data: nfts })
        } else {
          // Reset it in case of wallet change
          dispatch({ type: 'reset' })
        }
      } catch (error) {
        dispatch({ type: 'reset' })
      }
    }

    if (account) {
      fetchNfts()
    }
  }, [account, dispatch])

  return state
}

export const useGetWalletKdfnBetaNfts = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { account } = useWallet()

  useEffect(() => {
    const fetchNfts = async () => {
      try {
        const balanceOf = await kdfnBetaContract.methods.balanceOf(account).call()

        if (balanceOf > 0) {
          let nfts: NftMap = {}

          const getTokenIdAndNftId = async (index: number) => {
            try {
              const { tokenOfOwnerByIndex, tokenURI, tokenNftID } = kdfnBetaContract.methods
              const tokenId = await tokenOfOwnerByIndex(account, index).call()
              const [nftId, tokenUri] = await makeBatchRequest([tokenNftID(tokenId).call, tokenURI(tokenId).call])

              return [Number(nftId), Number(tokenId), [tokenUri]]
            } catch (error) {
              return null
            }
          }

          const tokenIdPromises = []

          for (let i = 0; i < balanceOf; i++) {
            tokenIdPromises.push(getTokenIdAndNftId(i))
          }

          const tokenIdsOwnedByWallet = await Promise.all(tokenIdPromises)

          nfts = tokenIdsOwnedByWallet.reduce((accum, association) => {
            if (!association) {
              return accum
            }

            const [nftId, tokenId, tokenUri] = association

            return {
              ...accum,
              [nftId]: {
                tokenUri,
                tokenIds: accum[nftId] ? [...accum[nftId].tokenIds, tokenId] : [tokenId],
              },
            }
          }, {})

          dispatch({ type: 'set_nfts', data: nfts })
        } else {
          // Reset it in case of wallet change
          dispatch({ type: 'reset' })
        }
      } catch (error) {
        dispatch({ type: 'reset' })
      }
    }

    if (account) {
      fetchNfts()
    }
  }, [account, dispatch])

  return state
}

export const useGetWalletMilfNfts = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { account } = useWallet()

  useEffect(() => {
    const fetchNfts = async () => {
      try {
        const balanceOf = await milfContract.methods.balanceOf(account).call()

        if (balanceOf > 0) {
          let nfts: NftMap = {}

          const getTokenIdAndNftId = async (index: number) => {
            try {
              const { tokenOfOwnerByIndex, tokenURI, tokenNftID } = milfContract.methods
              const tokenId = await tokenOfOwnerByIndex(account, index).call()
              const [nftId, tokenUri] = await makeBatchRequest([tokenNftID(tokenId).call, tokenURI(tokenId).call])

              return [Number(nftId), Number(tokenId), [tokenUri]]
            } catch (error) {
              return null
            }
          }

          const tokenIdPromises = []

          for (let i = 0; i < balanceOf; i++) {
            tokenIdPromises.push(getTokenIdAndNftId(i))
          }

          const tokenIdsOwnedByWallet = await Promise.all(tokenIdPromises)

          nfts = tokenIdsOwnedByWallet.reduce((accum, association) => {
            if (!association) {
              return accum
            }

            const [nftId, tokenId, tokenUri] = association

            return {
              ...accum,
              [nftId]: {
                tokenUri,
                tokenIds: accum[nftId] ? [...accum[nftId].tokenIds, tokenId] : [tokenId],
              },
            }
          }, {})

          dispatch({ type: 'set_nfts', data: nfts })
        } else {
          // Reset it in case of wallet change
          dispatch({ type: 'reset' })
        }
      } catch (error) {
        dispatch({ type: 'reset' })
      }
    }

    if (account) {
      fetchNfts()
    }
  }, [account, dispatch])

  return state
}

export default useGetWalletNfts
