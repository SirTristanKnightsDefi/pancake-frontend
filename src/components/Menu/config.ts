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
    href: '/farms',
  },
  {
    label: 'Pools',
    icon: 'PoolIcon',
    href: '/pools',
  },
  {
    label: 'Info',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Blog',
        href: 'https://knightsoftheroundtable-bsc.medium.com/',
      },
      {
        label: 'KNIGHT Contract',
        href: 'https://bscscan.com/address/0x16c0e0936e1b38ff1f9b8a1e75d8ba29adf87d30',
      },
      {
        label: 'TABLE Contract',
        href: 'https://bscscan.com/address/0xf5a2f7418035ce76967f515f39d65719bb0453b6',
      },
    ],
  },
]

export default config
