import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'KNIGHT',
    lpAddresses: {
      97: '0xa828ED8000B0B7e881DAC3922D4c9bB1b0BA92a9', // MILK
      56: '0xa828ED8000B0B7e881DAC3922D4c9bB1b0BA92a9', // MILK
    },
    tokenSymbol: 'HONOR',
    tokenAddresses: {
      97: '0xa828ED8000B0B7e881DAC3922D4c9bB1b0BA92a9', // MILK
      56: '0xa828ED8000B0B7e881DAC3922D4c9bB1b0BA92a9', // MILK
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 1,
    lpSymbol: 'TABLE-BNB LP',
    lpAddresses: {
      97: '0x3468eac4eFB3e1FCeB3229Bc86F35da7749b0bCa', // MILK-BNB LP
      56: '0x3468eac4eFB3e1FCeB3229Bc86F35da7749b0bCa', // MILK-BNB LP
    },
    tokenSymbol: 'TABLE',
    tokenAddresses: {
      97: '0xa828ED8000B0B7e881DAC3922D4c9bB1b0BA92a9', // MILK
      56: '0xa828ED8000B0B7e881DAC3922D4c9bB1b0BA92a9', // MILK
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 2,
    lpSymbol: 'MILK-BUSD LP',
    lpAddresses: {
      97: '0xDC6252e0D0C265edD682D482c1baf6F917796A04', // MILK-BUSD LP
      56: '0xDC6252e0D0C265edD682D482c1baf6F917796A04', // MILK-BUSD LP
    },
    tokenSymbol: 'BUSD',
    tokenAddresses: {
      97: '0xe9e7cea3dedca5984780bafc599bd69add087d56', // BUSD
      56: '0xe9e7cea3dedca5984780bafc599bd69add087d56', // BUSD
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 3,
    lpSymbol: 'MILK-CAKE LP',
    lpAddresses: {
      97: '0xE2DD1214a65a173Dce04372930Fc0a22F8df7f23', // MILK-CAKE LP
      56: '0xE2DD1214a65a173Dce04372930Fc0a22F8df7f23', // MILK-CAKE LP
    },
    tokenSymbol: 'MILK',
    tokenAddresses: {
      97: '0xa828ED8000B0B7e881DAC3922D4c9bB1b0BA92a9', // MILK
      56: '0xa828ED8000B0B7e881DAC3922D4c9bB1b0BA92a9', // MILK
    },
    quoteTokenSymbol: QuoteToken.MILK,
    quoteTokenAdresses: contracts.milk,
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
