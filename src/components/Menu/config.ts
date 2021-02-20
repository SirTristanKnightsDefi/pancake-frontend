import { MenuEntry } from '@pancakeswap-libs/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Exchange',
        href: 'https://exchange-milkswap.netlify.app/',
      },
      {
        label: 'Liquidity',
        href: 'https://exchange-milkswap.netlify.app//#/pool',
      },
    ],
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: 'Pools',
    icon: 'PoolIcon',
    href: '/pools',
  },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Github',
        // TODO: Change this link
        href: 'https://github.com/pancakeswap',
      },
      {
        label: 'Blog',
        // TODO: Change this link
        href: 'https://pancakeswap.medium.com',
      },
    ],
  },
]

export default config
