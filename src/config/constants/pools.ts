import { PoolConfig, QuoteToken, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 0,
    tokenName: 'KNIGHT',
    stakingTokenName: QuoteToken.KNIGHT,
    stakingTokenAddress: '0xC36649fF473e0a558eC50b0F8ce650940B9BA701', // KNIGHT
    contractAddress: {
      97: '0xdf79B790f18CCe224d4d2DB7Fa6835c50BCF2C89', // MasterChef
      56: '0xdf79B790f18CCe224d4d2DB7Fa6835c50BCF2C89', // MasterChef
    },
    poolCategory: PoolCategory.CORE,
    projectLink: 'https://pancakeswap.finance',
    harvest: true,
    tokenPerBlock: '1',
    sortOrder: 1,
    isFinished: false,
    tokenDecimals: 18,
  },
]

export default pools
