import contracts from './contracts'
import { BattlefieldConfig, QuoteToken } from './types'

const battlefield: BattlefieldConfig[] = [
  {
    pid: 3,
    lpSymbol: 'SQUIRE',
    lpAddresses: {
      97: '0x2F0D21f1B84F03fB9D60004fc206C86Be6902a32', // SQUIRE
      56: '0x2F0D21f1B84F03fB9D60004fc206C86Be6902a32', // SQUIRE
    },
    tokenSymbol: 'SQUIRE',
    tokenAddresses: {
      97: '0x2F0D21f1B84F03fB9D60004fc206C86Be6902a32', // SQUIRE
      56: '0x2F0D21f1B84F03fB9D60004fc206C86Be6902a32', // SQUIRE
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    burnPct:0,
    rewardPoolPct:0,
    externalFeePct:2,
    rewardRate: 80,
    visible: true
  },
  {
    pid: 0,
    lpSymbol: 'KNIGHT',
    lpAddresses: {
      97: '0x16C0e0936E1B38Ff1F9b8a1e75d8ba29aDf87d30', // KNIGHT
      56: '0x16C0e0936E1B38Ff1F9b8a1e75d8ba29aDf87d30', // KNIGHT
    },
    tokenSymbol: 'KNIGHT',
    tokenAddresses: {
      97: '0x16C0e0936E1B38Ff1F9b8a1e75d8ba29aDf87d30', // KNIGHT
      56: '0x16C0e0936E1B38Ff1F9b8a1e75d8ba29aDf87d30', // KNIGHT
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    burnPct:2,
    rewardPoolPct:3,
    externalFeePct:0,
    rewardRate: .25,
    visible: true
  },
  {
    pid: 2,
    lpSymbol: 'LEGEND',
    lpAddresses: {
      97: '0xDc661984735b535210CB1f52f86cc58616024192', // LEGEND
      56: '0xDc661984735b535210CB1f52f86cc58616024192', // LEGEND
    },
    tokenSymbol: 'LEGEND',
    tokenAddresses: {
      97: '0xDc661984735b535210CB1f52f86cc58616024192', // LEGEND
      56: '0xDc661984735b535210CB1f52f86cc58616024192', // LEGEND
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    burnPct:0,
    rewardPoolPct:0,
    externalFeePct:3,
    rewardRate: .000017,
    visible: true
  },
  {
    pid: 1,
    lpSymbol: 'TABLE',
    lpAddresses: {
      97: '0xf5a2F7418035ce76967F515f39d65719bB0453B6', // TABLE
      56: '0xf5a2F7418035ce76967F515f39d65719bB0453B6', // TABLE
    },
    tokenSymbol: 'TABLE',
    tokenAddresses: {
      97: '0xf5a2F7418035ce76967F515f39d65719bB0453B6', // TABLE
      56: '0xf5a2F7418035ce76967F515f39d65719bB0453B6', // TABLE
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    burnPct:0,
    rewardPoolPct:0,
    externalFeePct:2,
    rewardRate: .000001,
    visible: true
  },
  {
    pid: 4,
    lpSymbol: 'SHILLING',
    lpAddresses: {
      97: '0xf5a2F7418035ce76967F515f39d65719bB0453B6', // SHILLING
      56: '0xf5a2F7418035ce76967F515f39d65719bB0453B6', // SHILLING
    },
    tokenSymbol: 'SHILLING',
    tokenAddresses: {
      97: '0xf5a2F7418035ce76967F515f39d65719bB0453B6', // SHILLING
      56: '0xf5a2F7418035ce76967F515f39d65719bB0453B6', // SHILLING
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    burnPct:0,
    rewardPoolPct:0,
    externalFeePct:10,
    rewardRate: 100000,
    visible: false
  },
]

export default battlefield
