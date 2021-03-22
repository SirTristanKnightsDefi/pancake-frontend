import farmsConfig from './farms'
import battlefieldConfig from './battlefield'

const communityFarms = farmsConfig.filter((farm) => farm.isCommunity).map((farm) => farm.tokenSymbol)
const communityBattlefields = battlefieldConfig.filter((battlefield) => battlefield.isCommunity).map((battlefield) => battlefield.tokenSymbol)

export { farmsConfig, battlefieldConfig, communityFarms, communityBattlefields }
export { default as poolsConfig } from './pools'
export { default as ifosConfig } from './ifo'
