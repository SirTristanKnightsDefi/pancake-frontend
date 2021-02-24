import { PoolConfig, QuoteToken, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 0,
    tokenName: 'MILK',
    stakingTokenName: QuoteToken.MILK,
    stakingTokenAddress: '0x26aB5131DD666B4179aC909926ee3C18eE05E470', // MILK
    contractAddress: {
      97: '0xD3C61Cf8dE84E6b4B5dB7E25739b8435860b84e3', // MasterChef
      56: '0xD3C61Cf8dE84E6b4B5dB7E25739b8435860b84e3', // MasterChef
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
