import React, { useState, useContext } from 'react'
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
  const TranslateString = useI18n()
  const { isInitialized, getTokenIds, reInitialize } = useContext(KdfnNftProviderContext)
  const { profile } = useProfile()
  const { tokenId, name, images, description } = nft
  const tokenIds = getTokenIds(tokenId)
  const walletOwnsNft = tokenIds && tokenIds.length > 0
  const Icon = isOpen ? ChevronUpIcon : ChevronDownIcon
  const squireContract = useSquire()
  const { account } = useWallet()
  const kdfnContract = useKnightsDefiNFTs()

  const mintCap = (
    kdfnContract.methods
      .purchaseNft(nft.nftId)
  )

  const handleClick = async () => {
    setIsOpen(!isOpen)
  }

  const handleSuccess = () => {
    reInitialize()
  }

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
          {isInitialized && tokenIds && (
            <Tag outline variant="secondary">
              {TranslateString(999, 'In Wallet')}
            </Tag>
          )}
          {profile?.nft?.tokenId === tokenId && (
            <Tag outline variant="success">
              {TranslateString(999, 'Profile Pic')}
            </Tag>
          )}
        </Header>
        <Text>Price: {nft.purchaseTokenPrice} {nft.purchaseTokenName}</Text>
        {isInitialized && walletOwnsNft && (
          <Button  variant="secondary" mt="24px" onClick={onPresentTransferModal}>
            {TranslateString(999, 'Transfer')}
          </Button>
        )}
        {account ? (
            <Button variant="secondary" mt="24px" onClick={onPresentPurchaseModal}>
              {TranslateString(999, 'Purchase')}
            </Button>            
          ) : (
            <UnlockButton  />
          )}
        {account ? (
            <Button  variant="secondary" mt="24px" onClick={onApprove}>
            {TranslateString(999, 'Approve')}
            </Button>          
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
              {description}
            </Text>
          </InfoBlock>
        )}
      </CardFooter>s
    </Card>
  )
}

export default KdfnNftCard
