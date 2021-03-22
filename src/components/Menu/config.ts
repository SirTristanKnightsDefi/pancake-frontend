import { MenuEntry } from '@pancakeswap-libs/uikit'


const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Battlefield',
    icon: 'FarmIcon',
    href: '/Battlefield',
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
    label: 'Blog / Roadmap',
    icon: 'RoadmapIcon',
    href: 'https://knightsoftheroundtable-bsc.medium.com/',
  },
  {
    label: 'KNIGHT Info',
    icon: 'InfoIcon',
    items: [
      
      {
        label: 'KNIGHT Contract',
        href: 'https://bscscan.com/address/0x16c0e0936e1b38ff1f9b8a1e75d8ba29adf87d30',
      },
      {
        label: 'Buy KNIGHT',
        href: 'https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x16C0e0936E1B38Ff1F9b8a1e75d8ba29aDf87d30',
      },
      {
        label: 'KNIGHT Chart',
        href: 'https://goswapp-bsc.web.app/0x16C0e0936E1B38Ff1F9b8a1e75d8ba29aDf87d30',
      },
    ]
  },
  {
    label: 'TABLE Info',
    icon: 'InfoIcon',
    items: [
      {
        label: 'TABLE Contract',
        href: 'https://bscscan.com/address/0xf5a2f7418035ce76967f515f39d65719bb0453b6',
      },
      {
        label: 'Buy TABLE',
        href: 'https://exchange.pancakeswap.finance/#/swap?outputCurrency=0xf5a2f7418035ce76967f515f39d65719bb0453b6',
      },
      {
        label: 'TABLE Chart',
        href: 'https://goswapp-bsc.web.app/0xf5a2f7418035ce76967f515f39d65719bb0453b6',
      },
    ],
  },
  {
    label: 'LEGEND Info',
    icon: 'InfoIcon',
    items: [
      {
        label: 'LEGEND Contract',
        href: 'https://bscscan.com/address/0xDc661984735b535210CB1f52f86cc58616024192',
      },
      {
        label: 'Buy LEGEND',
        href: 'https://exchange.pancakeswap.finance/#/swap?outputCurrency=0xDc661984735b535210CB1f52f86cc58616024192',
      },
      {
        label: 'LEGEND Chart',
        href: 'https://goswapp-bsc.web.app/0xDc661984735b535210CB1f52f86cc58616024192',
      },
    ],
  },
  {
    label: 'Audit',
    icon: 'AuditIcon',
    items: [
      {
        label: 'TechRate',
        href: 'https://www.knightsdefi.com/Knights%20Defi%20TechRate%20Audit.pdf',
      },
    ],
  },
]

export default config
