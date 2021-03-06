import { MenuEntry } from '@pancakeswap-libs/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: '/#/farms',
  },
  {
    label: 'Pools',
    icon: 'PoolIcon',
    href: '#//pools',
  },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Blog',
        href: 'https://knightsoftheroundtable-bsc.medium.com/',
      },
    ],
  },
]

export default config
