import { PoolConfig, QuoteToken, PoolCategory } from './types'

// TODO: Update the address of the pools
const pools: PoolConfig[] = [
  {
    sousId: 0,
    tokenName: 'MILK',
    stakingTokenName: QuoteToken.MILK,
    stakingTokenAddress: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    contractAddress: {
      97: '0xd3af5fe61dbaf8f73149bfcfa9fb653ff096029a',
      56: '0x73feaa1eE314F8c655E354234017bE2193C9E24E',
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
