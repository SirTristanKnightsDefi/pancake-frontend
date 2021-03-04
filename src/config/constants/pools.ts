import { PoolConfig, QuoteToken, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 0,
    tokenName: 'KNIGHT',
    stakingTokenName: QuoteToken.KNIGHT,
    stakingTokenAddress: '0xa828ED8000B0B7e881DAC3922D4c9bB1b0BA92a9', // KNIGHT
    contractAddress: {
      97: '0x46D121E50e04A9F52Ab8A71523FCB84FbA36D27a', // MasterChef
      56: '0x46D121E50e04A9F52Ab8A71523FCB84FbA36D27a', // MasterChef
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
