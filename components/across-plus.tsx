import React, { useState } from 'react';
import { BigNumber, ethers } from 'ethers';
import { useConnectWallet } from '@web3-onboard/react';
import { getSuggestedFees } from '@/lib/across-api';
import { ChainId, SuggestedFeesRequest } from '@/types';

const AcrossPlusComponent = () => {
  const [{ wallet }] = useConnectWallet();
  const [loading, setLoading] = useState(false);

  const handleDeposit = async () => {
    if (wallet === null) {
      alert("Please connect your wallet");
      return;
    }
    const provider = new ethers.providers.Web3Provider(wallet.provider);
    const signer = provider.getSigner();

    const spokePoolAddress = "0xe35e9842fceaca96570b734083f4a58e8f7c5f2a";
    const destinationChainId = 10;

    const abi = [
      {
        "inputs": [
          { "internalType": "address", "name": "_logic", "type": "address" },
          { "internalType": "bytes", "name": "_data", "type": "bytes" }
        ],
        "stateMutability": "payable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          { "indexed": false, "internalType": "address", "name": "previousAdmin", "type": "address" },
          { "indexed": false, "internalType": "address", "name": "newAdmin", "type": "address" }
        ],
        "name": "AdminChanged",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          { "indexed": true, "internalType": "address", "name": "beacon", "type": "address" }
        ],
        "name": "BeaconUpgraded",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          { "indexed": true, "internalType": "address", "name": "implementation", "type": "address" }
        ],
        "name": "Upgraded",
        "type": "event"
      },
      { "stateMutability": "payable", "type": "fallback" },
      { "stateMutability": "payable", "type": "receive" },
      {
        "inputs": [
          { "internalType": "address", "name": "depositor", "type": "address" },
          { "internalType": "address", "name": "recipient", "type": "address" },
          { "internalType": "address", "name": "inputToken", "type": "address" },
          { "internalType": "address", "name": "outputToken", "type": "address" },
          { "internalType": "uint256", "name": "inputAmount", "type": "uint256" },
          { "internalType": "uint256", "name": "outputAmount", "type": "uint256" },
          { "internalType": "uint256", "name": "destinationChainId", "type": "uint256" },
          { "internalType": "address", "name": "exclusiveRelayer", "type": "address" },
          { "internalType": "uint32", "name": "quoteTimestamp", "type": "uint32" },
          { "internalType": "uint32", "name": "fillDeadline", "type": "uint32" },
          { "internalType": "uint32", "name": "exclusivityDeadline", "type": "uint32" },
          { "internalType": "bytes", "name": "message", "type": "bytes" }
        ],
        "name": "depositV3",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ];

    const tokenAbi = [
      {
        "constant": false,
        "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }],
        "name": "approve",
        "outputs": [{ "name": "success", "type": "bool" }],
        "type": "function"
      }
    ];

    try {
      setLoading(true);

      // Get the suggested fees from the Across API
      const params = {
        originChainId: 42161,
        inputToken: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1', // WETH ARB
        outputToken: '0x4200000000000000000000000000000000000006', // ETH OP
        destinationChainId: 10,
        amount: 10000000000000,
      };

      const feeData = await getSuggestedFees(params as any) ;
      const totalRelayFee = feeData.totalRelayFee.total;

      console.log(feeData, totalRelayFee);
      console.log(totalRelayFee)

      const inputAmount = BigNumber.from(totalRelayFee); // Zero USDC
      const outputAmount = "0"; // Zero USDC
      const fillDeadline = Math.floor(Date.now() / 1000) + 21600; // 6 hours from now

      const timestamp = Math.floor(Date.now() / 1000); // Current timestamp

      // Crafting the message
      const abiCoder = new ethers.utils.AbiCoder();
      const encodedMessage = abiCoder.encode(["address"], [wallet.accounts[0].address]);

      const spokePoolContract = new ethers.Contract(spokePoolAddress, abi, signer);
      const tokenContract = new ethers.Contract("0x82af49447d8a07e3bd95bd0d56f35241523fbab1", tokenAbi, signer); // WETH ARB

      // use token aproval
      const approveTx = await tokenContract.approve(spokePoolAddress, inputAmount);
      await approveTx.wait();

      // Creating the Deposit
      const tx = await spokePoolContract.depositV3(
        wallet.accounts[0].address, // depositor
        "0x87aeda878969075de0b4aab1e493bd2a22ee39dd", // recipient - MY OP contract
        "0x82af49447d8a07e3bd95bd0d56f35241523fbab1", // inputToken WETH ARB
        "0x4200000000000000000000000000000000000006", // outputToken WETH OP
        BigNumber.from(totalRelayFee), // inputAmount
        BigNumber.from(outputAmount), // outputAmount
        destinationChainId, // destinationChainId
        ethers.constants.AddressZero, // exclusiveRelayer
        timestamp, // quoteTimestamp
        fillDeadline, // fillDeadline
        0, // exclusivityDeadline
        encodedMessage, // message
        { 
          gasLimit: ethers.utils.hexlify(1000000),
        }
      );

      await tx.wait();
      alert("Transaction successful!");
    } catch (error) {
      console.error(error);
      alert("Transaction failed. Please check the console for more details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Across+ Message</h2>
      <button onClick={handleDeposit} disabled={loading}>
        {loading ? 'Processing...' : 'Send Message'}
      </button>
    </div>
  );
};

export default AcrossPlusComponent;
