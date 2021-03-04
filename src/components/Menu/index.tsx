import React, { useContext } from 'react'
import { Menu as UikitMenu } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { allLanguages } from 'config/localisation/languageCodes'
import { LanguageContext } from 'contexts/Localisation/languageContext'
import { usePriceCakeBusd } from 'state/hooks'
import config from './config'

const Menu = (props) => {
  const { account, connect, reset } = useWallet()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const knightPriceUsd = usePriceCakeBusd()
  const tablePriceUsd = usePriceCakeBusd()

  return (
    <UikitMenu
      account={account}
      login={connect}
      logout={reset}
      isDark={false}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      toggleTheme={() => {}}
      currentLang={selectedLanguage && selectedLanguage.code}
      langs={allLanguages}
      setLang={setSelectedLanguage}
      knightPriceUsd={cakePriceUsd.toNumber()}
      tablePriceUsd={cakePriceUsd.toNumber()}
      links={config}
      {...props}
    />
  )
}

export default Menu
