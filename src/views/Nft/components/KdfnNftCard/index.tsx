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
import { getKdfnNFTsContract } from 'utils/contractHelpers'
import { useProfile } from 'state/hooks'
import useI18n from 'hooks/useI18n'
import { Nft } from 'config/constants/types'
import { useSquire, useKnightsDefiNFTs } from 'hooks/useContract'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useKdfnNftPurchaseApprove } from 'hooks/useApprove'
import UnlockButton from 'components/UnlockButton'
import InfoRow from '../InfoRow'
import Image from '../Image'
import { KdfnNftProviderContext } from '../../contexts/NftProvider'
import TransferNftModal from '../TransferNftModal'
import PurchaseNftModal from '../PurchaseNftModal'

type State = {
  mintCap: number
  numberMinted: number
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

const KdfnNftCard: React.FC<NftCardProps> = ({ nft }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [value, setValue] = useState('')
  const [error, setError] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [state, setState] = useState<State>({
    mintCap: 0,
    numberMinted: 0,
  })
  const TranslateString = useI18n()
  const { isInitialized, getTokenIds, getNftIds, reInitialize } = useContext(KdfnNftProviderContext)
  const { profile } = useProfile()
  const { tokenId, nftId, name, images, description } = nft
  const tokenIds = getTokenIds(tokenId)
  const nftIds = getNftIds(nftId)
  const walletOwnsNft = nftIds && nftIds.length > 0
  const Icon = isOpen ? ChevronUpIcon : ChevronDownIcon
  const squireContract = useSquire()
  const { account } = useWallet()
  const showTransferButton = 0

  const handleClick = async () => {
    setIsOpen(!isOpen)
  }

  const handleSuccess = () => {
    reInitialize()
  }

  useEffect(() => {
    const fetchNftData = async (id: number) => {
      const kdfnNFTsContract = getKdfnNFTsContract()
    
      const {mintCap, numberMinted} = await kdfnNFTsContract.methods.nfts(id).call()
    
    setState((prevState) => ({
      ...prevState, 
      mintCap,
      numberMinted
    }))
    }
    fetchNftData(nft.nftId) 
  }, [nft.nftId])

  const [onPresentTransferModal] = useModal(
    <TransferNftModal nft={nft} tokenIds={tokenIds} onSuccess={handleSuccess} />,
  )

  const [onPresentPurchaseModal] = useModal(
    <PurchaseNftModal nft={nft} tokenIds={tokenIds} onSuccess={handleSuccess} />,
  )
  
  const { onApprove } = useKdfnNftPurchaseApprove(squireContract)

  return (
    <Card isActive={walletOwnsNft}>
      <Image src={`/images/nfts/${images.lg}`} alt={name} originalLink={walletOwnsNft ? images.ipfs : null} />
      <CardBody>
        <Header>
          <Heading>{name}</Heading>
          {isInitialized && walletOwnsNft && (
            <Tag outline variant="secondary">
              {TranslateString(999, 'In Wallet')}
            </Tag>
          )}
        </Header>
        <Text>Price: {nft.purchaseTokenPrice} {nft.purchaseTokenName}</Text>
        <Text>Total Sold: {state.numberMinted}/{state.mintCap}</Text>
        {/* {isInitialized && walletOwnsNft (
          <Button  variant="secondary" mt="24px" onClick={onPresentTransferModal}>
            {TranslateString(999, 'Transfer')}
          </Button>
        )} */}
        
        {account ? (
            <Button  variant="secondary" mt="24px" onClick={onApprove}>
            {TranslateString(999, 'Approve')}
            </Button>          
          ) : (
            <Text>{tokenIds}</Text>
          )}
        {account ? (
            <Button variant="secondary" mt="24px" onClick={onPresentPurchaseModal}>
              {TranslateString(999, 'Purchase')}
            </Button>            
          ) : (
            <UnlockButton  />
          )}  
      </CardBody>
      <CardFooter p="0">
        <DetailsButton endIcon={<Icon width="24px" color="primary" />} onClick={handleClick}>
          {TranslateString(658, 'Details')}
        </DetailsButton>
        {isOpen && (
          <InfoBlock>
            <Text as="p" color="textSubtle" style={{ textAlign: 'center' }}>
              {description}
            </Text>
          </InfoBlock>
        )}
      </CardFooter>s
    </Card>
  )
}

export default KdfnNftCard
