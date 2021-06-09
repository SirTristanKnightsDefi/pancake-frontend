import React from 'react'
import BigNumber from 'bignumber.js'
import { Button, useWalletModal, Text, Flex } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useMilfNftWbnbPurchaseApprove, useMilfNftWbnbPurchaseApproveUnlimited } from 'hooks/useApprove'

const ApproveWbnbButton = (amount) => {
  const TranslateString = useI18n()
  const { onApprove }  = useMilfNftWbnbPurchaseApprove(amount)
  const { onApproveUnlimited }  = useMilfNftWbnbPurchaseApproveUnlimited()

  return (
    <Flex>
      <Button height="128px" variant="secondary" mt="24px" mr="4px" onClick={onApprove}>
              <Text>Approve WBNB - Price Only</Text>
      </Button>
      <Button height="128px" variant="secondary" mt="24px" onClick={onApproveUnlimited}>
        <Text>Approve WBNB - Unlimited</Text>
      </Button>
    </Flex>
  )
}

export default ApproveWbnbButton
