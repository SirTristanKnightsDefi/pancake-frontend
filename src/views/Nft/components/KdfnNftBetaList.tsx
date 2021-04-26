import React from 'react'
import orderBy from 'lodash/orderBy'
import kdfnnftsbeta from 'config/constants/kdfnnftsbeta'
import KdfnNftBetaCard from './KdfnNftBetaCard/index'
import NftGrid from './NftGrid'

const KdfnNftBetaList = () => {
  return (
    <NftGrid>
      {orderBy(kdfnnftsbeta, 'sortOrder').map((nft) => (
        <div key={nft.name}>
          <KdfnNftBetaCard nft={nft} />
        </div>
      ))}
    </NftGrid>
  )
}

export default KdfnNftBetaList
