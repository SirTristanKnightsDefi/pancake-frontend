import { MenuEntry } from '@pancakeswap-libs/uikit'


const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Buy Tokens',
    icon: 'InfoIcon',
    items: [
      {
        label: 'Buy SHILLING',
        href: 'https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x643B6ef6306417A0b3FA2813eb5BAf30F5dd8736',
      },
      {
        label: 'Buy SQUIRE',
        href: 'https://exchange.alchemistdefi.com/#/swap?outputCurrency=0x2F0D21f1B84F03fB9D60004fc206C86Be6902a32',
      },
      {
        label: 'Buy KNIGHT',
        href: 'https://exchange.alchemistdefi.com/#/swap?outputCurrency=0x16C0e0936E1B38Ff1F9b8a1e75d8ba29aDf87d30',
      },  
      {
        label: 'Buy LEGEND',
        href: 'https://exchange.alchemistdefi.com/#/swap?outputCurrency=0xDc661984735b535210CB1f52f86cc58616024192',
      },
      {
        label: 'Buy TABLE',
        href: 'https://exchange.alchemistdefi.com/#/swap?outputCurrency=0xf5a2f7418035ce76967f515f39d65719bb0453b6',
      },
    ],
  },
  {
    label: "Trade",
    icon: "TradeIcon",
    items: [
      {
        label: "Liquidity (PCS V1)",
        href: "https://exchange.alchemistdefi.com/#/pool",
      },
      {
        label: "Liquidity (PCS V2)",
        href: "https://exchange.pancakeswap.finance/#/pool",
      },
    ],
  },
  {
    label: 'Battlefield',
    icon: 'GroupsIcon',
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
    label: 'King\'s Chance',
    icon: 'TicketIcon',
    href: '/lottery',
  },
  {
    label: 'The Queen\'s Gallery',
    icon: 'NftIcon',
    href: '/nft',
  },
  
  {
    label: 'Contracts / Charts',
    icon: 'InfoIcon',
    items: [
      {
        label: 'SHILLING Contract',
        href: 'https://bscscan.com/address/0x643b6ef6306417a0b3fa2813eb5baf30f5dd8736',
      },
      {
        label: 'SHILLING Chart',
        href: 'https://poocoin.app/tokens/0x643b6ef6306417a0b3fa2813eb5baf30f5dd8736',
      },
      {
        label: 'SQUIRE Contract',
        href: 'https://bscscan.com/address/0x2F0D21f1B84F03fB9D60004fc206C86Be6902a32',
      },
      {
        label: 'SQUIRE Chart',
        href: 'https://poocoin.app/tokens/0x2F0D21f1B84F03fB9D60004fc206C86Be6902a32',
      },
      {
        label: 'KNIGHT Contract',
        href: 'https://bscscan.com/address/0x16c0e0936e1b38ff1f9b8a1e75d8ba29adf87d30',
      },
      {
        label: 'KNIGHT Chart',
        href: 'https://poocoin.app/tokens/0x16C0e0936E1B38Ff1F9b8a1e75d8ba29aDf87d30',
      },
      {
        label: 'LEGEND Contract',
        href: 'https://bscscan.com/address/0xDc661984735b535210CB1f52f86cc58616024192',
      },
      {
        label: 'LEGEND Chart',
        href: 'https://poocoin.app/tokens/0xDc661984735b535210CB1f52f86cc58616024192',
      },
      {
        label: 'TABLE Contract',
        href: 'https://bscscan.com/address/0xf5a2f7418035ce76967f515f39d65719bb0453b6',
      },
      {
        label: 'TABLE Chart',
        href: 'https://poocoin.app/tokens/0xf5a2f7418035ce76967f515f39d65719bb0453b6',
      },
    ],
  },
  {
    label: 'Learn More',
    icon: 'RoadmapIcon',
    items: [
      {
        label: 'Blog',
        href: 'https://knightsoftheroundtable-bsc.medium.com/',
      },
      {
        label: 'Roadmap and Documentation',
        href: 'https://docs.knightsdefi.com/',
      },
      {
        label: 'Reddit',
        href: 'https://www.reddit.com/r/KnightsDeFi',
      },
      {
        label: 'Vfat Tools',
        href: 'https://vfat.tools/bsc/knight/',
      },
    ],
  },
  {
    label: 'Audit',
    icon: 'AuditIcon',
    items: [
      {
        label: 'TechRate (LEGEND, TABLE, KNIGHT)',
        href: 'https://www.knightsdefi.com/Knights%20Defi%20TechRate%20Audit.pdf',
      },
      {
        label: 'TechRate (SHILLING)',
        href: 'https://github.com/TechRate/Smart-Contract-Audits/blob/main/Shilling%20Token%20Token%20Smart%20Contract%20Security%20Audit.pdf'
      }
    ],
  },
]

export default config
