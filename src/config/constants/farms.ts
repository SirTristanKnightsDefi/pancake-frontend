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
    lpVersion: 1
  },
  {
    pid: 10,
    lpSymbol: 'KNIGHT-BNB V2 LP',
    lpAddresses: {
      97: '0x8e53470B95d52A3D83637BF9E42891b17E785Ba4', // KNIGHT-BNB V2 LP
      56: '0x8e53470B95d52A3D83637BF9E42891b17E785Ba4', // KNIGHT-BNB V2 LP
    },
    tokenSymbol: 'KNIGHT',
    tokenAddresses: {
      97: '0x16C0e0936E1B38Ff1F9b8a1e75d8ba29aDf87d30', // KNIGHT
      56: '0x16C0e0936E1B38Ff1F9b8a1e75d8ba29aDf87d30', // KNIGHT
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    lpVersion: 2
  },
  {
    pid: 11,
    lpSymbol: 'KNIGHT-BUSD V2 LP',
    lpAddresses: {
      97: '0x7789d441D4a32084A4484023424dc5F916dEde3f', // KNIGHT-BUSD V2 LP
      56: '0x7789d441D4a32084A4484023424dc5F916dEde3f', // KNIGHT-BUSD V2 LP
    },
    tokenSymbol: 'KNIGHT',
    tokenAddresses: {
      97: '0x16C0e0936E1B38Ff1F9b8a1e75d8ba29aDf87d30', // KNIGHT
      56: '0x16C0e0936E1B38Ff1F9b8a1e75d8ba29aDf87d30', // KNIGHT
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    lpVersion: 2
  },
  {
    pid: 12,
    lpSymbol: 'TABLE-BNB V2 LP',
    lpAddresses: {
      97: '0xd54ED4F02B3Ce38267AF6f39599dDaAc87435BbA', // TABLE-BNB V2 LP
      56: '0xd54ED4F02B3Ce38267AF6f39599dDaAc87435BbA', // TABLE-BNB V2 LP
    },
    tokenSymbol: 'TABLE',
    tokenAddresses: {
      97: '0xf5a2f7418035ce76967f515f39d65719bb0453b6', // TABLE
      56: '0xf5a2f7418035ce76967f515f39d65719bb0453b6', // TABLE
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    lpVersion: 2
  },
  {
    pid: 13,
    lpSymbol: 'TABLE-BUSD V2 LP',
    lpAddresses: {
      97: '0x6Bba8AD77F7E777Cbe28a01Dd13670025765090C', // TABLE-BUSD V2 LP
      56: '0x6Bba8AD77F7E777Cbe28a01Dd13670025765090C', // TABLE-BUSD V2 LP
    },
    tokenSymbol: 'TABLE',
    tokenAddresses: {
      97: '0xf5a2f7418035ce76967f515f39d65719bb0453b6', // TABLE
      56: '0xf5a2f7418035ce76967f515f39d65719bb0453b6', // TABLE
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    lpVersion: 2
  },
  {
    pid: 15,
    lpSymbol: 'KNIGHT-LINK V2 LP',
    lpAddresses: {
      97: '0x86a2543E421133e93FD187099d505220BC7b8986', // KNIGHT-LINK V2 LP
      56: '0x86a2543E421133e93FD187099d505220BC7b8986', // KNIGHT-LINK V2 LP
    },
    tokenSymbol: 'LINK',
    tokenAddresses: {
      97: '0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD', // LINK
      56: '0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD', // LINK
    },
    quoteTokenSymbol: QuoteToken.CAKE,
    quoteTokenAdresses: contracts.cake,
    lpVersion: 2
  },
  {
    pid: 16,
    lpSymbol: 'KNIGHT-ADA V2 LP',
    lpAddresses: {
      97: '0xBBb09d7AF04a71AAaD3AA57335178c3fceF11659', // KNIGHT-ADA V2 LP
      56: '0xBBb09d7AF04a71AAaD3AA57335178c3fceF11659', // KNIGHT-ADA V2 LP
    },
    tokenSymbol: 'ADA',
    tokenAddresses: {
      97: '0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47', // ADA
      56: '0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47', // ADA
    },
    quoteTokenSymbol: QuoteToken.CAKE,
    quoteTokenAdresses: contracts.cake,
    lpVersion: 2
  },
  {
    pid: 17,
    lpSymbol: 'KNIGHT-CAKE V2 LP',
    lpAddresses: {
      97: '0xb0f78971d22812FcA20D27D6C726365E3279d40c', // KNIGHT-CAKE V2 LP
      56: '0xb0f78971d22812FcA20D27D6C726365E3279d40c', // KNIGHT-CAKE V2 LP
    },
    tokenSymbol: 'CAKE',
    tokenAddresses: {
      97: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82', // CAKE
      56: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82', // CAKE
    },
    quoteTokenSymbol: QuoteToken.CAKE,
    quoteTokenAdresses: contracts.cake,
    lpVersion: 2
  },
  {
    pid: 18,
    lpSymbol: 'KNIGHT-DARA V2 LP',
    lpAddresses: {
      97: '0x977e13a2efd3f5945864c9bd636f949cbe358ab0', // KNIGHT-DARA V2 LP
      56: '0x977e13a2efd3f5945864c9bd636f949cbe358ab0', // KNIGHT-DARA V2 LP
    },
    tokenSymbol: 'DARA',
    tokenAddresses: {
      97: '0x0255af6c9f86f6b0543357bacefa262a2664f80f', // DARA
      56: '0x0255af6c9f86f6b0543357bacefa262a2664f80f', // DARA
    },
    quoteTokenSymbol: QuoteToken.CAKE,
    quoteTokenAdresses: contracts.cake,
    lpVersion: 2
  },
  {
    pid: 1,
    lpSymbol: 'KNIGHT-BNB V1 LP',
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
    lpVersion: 1
  },
  {
    pid: 2,
    lpSymbol: 'TABLE-BNB V1 LP',
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
    lpVersion: 1
  },
  {
    pid: 5,
    lpSymbol: 'LEGEND-BNB V1 LP',
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
    lpVersion: 1
  },
  {
    pid: 6,
    lpSymbol: 'SQUIRE-BNB V1 LP',
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
    lpVersion: 1
  },
  {
    pid: 3,
    lpSymbol: 'TABLE-KNIGHT V1 LP',
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
    lpVersion: 1
  },
  {
    pid: 7,
    lpSymbol: 'SQUIRE-RBT V1 LP',
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
    lpVersion: 1
  },
  {
    pid: 8,
    lpSymbol: 'SQUIRE-MIST V1 LP',
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
    lpVersion: 1
  },
  {
    pid: 14,
    lpSymbol: 'KNIGHT-PSI PSI LP',
    lpAddresses: {
      97: '0xa28Ee996C03CB10ad740c50D0F4Db03aD5691F5E', // KNIGHT-PSI LP
      56: '0xa28Ee996C03CB10ad740c50D0F4Db03aD5691F5E', // KNIGHT-PSI LP
    },
    tokenSymbol: 'PSI',
    tokenAddresses: {
      97: '0x9A5d9c681Db43D9863e9279c800A39449B7e1d6f', // PSI
      56: '0x9A5d9c681Db43D9863e9279c800A39449B7e1d6f', // PSI
    },
    quoteTokenSymbol: QuoteToken.CAKE,
    quoteTokenAdresses: contracts.cake,
    isCommunity: true,
    lpVersion: 3
  },
  {
    pid: 4,
    lpSymbol: 'BUSD-BNB V1 LP',
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
    lpVersion: 1
  },
  {
    pid: 9,
    lpSymbol: 'SHILLING-BNB V2 LP',
    lpAddresses: {
      97: '0xa4695E76Be7583eD69f397D45c3A1cd70B956397', // SHILLING-BNB LP
      56: '0xa4695E76Be7583eD69f397D45c3A1cd70B956397', // SHILLING-BNB LP
    },
    tokenSymbol: 'SHILLING',
    tokenAddresses: {
      97: '0x643B6ef6306417A0b3FA2813eb5BAf30F5dd8736', // SHILLING
      56: '0x643B6ef6306417A0b3FA2813eb5BAf30F5dd8736', // SHILLING
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    lpVersion: 2
  },
  
]

export default farms
