import BigNumber from 'bignumber.js/bignumber'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const CAKE_PER_BLOCK = new BigNumber(1)
export const BLOCKS_PER_YEAR = new BigNumber(10512000)
export const BSC_BLOCK_TIME = 3
export const CAKE_POOL_PID = 1
export const BASE_EXCHANGE_URL = 'https://exchange.alchemistdefi.com/'
export const V2_BASE_EXCHANGE_URL = 'https://pancakeswap.finance/'
export const PSI_BASE_EXCHANGE_URL = 'https://psidex.passive-income.io/'
export const BASE_ADD_LIQUIDITY_URL = `${BASE_EXCHANGE_URL}#/add`
export const BASE_LIQUIDITY_POOL_URL = `${BASE_EXCHANGE_URL}#/pool`
export const V2_BASE_ADD_LIQUIDITY_URL = `${V2_BASE_EXCHANGE_URL}add`
export const V2_BASE_LIQUIDITY_POOL_URL = `${V2_BASE_EXCHANGE_URL}pool`
export const PSI_BASE_ADD_LIQUIDITY_URL = `${PSI_BASE_EXCHANGE_URL}#/add`
export const PSI_BASE_LIQUIDITY_POOL_URL = `${PSI_BASE_EXCHANGE_URL}#/pool`
export const LOTTERY_MAX_NUMBER_OF_TICKETS = 50
export const LOTTERY_TICKET_PRICE = 50
