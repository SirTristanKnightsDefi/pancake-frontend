import { getPancakeProfileAddress, getPancakeRabbitsAddress, getBunnyFactoryAddress, getTheGrailNFTsAddress, getKotrtNFTsAddress } from 'utils/addressHelpers'
import { getContract } from 'utils/web3'
import profileABI from 'config/abi/pancakeProfile.json'
import pancakeRabbitsAbi from 'config/abi/pancakeRabbits.json'
import bunnyFactoryAbi from 'config/abi/bunnyFactory.json'
import theGrailNFTsAbi from 'config/abi/thegrailnfts.json'
import kotrtNFTsAbi from 'config/abi/kotrtnfts.json'

export const getProfileContract = () => {
  return getContract(profileABI, getPancakeProfileAddress())
}

export const getPancakeRabbitContract = () => {
  return getContract(pancakeRabbitsAbi, getPancakeRabbitsAddress())
}

export const getBunnyFactoryContract = () => {
  return getContract(bunnyFactoryAbi, getBunnyFactoryAddress())
}

export const getTheGrailNFTsContract= () => {
  return getContract(theGrailNFTsAbi, getTheGrailNFTsAddress())
}

export const getKotrtNFTsContract= () => {
  return getContract(kotrtNFTsAbi, getKotrtNFTsAddress())
}
export default null
