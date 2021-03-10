import { PoolConfig, QuoteToken, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 0,
    tokenName: 'KNIGHT',
    stakingTokenName: QuoteToken.KNIGHT,
    stakingTokenAddress: '0x16C0e0936E1B38Ff1F9b8a1e75d8ba29aDf87d30', // KNIGHT
    contractAddress: {
      97: '0x0E9b7E13a543b7F1651A6BB03a47900515eBceCf', // MasterChef
      56: '0x0E9b7E13a543b7F1651A6BB03a47900515eBceCf', // MasterChef
    },
    poolCategory: PoolCategory.CORE,
    projectLink: 'https://www.knightsdefi.com',
    harvest: true,
    tokenPerBlock: '1',
    sortOrder: 1,
    isFinished: false,
    tokenDecimals: 18,
  },
]

export default pools
