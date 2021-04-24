import React from 'react'
import orderBy from 'lodash/orderBy'
import kdfnnfts from 'config/constants/kdfnnfts'
import KdfnNftCard from './KdfnNftCard/index'
import NftGrid from './NftGrid'

const KdfnNftList = () => {
  return (
    <NftGrid>
      {orderBy(kdfnnfts, 'sortOrder').map((nft) => (
        <div key={nft.name}>
          <KdfnNftCard nft={nft} />
        </div>
      ))}
    </NftGrid>
  )
}

export default KdfnNftList
