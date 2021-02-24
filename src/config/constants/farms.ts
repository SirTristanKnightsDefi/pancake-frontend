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
    pid: 52,
    lpSymbol: 'DAI-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x3aB77e40340AB084c3e23Be8e5A6f7afed9D41DC',
    },
    tokenSymbol: 'DAI',
    tokenAddresses: {
      97: '',
      56: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    isCommunity: false,
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
  {
    pid: 14,
    lpSymbol: 'ETH-BNB LP',
    lpAddresses: {
      97: '0xE66790075ad839978fEBa15D4d8bB2b415556a1D',
      56: '0x70D8929d04b60Af4fb9B58713eBcf18765aDE422',
    },
    tokenSymbol: 'ETH',
    tokenAddresses: {
      97: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
      56: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
]

export default farms
