"use client";

import web3Onboard from '@/web3-onboard'
import { Web3OnboardProvider } from '@web3-onboard/react'

export default function Web3Provider({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      {children}
    </Web3OnboardProvider>
  );
}