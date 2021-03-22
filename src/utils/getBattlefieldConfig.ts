import { battlefieldConfig } from 'config/constants'

const getFarmConfig = (pid: number) => battlefieldConfig.find((f) => f.pid === pid)

export default getFarmConfig
