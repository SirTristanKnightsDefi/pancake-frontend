import React, { useEffect, useState } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { Text, Heading, Input, Button, Flex} from '@pancakeswap-libs/uikit'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import GhostShibaVIP from './components/GhostShibaVIP'


const GhostShibaCollectibles: React.FC = () => {
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const { path } = useRouteMatch()

  // /!\ This function will be removed soon
  // This function compute the APY for each battlefield and will be replaced when we have a reliable API
  // to retrieve assets prices against USD

  return (
    <Page>
      <div>
      <Hero><img src="https://ghostshiba.money/img/logo.png" alt="" height="120px" width="120px"/><Heading>&nbsp;&nbsp;Ghost Shiba Collectibles&nbsp;&nbsp;</Heading></Hero>
      <FlexLayout>
        <Route exact path={`${path}`}>
          <GhostShibaVIP account={account} ethereum={ethereum} />
        </Route>
        </FlexLayout>
      </div> 
    </Page>
  )
}

const Hero = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  justify-content: center;
  padding: 24px 0;
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    font-size: 16px;
    li {
      margin-bottom: 4px;
    }
  }
`

export default GhostShibaCollectibles
