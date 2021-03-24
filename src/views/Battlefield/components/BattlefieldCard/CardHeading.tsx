import React from 'react'
import styled from 'styled-components'
import { Tag, Flex, Heading, Image, Text} from '@pancakeswap-libs/uikit'
import { CommunityTag, CoreTag } from 'components/Tags'

export interface ExpandableSectionProps {
  lpLabel?: string
  multiplier?: string
  isCommunityBattlefield?: boolean
  battlefieldImage?: string
  tokenSymbol?: string
  burnPct?: number
  rewardPoolPct?:number
  externalFeePct?:number
}

const Wrapper = styled(Flex)`
  svg {
    margin-right: 0.25rem;
  }
`

const MultiplierTag = styled(Tag)`
  margin-left: 4px;
`

const CardHeading: React.FC<ExpandableSectionProps> = ({
  lpLabel,
  multiplier,
  isCommunityBattlefield,
  battlefieldImage,
  tokenSymbol,
  burnPct,
  rewardPoolPct,
  externalFeePct
}) => {
  return (
    <Wrapper justifyContent="space-between" alignItems="center" mb="12px">
      <Image src={`/images/battlefield/${battlefieldImage}.svg`} alt={tokenSymbol} width={64} height={64} />
      <Flex flexDirection="column" alignItems="flex-end">
        <Heading mb="0px">{lpLabel}</Heading>
        <Text mb="0px">Burn: {burnPct}%</Text>
        <Text mb="0px">Reward Pool: {rewardPoolPct}%</Text>
        <Text mb="0px">External Fees: {externalFeePct}%</Text>
      </Flex>
    </Wrapper>
  )
}

export default CardHeading
