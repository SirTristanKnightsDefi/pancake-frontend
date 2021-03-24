import React, { useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import styled, { keyframes } from 'styled-components'
import { Flex, Text, Skeleton } from '@pancakeswap-libs/uikit'
import { communityBattlefields } from 'config/constants'
import { Battlefield } from 'state/types'
import { provider } from 'web3-core'
import useI18n from 'hooks/useI18n'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import { QuoteToken } from 'config/constants/types'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { fetchBattlefieldUserArmyStrength } from 'state/battlefield/fetchBattlefieldUser'
import {fetchBattlefieldPublicDataAsync} from 'state/battlefield'
import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'
import CardActionsContainer from './CardActionsContainer'
import ApyButton from './ApyButton'

export interface BattlefieldWithStakedValue extends Battlefield {
  apy?: BigNumber
}

const RainbowLight = keyframes`
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

const StyledCardAccent = styled.div`
 background: linear-gradient(
    -45deg,
    #ff738e,
    #e4536f 20%,
    #a34054 40%,
    #b7eaff 60%,
    #92cee7 80%,
    #5dc4d9 100%
  );
  background-size: 300% 300%;
  animation: ${RainbowLight} 2s linear infinite;
  border-radius: 16px;
  filter: blur(8px);
  position: absolute;
  display: none;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`

const FCard = styled.div`
  align-self: baseline;
  background: ${(props) => props.theme.card.background};
  border-radius: 32px;
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 24px;
  position: relative;
  text-align: center;
`

const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.borderColor};
  height: 1px;
  margin: 28px auto;
  width: 100%;
`

const ExpandingWrapper = styled.div<{ expanded: boolean }>`
  height: ${(props) => (props.expanded ? '100%' : '0px')};
  overflow: hidden;
`

interface BattlefieldCardProps {
  battlefield: BattlefieldWithStakedValue
  removed: boolean
  cakePrice?: BigNumber
  bnbPrice?: BigNumber
  ethPrice?: BigNumber
  ethereum?: provider
  account?: string
}

const BattlefieldCard: React.FC<BattlefieldCardProps> = ({ battlefield, removed, cakePrice, bnbPrice, ethPrice, ethereum, account }) => {
  const TranslateString = useI18n()

  const [showExpandableSection, setShowExpandableSection] = useState(false)

  const isCommunityBattlefield = communityBattlefields.includes(battlefield.tokenSymbol)
  // We assume the token name is coin pair + lp e.g. CAKE-BNB LP, LINK-BNB LP,
  // NAR-CAKE LP. The images should be cake-bnb.svg, link-bnb.svg, nar-cake.svg
  const battlefieldImage = battlefield.lpSymbol.split(' ')[0].toLocaleLowerCase()
  
  // const userArmyStrength = fetchBattlefieldUserArmyStrength(account)

  const totalValue: BigNumber = useMemo(() => {
    if (!battlefield.lpTotalInQuoteToken) {
      return null
    }
    if (battlefield.quoteTokenSymbol === QuoteToken.BNB) {
      return bnbPrice.times(battlefield.lpTotalInQuoteToken)
    }
    if (battlefield.quoteTokenSymbol === QuoteToken.CAKE) {
      return cakePrice.times(battlefield.lpTotalInQuoteToken)
    }
    if (battlefield.quoteTokenSymbol === QuoteToken.KNIGHT) {
      return cakePrice.times(battlefield.lpTotalInQuoteToken)
    }
    if (battlefield.quoteTokenSymbol === QuoteToken.ETH) {
      return ethPrice.times(battlefield.lpTotalInQuoteToken)
    }
    return battlefield.lpTotalInQuoteToken
  }, [bnbPrice, cakePrice, ethPrice, battlefield.lpTotalInQuoteToken, battlefield.quoteTokenSymbol])

  const totalBalanceFormatted = totalValue
    ? `$${Number(totalValue).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : '-'

  const lpLabel = battlefield.lpSymbol && battlefield.lpSymbol.toUpperCase().replace('PANCAKE', '')
  const battlefieldAPY = battlefield.apy && battlefield.apy.times(new BigNumber(100)).toNumber().toLocaleString('en-US').slice(0, -1)

  const { quoteTokenAdresses, quoteTokenSymbol, tokenAddresses } = battlefield
  const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAdresses, quoteTokenSymbol, tokenAddresses })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`

  return (
    <FCard>
      {battlefield.tokenSymbol === 'KNIGHT' && <StyledCardAccent />}
      <Text> {battlefield.totalArmyStrength} </Text>
      <CardHeading
        lpLabel={lpLabel}
        multiplier={battlefield.multiplier}
        isCommunityBattlefield={isCommunityBattlefield}
        battlefieldImage={battlefieldImage}
        tokenSymbol={battlefield.tokenSymbol}
        burnPct = {battlefield.burnPct}
        rewardPoolPct = {battlefield.rewardPoolPct}
        externalFeePct = {battlefield.externalFeePct}
      />
      <CardActionsContainer battlefield={battlefield} ethereum={ethereum} account={account} addLiquidityUrl={addLiquidityUrl} />
      <Divider />
      <ExpandableSectionButton
        onClick={() => setShowExpandableSection(!showExpandableSection)}
        expanded={showExpandableSection}
      />
      <ExpandingWrapper expanded={showExpandableSection}>
        <DetailsSection
          removed={removed}
          bscScanAddress={`https://bscscan.com/address/${battlefield.lpAddresses[process.env.REACT_APP_CHAIN_ID]}`}
          totalBalanceFormatted={totalBalanceFormatted}
          lpLabel={lpLabel}
          addLiquidityUrl={addLiquidityUrl}
        />
      </ExpandingWrapper>
    </FCard>
  )
}

export default BattlefieldCard
