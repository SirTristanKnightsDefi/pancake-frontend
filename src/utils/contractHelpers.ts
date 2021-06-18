import { getPancakeProfileAddress, getPancakeRabbitsAddress, getBunnyFactoryAddress, getTheGrailNFTsAddress, getKotrtNFTsAddress, getKdfnNFTsAddress, getKdfnNFTsBetaAddress, getMilfNFTsAddress, getSquireAddress, getLegendAddress, getTableAddress, getKnightAddress, getShillingAddress, getBattlefieldAddress } from 'utils/addressHelpers'
import { getContract } from 'utils/web3'
import profileABI from 'config/abi/pancakeProfile.json'
import pancakeRabbitsAbi from 'config/abi/pancakeRabbits.json'
import bunnyFactoryAbi from 'config/abi/bunnyFactory.json'
import theGrailNFTsAbi from 'config/abi/thegrailnfts.json'
import kotrtNFTsAbi from 'config/abi/kotrtnfts.json'
import kdfnNFTsAbi from 'config/abi/kdfnnfts.json'
import kdfnNFTsBetaAbi from 'config/abi/kdfnnftsbeta.json'
import knightAbi from 'config/abi/knight.json'
import squireAbi from 'config/abi/squire.json'
import legendAbi from 'config/abi/legend.json'
import tableAbi from 'config/abi/table.json'
import shillingAbi from 'config/abi/shilling.json'
import battlefieldAbi from 'config/abi/battlefield.json'
import milfNFTsAbi from 'config/abi/milfnfts.json'

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

export const getMilfNFTsContract= () => {
  return getContract(milfNFTsAbi, getMilfNFTsAddress())
}

export const getKdfnNFTsContract= () => {
  return getContract(kdfnNFTsAbi, getKdfnNFTsAddress())
}

export const getKdfnNFTsBetaContract= () => {
  return getContract(kdfnNFTsBetaAbi, getKdfnNFTsBetaAddress())
}

export const getSquireContract= () => {
  return getContract(squireAbi, getSquireAddress())
}

export const getShillingContract= () => {
  return getContract(shillingAbi, getShillingAddress())
}

export const getLegendContract= () => {
  return getContract(legendAbi, getLegendAddress())
}

export const getKnightContract= () => {
  return getContract(knightAbi, getKnightAddress())
}

export const getTableContract= () => {
  return getContract(tableAbi, getTableAddress())
}

export const getBattlefieldContract= () => {
  return getContract(battlefieldAbi, getBattlefieldAddress())
}

export default null
