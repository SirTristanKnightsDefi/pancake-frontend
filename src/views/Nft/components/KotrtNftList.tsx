import React from 'react'
import orderBy from 'lodash/orderBy'
import kotrtnfts from 'config/constants/kotrtnfts'
import KotrtNftCard from './KotrtNftCard/index'
import NftGrid from './NftGrid'

const KotrtNftList = () => {
  return (
    <NftGrid>
      {orderBy(kotrtnfts, 'sortOrder').map((nft) => (
        <div key={nft.name}>
          <KotrtNftCard nft={nft} />
        </div>
      ))}
    </NftGrid>
  )
}

export default KotrtNftList
