import { ChainId } from "@/types";

export const WethContracts: { [key in ChainId]: string } = {
  1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // Mainnet 
  10: '0x4200000000000000000000000000000000000006', // Optimism
  137: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619', // Polygon
  324: '0x5aea5775959fbc2557cc8789bc1bf90a239d9a91', // zkSync
  8453: '0x4200000000000000000000000000000000000006', // Base
  42161: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1', // Arbitrum
  59144: '0x4200000000000000000000000000000000000006', // Linea
};

export const SpokePoolsContracts: { [key in ChainId]: string } = {
  1: '0x5c7BCd6E7De5423a257D81B442095A1a6ced35C5', // Mainnet
  10: '0x6f26Bf09B1C792e3228e5467807a900A503c0281', // Optimism
  137: '0x9295ee1d8C5b022Be115A2AD3c30C72E34e7F096', // Polygon
  324: '0xE0B015E54d54fc84a6cB9B666099c46adE9335FF', // zkSync
  8453: '0x09aea4b2242abc8bb4bb78d537a67a245a7bec64', // Base
  42161: '0xe35e9842fceaca96570b734083f4a58e8f7c5f2a', // Arbitrum - It works
  59144: '0x7e63a5f1a8f0b4d0934b2f2327daed3f6bb2ee75', // Linea
};

export const spokePoolAbi = [
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
    "stateMutability": "payable",
    "type": "function"
  }
];

export const handlerContract = "0x87aeda878969075de0b4aab1e493bd2a22ee39dd";
export const handlerContractChainId: ChainId = 10;