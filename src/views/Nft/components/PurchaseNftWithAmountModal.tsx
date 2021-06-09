import React, { useState } from 'react'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Button, Modal, Text } from '@pancakeswap-libs/uikit'
import { Nft } from 'config/constants/types'
import useI18n from 'hooks/useI18n'
import { useMilfNFTs } from 'hooks/useContract'
import InfoRow from './InfoRow'

interface PurchaseNftWithAmountModalProps {
  nft: Nft
  tokenIds: number[]
  amount: number
  onSuccess: () => any
  onDismiss?: () => void
}

const Value = styled(Text)`
  font-weight: 600;
`

const ModalContent = styled.div`
  margin-bottom: 16px;
`

const Actions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 8px;
`

const Label = styled.label`
  color: ${({ theme }) => theme.colors.text};
  display: block;
  margin-bottom: 8px;
  margin-top: 24px;
`



const PurchaseNftWithAmountModal: React.FC<PurchaseNftWithAmountModalProps> = ({ nft, amount, onSuccess, onDismiss }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const TranslateString = useI18n()
  const { account } = useWallet()
  const milfContract = useMilfNFTs()

  const handleConfirm = async () => {
    try {
      await milfContract.methods
          .purchaseNft(nft.nftId, amount)
          .send({ from: account })
          .on('sending', () => {
            setIsLoading(true)
          })
          .on('receipt', () => {
            onDismiss()
            onSuccess()
          })
          .on('error', () => {
            console.error(error)
            setError('Unable to purchase NFT')
            setIsLoading(false)
          })
    } catch (err) {
      console.error('Unable to purchase NFT:', err)
    }
  }


  return (
    <Modal title={TranslateString(999, 'Purchase NFT')} onDismiss={onDismiss}>
      <ModalContent>
        {error && (
          <Text color="failure" mb="8px">
            {error}
          </Text>
        )}
        <InfoRow>
          <Text>{TranslateString(999, 'Purchasing')}:</Text>
          <Value>{`1x "${nft.name}" NFT`}</Value>
        </InfoRow>
        <Text>Ensure you have enough tokens to complete purchase</Text>
      </ModalContent>
      <Actions>
        <Button  variant="secondary" onClick={onDismiss}>
          {TranslateString(462, 'Cancel')}
        </Button>
        <Button  onClick={handleConfirm}>
          {TranslateString(464, 'Confirm')}
        </Button>
      </Actions>
    </Modal>
  )
}

export default PurchaseNftWithAmountModal