import React from 'react'
import orderBy from 'lodash/orderBy'
import milfnfts from 'config/constants/milfnfts'
import MilfNftCard from './MilfNftCard/index'
import NftGrid from './NftGrid'

const KdfnNftList = () => {
  return (
    <NftGrid>
      {orderBy(milfnfts, 'sortOrder').map((nft) => (
        <div key={nft.name}>
          <MilfNftCard nft={nft} />
        </div>
      ))}
    </NftGrid>
  )
}

export default KdfnNftList
