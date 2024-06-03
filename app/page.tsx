'use client'

import AcrossPlusComponent from '@/components/across-plus';
import styles from '../styles/Home.module.css'

import { useConnectWallet } from '@web3-onboard/react'
import { ethers } from 'ethers'
import AcrossEventListener from '@/components/across-event-listener';

export default function Home() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  let ethersProvider;

  if (wallet) {
    ethersProvider = new ethers.providers.Web3Provider(wallet.provider, 'any');
  }
  
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        Crosschain Executor{' '}
      </h1>

      <button
        className='rounded-md bg-gray-900 border-none text-lg font-semibold cursor-pointer text-white px-3.5 py-3 mt-10'
        disabled={connecting}
        onClick={() => (wallet ? disconnect(wallet) : connect())}
      >
        {connecting ? 'Connecting' : wallet ? 'Disconnect' : 'Connect'}
      </button>
      <div className='mt-10'>
        {wallet === null ? null : <AcrossPlusComponent />}
        {/* <AcrossEventListener /> */}
      </div>
    </main>
  )
}
