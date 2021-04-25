import React from 'react'
import { Button, useWalletModal } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useKdfnSquireApprove } from 'hooks/useApprove'



const ApproveSquireButton = () => {
  const TranslateString = useI18n()
  const { onApprove }  = useKdfnSquireApprove()

  return (
    <Button  variant="secondary" mt="24px" onClick={onApprove}>
            {TranslateString(999, 'Approve SQUIRE')}
    </Button> 
  )
}

export default ApproveSquireButton
