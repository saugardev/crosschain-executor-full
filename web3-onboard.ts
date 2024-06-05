import injectedModule from '@web3-onboard/injected-wallets'

import { init } from '@web3-onboard/react'

const injected = injectedModule();

export default init({
  wallets: [
    injected
  ],
  chains: [
    {
      id: 1,
      namespace: 'evm',
      token: 'ETH',
      label: 'Ethereum',
      rpcUrl: `https://eth.llamarpc.com`
    },
    {
      id: 10,
      token: 'ETH',
      label: 'Optimism',
      rpcUrl: `https://optimism-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`
    },
    {
      id: 137,
      token: 'MATIC',
      label: 'Polygon',
      rpcUrl: 'https://matic-mainnet.chainstacklabs.com'
    },
    {
      id: 324,
      token: 'ETH',
      label: 'zkSync',
      rpcUrl: 'https://zksync-era.blockpi.network/v1/rpc/public'
    },
    {
      id: 8453,
      token: 'ETH',
      label: 'Base',
      rpcUrl: 'https://base.llamarpc.com'
    },
    {
      id: 42161,
      token: 'ETH',
      label: 'Arbitrum One',
      rpcUrl: `https://arbitrum-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`
    },
    {
      id: 59144,
      token: 'ETH',
      label: 'Linea',
      rpcUrl: 'https://linea.blockpi.network/v1/rpc/public'
    },
  ],
  appMetadata: {
    name: 'Crosschain Executor',
    icon: '<svg></svg>',
    logo: '<svg></svg>',
    description: 'Demo app for Across+',
    gettingStartedGuide: 'https://github.com/saugardev/crosschain-executor/blob/main/README.md',
    explore: 'https://github.com/saugardev/crosschain-executor',
    recommendedInjectedWallets: [
      {
        name: 'MetaMask',
        url: 'https://metamask.io'
      },
    ],
  }
})
