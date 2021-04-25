import React from 'react'
import { Button, useWalletModal } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useKdfnLegendApprove } from 'hooks/useApprove'



const ApproveLegendButton = () => {
  const TranslateString = useI18n()
  const { onApprove }  = useKdfnLegendApprove()

  return (
    <Button  variant="secondary" mt="24px" onClick={onApprove}>
            {TranslateString(999, 'Approve TABLE')}
    </Button> 
  )
}

export default ApproveLegendButton
