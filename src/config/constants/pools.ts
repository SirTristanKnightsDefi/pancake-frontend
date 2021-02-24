import { PoolConfig, QuoteToken, PoolCategory } from './types'

// TODO: Update the address of the pools
const pools: PoolConfig[] = [
  {
    sousId: 0,
    tokenName: 'MILK',
    stakingTokenName: QuoteToken.MILK,
    stakingTokenAddress: '0xb321921Df9C4D4790d54d2B6E4DD93C5Cd4d061A', // MILK
    contractAddress: {
      97: '0xd3F6239Dd84893FFB94ccd57e1c4dB0408108509', // MasterChef
      56: '0xd3F6239Dd84893FFB94ccd57e1c4dB0408108509', // MasterChef
    },
    poolCategory: PoolCategory.CORE,
    projectLink: 'https://milkswap.app',
    harvest: true,
    tokenPerBlock: '1',
    sortOrder: 1,
    isFinished: false,
    tokenDecimals: 18,
  },
]

export default pools
