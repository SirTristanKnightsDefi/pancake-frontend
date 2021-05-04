import contracts from './contracts'
import { BattlefieldConfig, QuoteToken } from './types'

const battlefieldRewards: BattlefieldConfig[] = [
  {
    pid: 0,
    lpSymbol: 'SHILLING',
    lpAddresses: {
      97: '0x9D3733E196C8e73F9120E5A41D6b52f4dD3a00C1', // SHILLING
      56: '0x9D3733E196C8e73F9120E5A41D6b52f4dD3a00C1', // SHILLING
    },
    tokenSymbol: 'SHILLING',
    tokenAddresses: {
      97: '0x9D3733E196C8e73F9120E5A41D6b52f4dD3a00C1', // SHILLING
      56: '0x9D3733E196C8e73F9120E5A41D6b52f4dD3a00C1', // SHILLING
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    burnPct:0,
    rewardPoolPct:0,
    externalFeePct:0,
    rewardRate: 100000,
  }
]

export default battlefieldRewards
