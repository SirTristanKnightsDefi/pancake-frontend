import addresses from 'config/constants/contracts'
import { Address } from 'config/constants/types'

export const getAddress = (address: Address): string => {
  const mainNetChainId = 56
  const chainId = process.env.REACT_APP_CHAIN_ID
  return address[chainId] ? address[chainId] : address[mainNetChainId]
}

export const getCakeAddress = () => {
  return getAddress(addresses.cake) // Returns KNIGHT
}
export const getTableAddress = () => {
  return getAddress(addresses.table) // Returns TABLE
}
export const getLegendAddress = () => {
  return getAddress(addresses.legend) // Returns LEGEND
}
export const getSquireAddress = () => {
  return getAddress(addresses.squire) // Returns SQUIRE
}
export const getTheGrailNFTsAddress = () => {
  return getAddress(addresses.thegrailnfts) // Returns The Grail NFTs
}
export const getKotrtNFTsAddress = () => {
  return getAddress(addresses.kotrtnfts) // Returns KOTRT NFTs
}
export const getKdfnNFTsAddress = () => {
  return getAddress(addresses.kdfnnfts) // Returns Knights Defi NFTs
}
export const getMasterChefAddress = () => {
  return getAddress(addresses.masterChef)
}
export const getBattlefieldAddress = () => {
  return getAddress(addresses.battlefield)
}
export const getMulticallAddress = () => {
  return getAddress(addresses.mulltiCall)
}
export const getWbnbAddress = () => {
  return getAddress(addresses.wbnb)
}
export const getLotteryAddress = () => {
  return getAddress(addresses.lottery)
}
export const getLotteryTicketAddress = () => {
  return getAddress(addresses.lotteryNFT)
}
export const getPancakeProfileAddress = () => {
  return getAddress(addresses.pancakeProfile)
}
export const getPancakeRabbitsAddress = () => {
  return getAddress(addresses.pancakeRabbits)
}
export const getBunnyFactoryAddress = () => {
  return getAddress(addresses.bunnyFactory)
}
export const getClaimRefundAddress = () => {
  return getAddress(addresses.claimRefund)
}
export const getPointCenterIfoAddress = () => {
  return getAddress(addresses.pointCenterIfo)
}
