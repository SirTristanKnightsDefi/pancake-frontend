import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'KNIGHT',
    lpAddresses: {
      97: '0x16C0e0936E1B38Ff1F9b8a1e75d8ba29aDf87d30', // KNIGHT
      56: '0x16C0e0936E1B38Ff1F9b8a1e75d8ba29aDf87d30', // KNIGHT
    },
    tokenSymbol: 'HONOR',
    tokenAddresses: {
      97: '0x16C0e0936E1B38Ff1F9b8a1e75d8ba29aDf87d30', // KNIGHT
      56: '0x16C0e0936E1B38Ff1F9b8a1e75d8ba29aDf87d30', // KNIGHT
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 1,
    lpSymbol: 'KNIGHT-BNB LP',
    lpAddresses: {
      97: '0xe13CB5bcff475065e1Eea1c9fbd1a4f621eAe21D', // KNIGHT-BNB LP
      56: '0xe13CB5bcff475065e1Eea1c9fbd1a4f621eAe21D', // KNIGHT-BNB LP
    },
    tokenSymbol: 'KNIGHT',
    tokenAddresses: {
      97: '0x16C0e0936E1B38Ff1F9b8a1e75d8ba29aDf87d30', // KNIGHT
      56: '0x16C0e0936E1B38Ff1F9b8a1e75d8ba29aDf87d30', // KNIGHT
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
    pid: 5,
    lpSymbol: 'LEGEND-BNB LP',
    lpAddresses: {
      97: '0x3d2bb5e65eb6d54f36791e242d726db1d5041f59', // LEGEND-BNB LP
      56: '0x3d2bb5e65eb6d54f36791e242d726db1d5041f59', // LEGEND-BNB LP
    },
    tokenSymbol: 'LEGEND',
    tokenAddresses: {
      97: '0xDc661984735b535210CB1f52f86cc58616024192', // LEGEND
      56: '0xDc661984735b535210CB1f52f86cc58616024192', // LEGEND
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 6,
    lpSymbol: 'SQUIRE-BNB LP',
    lpAddresses: {
      97: '0x1ef4674486e066515fa57e9c75e372e7e4f10fdc', // SQUIRE-BNB LP
      56: '0x1ef4674486e066515fa57e9c75e372e7e4f10fdc', // SQUIRE-BNB LP
    },
    tokenSymbol: 'SQUIRE',
    tokenAddresses: {
      97: '0x2F0D21f1B84F03fB9D60004fc206C86Be6902a32', // SQUIRE
      56: '0x2F0D21f1B84F03fB9D60004fc206C86Be6902a32', // SQUIRE
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 3,
    lpSymbol: 'TABLE-KNIGHT LP',
    lpAddresses: {
      97: '0x646272497f5618d98c0364535A17E2fbAe933C71', // TABLE-KNIGHT LP
      56: '0x646272497f5618d98c0364535A17E2fbAe933C71', // TABLE-KNIGHT LP
    },
    tokenSymbol: 'TABLE',
    tokenAddresses: {
      97: '0xf5a2f7418035ce76967f515f39d65719bb0453b6', // TABLE
      56: '0xf5a2f7418035ce76967f515f39d65719bb0453b6', // TABLE
    },
    quoteTokenSymbol: QuoteToken.CAKE,
    quoteTokenAdresses: contracts.cake,
  },
  {
    pid: 7,
    lpSymbol: 'SQUIRE-RBT LP',
    lpAddresses: {
      97: '0xf61525267c93265d8573fb5a57b9f2cfea817214', // SQUIRE-RBT LP
      56: '0xf61525267c93265d8573fb5a57b9f2cfea817214', // SQUIRE-RBT LP
    },
    tokenSymbol: 'RBT',
    tokenAddresses: {
      97: '0x7595bb34bf391c3de0a6878a36d06223b2bfd404', // RBT
      56: '0x7595bb34bf391c3de0a6878a36d06223b2bfd404', // RBT
    },
    quoteTokenSymbol: QuoteToken.SQUIRE,
    quoteTokenAdresses: contracts.squire,
    isCommunity: true,
  },
  {
    pid: 8,
    lpSymbol: 'SQUIRE-MIST LP',
    lpAddresses: {
      97: '0x73b46497e9992fab410dd25b3785aded4f8ccb47', // SQUIRE-MIST LP
      56: '0x73b46497e9992fab410dd25b3785aded4f8ccb47', // SQUIRE-MIST LP
    },
    tokenSymbol: 'MIST',
    tokenAddresses: {
      97: '0x6f8FE12CC34398d15b7D5A5BA933E550DA1D099f', // MIST
      56: '0x6f8FE12CC34398d15b7D5A5BA933E550DA1D099f', // MIST
    },
    quoteTokenSymbol: QuoteToken.SQUIRE,
    quoteTokenAdresses: contracts.squire,
    isCommunity: true,
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
