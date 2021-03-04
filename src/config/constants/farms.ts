import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'KNIGHT',
    lpAddresses: {
      97: '0xC36649fF473e0a558eC50b0F8ce650940B9BA701', // KNIGHT
      56: '0xC36649fF473e0a558eC50b0F8ce650940B9BA701', // KNIGHT
    },
    tokenSymbol: 'HONOR',
    tokenAddresses: {
      97: '0xC36649fF473e0a558eC50b0F8ce650940B9BA701', // KNIGHT
      56: '0xC36649fF473e0a558eC50b0F8ce650940B9BA701', // KNIGHT
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 1,
    lpSymbol: 'KNIGHT-BNB LP',
    lpAddresses: {
      97: '0x1317b02f2bad31E2E52c38438db4f9eafA8d7B4b', // KNIGHT-BNB LP
      56: '0x1317b02f2bad31E2E52c38438db4f9eafA8d7B4b', // KNIGHT-BNB LP
    },
    tokenSymbol: 'KNIGHT',
    tokenAddresses: {
      97: '0xC36649fF473e0a558eC50b0F8ce650940B9BA701', // KNIGHT
      56: '0xC36649fF473e0a558eC50b0F8ce650940B9BA701', // KNIGHT
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 2,
    lpSymbol: 'TABLE-BNB LP',
    lpAddresses: {
      97: '0x3468eac4eFB3e1FCeB3229Bc86F35da7749b0bCa', // TABLE-BNB LP
      56: '0x3468eac4eFB3e1FCeB3229Bc86F35da7749b0bCa', // TABLE-BNB LP
    },
    tokenSymbol: 'TABLE',
    tokenAddresses: {
      97: '0xf5a2f7418035ce76967f515f39d65719bb0453b6', // TABLE
      56: '0xf5a2f7418035ce76967f515f39d65719bb0453b6', // TABLE
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 3,
    lpSymbol: 'TABLE-KNIGHT LP',
    lpAddresses: {
      97: '0x98CEFEBE13eB3F66965e30C57db1cA45C8D554b7', // TABLE-KNIGHT LP
      56: '0x98CEFEBE13eB3F66965e30C57db1cA45C8D554b7', // TABLE-KNIGHT LP
    },
    tokenSymbol: 'TABLE',
    tokenAddresses: {
      97: '0xf5a2f7418035ce76967f515f39d65719bb0453b6', // TABLE
      56: '0xf5a2f7418035ce76967f515f39d65719bb0453b6', // TABLE
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 4,
    lpSymbol: 'BUSD-BNB LP',
    lpAddresses: {
      97: '0x1b96b92314c44b159149f7e0303511fb2fc4774f', // BUSD-BNB LP
      56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f', // BUSD-BNB LP
    },
    tokenSymbol: 'BUSD',
    tokenAddresses: {
      97: '0xe9e7cea3dedca5984780bafc599bd69add087d56', // BUSD
      56: '0xe9e7cea3dedca5984780bafc599bd69add087d56', // BUSD
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
]

export default farms
