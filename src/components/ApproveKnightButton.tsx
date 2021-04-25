import React from 'react'
import { Button, useWalletModal } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useKdfnKnightApprove } from 'hooks/useApprove'



const ApproveKnightButton = () => {
  const TranslateString = useI18n()
  const { onApprove }  = useKdfnKnightApprove()

  return (
    <Button  variant="secondary" mt="24px" onClick={onApprove}>
            {TranslateString(999, 'Approve KNIGHT')}
    </Button> 
  )
}

export default ApproveKnightButton
