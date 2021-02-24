import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

// TODO: Update the farms
const farms: FarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'MILK',
    lpAddresses: {
      97: '0xb321921Df9C4D4790d54d2B6E4DD93C5Cd4d061A',
      56: '0xb321921Df9C4D4790d54d2B6E4DD93C5Cd4d061A', // MILK
    },
    tokenSymbol: 'FOAM',
    tokenAddresses: {
      97: '0xb321921Df9C4D4790d54d2B6E4DD93C5Cd4d061A',
      56: '0xb321921Df9C4D4790d54d2B6E4DD93C5Cd4d061A', // MILK
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 1,
    lpSymbol: 'MILK-BNB LP',
    lpAddresses: {
      97: '0x2D68d4099125C4e424f6eE3D4c7567aC61bFB4ed',
      56: '0x2D68d4099125C4e424f6eE3D4c7567aC61bFB4ed', // MILK-BNB LP
    },
    tokenSymbol: 'MILK',
    tokenAddresses: {
      97: '0xb321921Df9C4D4790d54d2B6E4DD93C5Cd4d061A',
      56: '0xb321921Df9C4D4790d54d2B6E4DD93C5Cd4d061A', // MILK
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 2,
    lpSymbol: 'BUSD-BNB LP',
    lpAddresses: {
      97: '0x2f7682b64b88149ba3250aee32db712964de5fa9',
      56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
    },
    tokenSymbol: 'BUSD',
    tokenAddresses: {
      97: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
      56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
]

export default farms
