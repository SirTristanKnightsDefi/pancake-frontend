import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, Modal, LinkExternal } from '@pancakeswap-libs/uikit'
import ModalActions from 'components/ModalActions'
import {CompoundAllModalInput} from 'components/ModalInput'
import useI18n from 'hooks/useI18n'
import { getFullDisplayBalance } from 'utils/formatBalance'

interface CompoundAllModalProps {
  onConfirm: () => void
  onDismiss?: () => void
}

const CompoundAllModal: React.FC<CompoundAllModalProps> = ({ onConfirm, onDismiss }) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const TranslateString = useI18n()

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
    },
    [setVal],
  )

  return (
    <Modal title={TranslateString(1068, 'Compound')} onDismiss={onDismiss}>
      <CompoundAllModalInput symbol='Test'/>
      <ModalActions>
        <Button variant="secondary" onClick={onDismiss} fullWidth>
          {TranslateString(462, 'Cancel')}
        </Button>
        <Button
          fullWidth
          onClick={async () => {
            setPendingTx(true)
            await onConfirm()
            setPendingTx(false)
            onDismiss()
          }}
        >
          {pendingTx ? TranslateString(488, 'Pending Confirmation') : TranslateString(464, 'Confirm')}
        </Button>
      </ModalActions>
    </Modal>
  )
}

export default CompoundAllModal
