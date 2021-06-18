import contracts from './contracts'
import { BattlefieldConfig, QuoteToken } from './types'

const battlefield: BattlefieldConfig[] = [
  {
    pid: 10,
    lpSymbol: 'CUMMIES-BNB LP V2',
    lpAddresses: {
      97: '0x02bFf262b10B7Ae1d2E4455ad4CAE2d0A6ECF086', // CUMMIES CUMMIES-BNB LP V2
      56: '0x02bFf262b10B7Ae1d2E4455ad4CAE2d0A6ECF086', // CUMMIES CUMMIES-BNB LP V2
    },
    tokenSymbol: 'CUMMIES',
    tokenAddresses: {
      97: '0x27ae27110350b98d564b9a3eed31baebc82d878d', // CUMMIES
      56: '0x27ae27110350b98d564b9a3eed31baebc82d878d', // CUMMIES
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    burnPct:0,
    rewardPoolPct:0,
    externalFeePct:2,
    rewardRate: 80,
    visible: true
  }
]

export default battlefield
