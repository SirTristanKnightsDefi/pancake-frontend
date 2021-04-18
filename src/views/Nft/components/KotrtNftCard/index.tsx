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
import InfoRow from '../InfoRow'
import Image from '../Image'
import { KotrtNftProviderContext } from '../../contexts/NftProvider'
import TransferNftModal from '../TransferNftModal'

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

const KotrtNftCard: React.FC<NftCardProps> = ({ nft }) => {
  const [isOpen, setIsOpen] = useState(false)
  const TranslateString = useI18n()
  const { isInitialized, getTokenIds, reInitialize } = useContext(KotrtNftProviderContext)
  const { profile } = useProfile()
  const { tokenId, name, images, description } = nft
  const tokenIds = getTokenIds(tokenId)
  const walletOwnsNft = tokenIds && tokenIds.length > 0
  const Icon = isOpen ? ChevronUpIcon : ChevronDownIcon

  const handleClick = async () => {
    setIsOpen(!isOpen)
  }

  const handleSuccess = () => {
    reInitialize()
  }

  const [onPresentTransferModal] = useModal(
    <TransferNftModal nft={nft} tokenIds={tokenIds} onSuccess={handleSuccess} />,
  )

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
        {isInitialized && walletOwnsNft && (
          <Button  variant="secondary" mt="24px" onClick={onPresentTransferModal}>
            {TranslateString(999, 'Transfer')}
          </Button>
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

export default KotrtNftCard
