import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading } from '@pancakeswap-libs/uikit'

const StyledTwitterCard = styled(Card)`
  align-items: center;
  display: flex;
  flex: 1;
`

const TwitterCard = () => {
  return (
    <StyledTwitterCard>
      <CardBody>
        <Heading size="lg" mb="24px">
          Our latest news
        </Heading>
          <a className="twitter-timeline" href="https://twitter.com/milkswap_bsc?ref_src=twsrc%5Etfw">Tweets by milkswap_bsc</a>
          <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8" />
      </CardBody>
    </StyledTwitterCard>
  )
}

export default TwitterCard
