import React, { useContext } from 'react'
import { Menu as UikitMenu } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { allLanguages } from 'config/localisation/languageCodes'
import { LanguageContext } from 'contexts/Localisation/languageContext'
import { usePriceCakeBusd, usePriceTableBusd, usePriceLegendBusd, usePriceSquireBusd } from 'state/hooks'
import config from './config'

const Menu = (props) => {
  const { account, connect, reset } = useWallet()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const cakePriceUsd = usePriceCakeBusd()
  const tablePriceUsd = usePriceTableBusd()
  const legendPriceUsd = usePriceLegendBusd()
  const squirePriceUsd = usePriceSquireBusd()

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
      cakePriceUsd={cakePriceUsd.toNumber()}
      tablePriceUsd={tablePriceUsd.toNumber()}
      legendPriceUsd={legendPriceUsd.toNumber()}
      squirePriceUsd={squirePriceUsd.toNumber()}
      links={config}
      {...props}
    />
  )
}

export default Menu
