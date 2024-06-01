import fortmaticModule from '@web3-onboard/fortmatic'
import safeModule from '@web3-onboard/gnosis'
import injectedModule from '@web3-onboard/injected-wallets'
import keepkeyModule from '@web3-onboard/keepkey'
import keystoneModule from '@web3-onboard/keystone'
import ledgerModule from '@web3-onboard/ledger'
import portisModule from '@web3-onboard/portis'
import torusModule from '@web3-onboard/torus'
import trezorModule from '@web3-onboard/trezor'
import walletConnectModule from '@web3-onboard/walletconnect'
import coinbaseModule from '@web3-onboard/coinbase'
import magicModule from '@web3-onboard/magic'
import dcentModule from '@web3-onboard/dcent'
import mewModule from '@web3-onboard/mew-wallet'
import sequenceModule from '@web3-onboard/sequence'
import tahoWalletModule from '@web3-onboard/taho'

import { init } from '@web3-onboard/react'

const injected = injectedModule({
  custom: [
    // include custom injected wallet modules here
  ],
  filter: {
    // mapping of wallet labels to filter here
  }
})

const walletLink = coinbaseModule()

const walletConnect = walletConnectModule()
const portis = portisModule({
  // Replace with your apiKey
  apiKey: 'b2b7586f-2b1e-4c30-a7fb-c2d1533b153b'
})

const fortmatic = fortmaticModule({
  // Replace with your apiKey
  apiKey: 'pk_test_886ADCAB855632AA'
})

const torus = torusModule()
const ledger = ledgerModule()
const keepkey = keepkeyModule()
const keystone = keystoneModule()
const safe = safeModule()
const dcent = dcentModule()
const mew = mewModule()
const tahoWalletSdk = tahoWalletModule() // Previously named Tally Ho wallet

const sequence = sequenceModule({
  appName: 'My app'
})

const trezorOptions = {
  email: 'test@test.com',
  appUrl: 'https://www.blocknative.com'
}
const trezor = trezorModule(trezorOptions)

const magic = magicModule({
  // Replace with your apiKey
  apiKey: 'pk_live_02207D744E81C2BA'
})

export default init({
  // An array of wallet modules that you would like to be presented to the user to select from when connecting a wallet.
  wallets: [
    injected,
    safe,
    fortmatic,
    portis,
    walletLink,
    magic,
    torus,
    ledger,
    trezor,
    walletConnect,
    keepkey,
    keystone,
    dcent,
    mew,
    tahoWalletSdk,
    sequence
  ],
  // An array of Chains that your app supports
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
      rpcUrl: `https://optimism.llamarpc.com`
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
      rpcUrl: 'https://rpc.ankr.com/arbitrum'
    },
    {
      id: 59144,
      token: 'ETH',
      label: 'Linea',
      rpcUrl: 'https://linea.blockpi.network/v1/rpc/public'
    },
  ],
  appMetadata: {
    // The name of your dApp
    name: 'Crosschain Executor',
    // SVG icon string, with height or width (whichever is larger) set to 100% or a valid image URL
    icon: '<svg></svg>',
    // Optional wide format logo (ie icon and text) to be displayed in the sidebar of connect modal. Defaults to icon if not provided
    logo: '<svg></svg>',
    // The description of your app
    description: 'Demo app for Across+',
    // The url to a getting started guide for app
    gettingStartedGuide: 'https://github.com/saugardev/crosschain-executor/blob/main/README.md',
    // url that points to more information about app
    explore: 'https://github.com/saugardev/crosschain-executor',
    // if your app only supports injected wallets and when no injected wallets detected, recommend the user to install some
    recommendedInjectedWallets: [
      {
        // display name
        name: 'MetaMask',
        // link to download wallet
        url: 'https://metamask.io'
      },
    ],
    // Optional - but allows for dapps to require users to agree to TOS and privacy policy before connecting a wallet
    agreement: {
      version: '1.0.0',
      termsUrl: 'https://www.blocknative.com/terms-conditions',
      privacyUrl: 'https://www.blocknative.com/privacy-policy'
    }
  }
  // example customising copy
  // i18n: {
  //   en: {
  //     connect: {
  //       selectingWallet: {
  //         header: 'custom text header'
  //       }
  //     }
  //   }
  // }
})
