import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import {
  Card,
  CardBody,
  Heading,
  Tag,
  Button,
  ChevronUpIcon,
  ChevronDownIcon,
  Text,
  CardFooter,
  useModal,
} from '@pancakeswap-libs/uikit'
import { getKdfnNFTsBetaContract } from 'utils/contractHelpers'
import { getKdfnNFTsBetaAddress } from 'utils/addressHelpers'
import { useProfile } from 'state/hooks'
import useI18n from 'hooks/useI18n'
import { Nft } from 'config/constants/types'
import { useSquire, useKnight, useLegend, useTable } from 'hooks/useContract'
import useRefresh from 'hooks/useRefresh'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import UnlockButton from 'components/UnlockButton'
import ApproveSquireButton from 'components/ApproveSquireButton'
import ApproveKnightButton from 'components/ApproveKnightButton'
import ApproveLegendButton from 'components/ApproveLegendButton'
import ApproveTableButton from 'components/ApproveTableButton'
import InfoRow from '../InfoRow'
import Image from '../Image'
import { KdfnNftBetaProviderContext } from '../../contexts/NftProvider'
import TransferNftModal from '../TransferNftModal'
import PurchaseNftModal from '../PurchaseNftModal'

type State = {
  mintCap: number
  numberMinted: number
  description: string
  purchaseTokenAmount: number
  purchaseTokenID: number
  adminCut: number
  mintable: boolean
  rawSquireBalance: number
  rawKnightBalance: number
  rawLegendBalance: number
  rawTableBalance: number
  squireBalance: string
  knightBalance: string
  legendBalance: string
  tableBalance: string
  squireAllowance: number
  knightAllowance: number
  legendAllowance: number
  tableAllowance: number
}

interface NftCardProps {
  nft: Nft
}

const Header = styled(InfoRow)`
  min-height: 28px;
`

const DetailsButton = styled(Button).attrs({ variant: 'text', fullWidth: true })`
  height: auto;
  padding: 16px 24px;

  &:hover:not(:disabled):not(:active) {
    background-color: transparent;
  }

  &:focus:not(:active) {
    box-shadow: none;
  }
`

const InfoBlock = styled.div`
  padding: 24px;
`

const KdfnNftBetaCard: React.FC<NftCardProps> = ({ nft }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { fastRefresh } = useRefresh()
  const [state, setState] = useState<State>({
    mintCap: 0,
    numberMinted: 0,
    description: '',
    purchaseTokenAmount: 0,
    purchaseTokenID: -1,
    adminCut: 0,
    mintable: false,
    squireBalance: '0',
    rawSquireBalance: 0,
    knightBalance: '0',
    rawKnightBalance: 0,
    legendBalance: '0',
    rawLegendBalance: 0,
    tableBalance: '0',
    rawTableBalance: 0,
    squireAllowance: 0,
    knightAllowance: 0,
    legendAllowance: 0,
    tableAllowance: 0
  })
  const TranslateString = useI18n()
  const { isInitialized, getTokenIds, getNftIds, reInitialize } = useContext(KdfnNftBetaProviderContext)
  const { tokenId, nftId, name, images } = nft
  const tokenIds = getTokenIds(tokenId)
  const nftIds = getNftIds(nftId)
  const walletOwnsNft = nftIds && nftIds.length > 0
  const Icon = isOpen ? ChevronUpIcon : ChevronDownIcon
  
  const squireContract = useSquire()
  const knightContract = useKnight()
  const legendContract = useLegend()
  const tableContract = useTable()
  const { account } = useWallet()

 
  

  const handleClick = async () => {
    setIsOpen(!isOpen)
  }

  const handleSuccess = () => {
    reInitialize()
  }

  useEffect(() => {
    const fetchNftData = async (id: number) => {
      const kdfnNFTsContract = getKdfnNFTsBetaContract()
    
      const {mintCap, numberMinted, description, purchaseTokenAmount, purchaseTokenID, adminCut, mintable} = await kdfnNFTsContract.methods.nfts(id).call()
    
    setState((prevState) => ({
      ...prevState, 
      mintCap,
      numberMinted,
      description,
      purchaseTokenAmount,
      purchaseTokenID,
      adminCut,
      mintable
    }))
    }
    fetchNftData(nft.nftId) 
  }, [nft.nftId, fastRefresh])

  useEffect(() => {
    const fetchTokensData = async (acct: string) => {
      const kdfnNFTsAddress = getKdfnNFTsBetaAddress()
      let squireBalance = '0'
      let rawSquireBalance = 0
      let knightBalance = '0'
      let rawKnightBalance = 0
      let legendBalance = '0'
      let rawLegendBalance = 0
      let tableBalance = '0'
      let rawTableBalance = 0
      let squireAllowance = 0
      let knightAllowance = 0
      let legendAllowance = 0
      let tableAllowance = 0
      if(account){
        rawSquireBalance = await squireContract.methods.balanceOf(account).call()
        squireAllowance = await squireContract.methods.allowance(account, kdfnNFTsAddress).call()
        const calculatedSquireBalance = rawSquireBalance / 1e18
        squireBalance = calculatedSquireBalance.toFixed(0)
        rawKnightBalance = await knightContract.methods.balanceOf(account).call()
        knightAllowance = await knightContract.methods.allowance(account, kdfnNFTsAddress).call()
        const calculatedKnightBalance = rawKnightBalance / 1e18
        knightBalance = calculatedKnightBalance.toFixed(1)
        rawLegendBalance = await legendContract.methods.balanceOf(account).call()
        legendAllowance = await legendContract.methods.allowance(account, kdfnNFTsAddress).call()
        const calculatedLegendBalance = rawLegendBalance / 1e18
        legendBalance = calculatedLegendBalance.toFixed(2)
        rawTableBalance = await tableContract.methods.balanceOf(account).call()
        tableAllowance = await tableContract.methods.allowance(account, kdfnNFTsAddress).call()
        const calculatedTableBalance = rawTableBalance / 1e18
        tableBalance = calculatedTableBalance.toFixed(4)
      }
      
    setState((prevState) => ({
      ...prevState, 
      squireBalance,
      rawSquireBalance, 
      knightBalance,
      rawKnightBalance,
      legendBalance,
      rawLegendBalance,
      tableBalance,
      rawTableBalance,
      squireAllowance,
      knightAllowance,
      legendAllowance,
      tableAllowance
    }))
    }
    fetchTokensData(account) 
  }, [fastRefresh, account, squireContract, knightContract, legendContract, tableContract])

  useEffect(() => {
    const fetchTokensData = async (acct: string) => {
      const kdfnNFTsAddress = getKdfnNFTsBetaAddress()
      let squireAllowance = 0
      if(account){
        squireAllowance = await squireContract.methods.allowance(account, kdfnNFTsAddress).call()
      }
      
    setState((prevState) => ({
      ...prevState, 
      squireAllowance
    }))
    }
    fetchTokensData(account) 
  }, [fastRefresh, account, squireContract, knightContract, legendContract, tableContract])

  const [onPresentTransferModal] = useModal(
    <TransferNftModal nft={nft} tokenIds={tokenIds} onSuccess={handleSuccess} />,
  )

  const [onPresentPurchaseModal] = useModal(
    <PurchaseNftModal nft={nft} tokenIds={tokenIds} onSuccess={handleSuccess} />,
  )

  return (
    <Card isActive={walletOwnsNft}>
      <Image src={`/images/nfts/${images.lg}`} alt={name} originalLink={walletOwnsNft ? images.ipfs : null} />
      <CardBody>
        <Header>
          <Heading>{state.description}</Heading>
          {isInitialized && walletOwnsNft && (
            <Tag outline variant="secondary">
              {TranslateString(999, 'In Wallet')}
            </Tag>
          )}
        </Header>
        <Text>Price: {state.purchaseTokenAmount/1e18} {nft.purchaseTokenName} </Text>
        {account && state.mintable && nft.purchaseTokenName === "SQUIRE" ? (
            <Text>You Hold: {state.squireBalance} SQUIRE</Text>     
          ) : (
            <Text/>
        )}
        {account && state.mintable && nft.purchaseTokenName === "KNIGHT" ? (
            <Text>You Hold: {state.knightBalance} KNIGHT</Text>     
          ) : (
            <Text/>
        )}
        {account && state.mintable && nft.purchaseTokenName === "LEGEND" ? (
            <Text>You Hold: {state.legendBalance} LEGEND</Text>     
          ) : (
            <Text/>
        )}
        {account && state.mintable && nft.purchaseTokenName === "TABLE" ? (
            <Text>You Hold: {state.tableBalance} TABLE</Text>     
          ) : (
            <Text/>
        )}
        {state.mintable ? (<Text>Artist Earnings: {state.adminCut}%</Text>) : (<Text />)}
        <Text>Total Sold: {state.numberMinted}/{state.mintCap}</Text>
        {/* {isInitialized && walletOwnsNft (
          <Button  variant="secondary" mt="24px" onClick={onPresentTransferModal}>
            {TranslateString(999, 'Transfer')}
          </Button>
        )} */}
        
        {
          state.mintable ? (<Text/>) : (<Text>Sold Out!</Text>)
        }
        
        {account && state.mintable && nft.purchaseTokenName === "SQUIRE" && state.squireAllowance < 1 ? (
            <ApproveSquireButton />      
          ) : (
            <Text/>
        )}
        {account && state.mintable && nft.purchaseTokenName === "KNIGHT" && state.knightAllowance < 1 ? (
            <ApproveKnightButton />      
          ) : (
            <Text/>
        )}
        {account && state.mintable && nft.purchaseTokenName === "LEGEND" && state.legendAllowance < 1 ? (
            <ApproveLegendButton />      
          ) : (
            <Text/>
        )}

        {account && state.mintable && nft.purchaseTokenName === "TABLE" && state.tableAllowance < 1 ? (
            <ApproveTableButton />      
          ) : (
            <Text/>
        )}

        {account && state.mintable && nft.purchaseTokenName === "SQUIRE" && state.squireAllowance > 0 ? (
            <Button variant="secondary" mt="24px" onClick={onPresentPurchaseModal}>
              {TranslateString(999, 'Purchase')}
            </Button>            
          ) : (
            <Text />
        )}

        {account && state.mintable && nft.purchaseTokenName === "KNIGHT" && state.knightAllowance > 0 ? (
            <Button variant="secondary" mt="24px" onClick={onPresentPurchaseModal}>
              {TranslateString(999, 'Purchase')}
            </Button>            
          ) : (
            <Text />
        )}

        {account && state.mintable && nft.purchaseTokenName === "LEGEND" && state.legendAllowance > 0 ? (
            <Button variant="secondary" mt="24px" onClick={onPresentPurchaseModal}>
              {TranslateString(999, 'Purchase')}
            </Button>            
          ) : (
            <Text />
        )}

        {account && state.mintable && nft.purchaseTokenName === "TABLE" && state.tableAllowance > 0 ? (
            <Button variant="secondary" mt="24px" onClick={onPresentPurchaseModal}>
              {TranslateString(999, 'Purchase')}
            </Button>            
          ) : (
            <Text />
        )}

        {!account && state.mintable ? (
          <UnlockButton />            
        ) : (
          <Text />
        )} 
      </CardBody>
      <CardFooter p="0">
        <DetailsButton endIcon={<Icon width="24px" color="primary" />} onClick={handleClick}>
          {TranslateString(658, 'Details')}
        </DetailsButton>
        {isOpen && (
          <InfoBlock>
            <Text as="p" color="textSubtle" style={{ textAlign: 'center' }}>
              {state.description}
            </Text>
          </InfoBlock>
        )}
      </CardFooter>
    </Card>
  )
}

export default KdfnNftBetaCard
