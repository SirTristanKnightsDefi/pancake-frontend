import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading } from '@pancakeswap-libs/uikit'
import { Timeline } from 'react-twitter-widgets';

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
        <Timeline
          dataSource={{
            sourceType: 'profile',
            screenName: 'KnightsBSC'
          }}
          options={{
            chrome: 'noheader, nofooter, transparent',
            width: '400',
            height: '250',
            theme: 'dark'
          }}
        />
      </CardBody>
    </StyledTwitterCard>
  )
}

export default TwitterCard
