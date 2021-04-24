import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { purchaseNft } from 'utils/callHelpers'
import { useKnightsDefiNFTs } from './useContract'

export const usePurchaseKdfnNFT = (nftId: number, account: string) => {
  const kdfnContract = useKnightsDefiNFTs()

  const handlePurchase = useCallback(async () => {
    const txHash = await purchaseNft(kdfnContract, nftId, account)
    return txHash
  }, [account, nftId, kdfnContract])

  return { onCompound: handlePurchase }
}

export default usePurchaseKdfnNFT