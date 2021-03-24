import BigNumber from 'bignumber.js'
import erc20 from 'config/abi/erc20.json'
import battlefieldABI from 'config/abi/battlefield.json'
import multicall from 'utils/multicall'
import { getAddress, getBattlefieldAddress } from 'utils/addressHelpers'
import battlefieldConfig from 'config/constants/battlefield'

const fetchBattlefield = async () => {
  const data = await Promise.all(
    battlefieldConfig.map(async (bfConfig) => {
      const lpAddress = getAddress(bfConfig.lpAddresses)
      const calls = [
        // Balance of token in the LP contract
        {
          address: getAddress(bfConfig.tokenAddresses),
          name: 'balanceOf',
          params: [lpAddress],
        },
        // Balance of quote token on LP contract
        {
          address: getAddress(bfConfig.quoteTokenAdresses),
          name: 'balanceOf',
          params: [lpAddress],
        },
        // Balance of LP tokens in the master chef contract
        {
          address: lpAddress,
          name: 'balanceOf',
          params: [getBattlefieldAddress()],
        },
        // Total supply of LP tokens
        {
          address: lpAddress,
          name: 'totalSupply',
        },
        // Token decimals
        {
          address: getAddress(bfConfig.tokenAddresses),
          name: 'decimals',
        },
        // Quote token decimals
        {
          address: getAddress(bfConfig.quoteTokenAdresses),
          name: 'decimals',
        },
      ]

      const [
        tokenBalanceLP,
        quoteTokenBlanceLP,
        lpTokenBalanceMC,
        lpTotalSupply,
        tokenDecimals,
        quoteTokenDecimals,
      ] = await multicall(erc20, calls)

      // Ratio in % a LP tokens that are in staking, vs the total number in circulation
      const lpTokenRatio = new BigNumber(lpTokenBalanceMC).div(new BigNumber(lpTotalSupply))

      // Total value in staking in quote token value
      const lpTotalInQuoteToken = new BigNumber(quoteTokenBlanceLP)
        .div(new BigNumber(10).pow(18))
        .times(new BigNumber(2))
        .times(lpTokenRatio)


      // Amount of token in the LP that are considered staking (i.e amount of token * lp ratio)
      const tokenAmount = new BigNumber(tokenBalanceLP).div(new BigNumber(10).pow(tokenDecimals)).times(lpTokenRatio)
      const quoteTokenAmount = new BigNumber(quoteTokenBlanceLP)
        .div(new BigNumber(10).pow(quoteTokenDecimals))
        .times(lpTokenRatio)

      const [info, totalArmyStrength] = await multicall(battlefieldABI, [
        {
          address: getBattlefieldAddress(),
          name: 'stakingTokens',
          params: [bfConfig.pid],
        },
        {
          address: getBattlefieldAddress(),
          name: 'getTotalArmyStrength',
        },
      ])
      
      return {
        ...bfConfig,
        tokenAmount: tokenAmount.toJSON(),
        quoteTokenAmount: quoteTokenAmount.toJSON(),
        lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
        tokenPriceVsQuote: quoteTokenAmount.div(tokenAmount).toJSON(),
        totalArmyStrength: new BigNumber(new BigNumber(totalArmyStrength).div(1e18).toFixed(2)).toJSON()
      }
    }),
  )
  return data
}

export default fetchBattlefield
