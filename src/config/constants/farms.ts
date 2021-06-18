import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 10,
    lpSymbol: 'CUMMIES-BNB V2 LP',
    lpAddresses: {
      97: '0x02bFf262b10B7Ae1d2E4455ad4CAE2d0A6ECF086', // CUMMIES-BNB V2 LP
      56: '0x02bFf262b10B7Ae1d2E4455ad4CAE2d0A6ECF086', // CUMMIES-BNB V2 LP
    },
    tokenSymbol: 'CUMMIES',
    tokenAddresses: {
      97: '0x27ae27110350b98d564b9a3eed31baebc82d878d', // CUMMIES
      56: '0x27ae27110350b98d564b9a3eed31baebc82d878d', // CUMMIES
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    lpVersion: 2
  },
  
]

export default farms
