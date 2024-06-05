'use client'

import { useState, useEffect } from 'react';
import { BigNumber, ethers } from 'ethers';
import { useConnectWallet } from '@web3-onboard/react';
import { getSuggestedFees } from '@/lib/across-api';
import { ChainId } from '@/types';
import { 
  WethContracts, 
  SpokePoolsContracts,
  spokePoolAbi,
  handlerContractChainId,
  handlerContract
} from '@/constants';

const AcrossPlusComponent = () => {
  const [{ wallet }] = useConnectWallet();
  const [loading, setLoading] = useState(false);
  const [originChainId, setOriginChainId] = useState<ChainId>();
  const [inputToken, setInputToken] = useState<string>();
  const [spokePoolAddress, setSpokePoolAddress] = useState<string>();

  useEffect(() => {
    if (wallet) {
      const provider = new ethers.providers.Web3Provider(wallet.provider);
      provider.getNetwork().then((network) => {
        const chainId = network.chainId as ChainId;
        setOriginChainId(chainId);
        setInputToken(WethContracts[chainId]);
        setSpokePoolAddress(SpokePoolsContracts[chainId]);
        console.log(SpokePoolsContracts[chainId]);
      });
    }
  }, [wallet]);

  const handleDeposit = async () => {
    if (wallet === null) {
      alert("Please connect your wallet.");
      return;
    }
    if (originChainId === undefined || spokePoolAddress === undefined) {
      alert("Unable to determine network.");
      return;
    }
    if (inputToken === undefined) {
      alert("Unable to determine input token.");
      return;
    }
    if (spokePoolAddress === undefined) {
      alert("Unable to determine spoke pool address.");
      return;
    }
    const provider = new ethers.providers.Web3Provider(wallet.provider);
    const signer = provider.getSigner();


    try {
      setLoading(true);

      // Getting a Quote
      const feeData = await getSuggestedFees({
        originChainId,
        inputToken,
        outputToken: WethContracts[10],
        destinationChainId: handlerContractChainId,
        amount: 1000000000000000,
      });
      const totalRelayFee = feeData.totalRelayFee.total;

      // Crafting the message
      const abiCoder = new ethers.utils.AbiCoder();
      const encodedMessage = abiCoder.encode(["address"], [wallet.accounts[0].address]);

      // Creating the Deposit
      const spokePoolContract = new ethers.Contract(spokePoolAddress, spokePoolAbi, signer);

      const tx = await spokePoolContract.depositV3(
        wallet.accounts[0].address,                   // depositor
        handlerContract,                              // recipient
        inputToken,                                   // inputToken
        "0x0000000000000000000000000000000000000000", // outputToken
        BigNumber.from(totalRelayFee),                // inputAmount
        BigNumber.from("0"),                          // outputAmount
        handlerContractChainId,                       // destinationChainId
        ethers.constants.AddressZero,                 // exclusiveRelayer
        Math.floor(Date.now() / 1000),                // quoteTimestamp - Current timestamp
        Math.floor(Date.now() / 1000) + 21600,        // fillDeadline - 6 hours from now
        0,                                            // exclusivityDeadline
        encodedMessage,                               // message
        {
          gasLimit: ethers.utils.hexlify(1000000),
          value: BigNumber.from(totalRelayFee)
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
      <p>Current chainId {originChainId}</p>
      <button onClick={handleDeposit} className='rounded-md bg-gray-900 border-none text-lg font-semibold cursor-pointer text-white px-3.5 py-3 mt-10'>
        {loading ? 'Processing...' : 'Send Message'}
      </button>
    </div>
  );
};

export default AcrossPlusComponent;
