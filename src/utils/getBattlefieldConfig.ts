import { battlefieldConfig } from 'config/constants'

const getBattlefieldConfig = (pid: number) => battlefieldConfig.find((f) => f.pid === pid)

export default getBattlefieldConfig
