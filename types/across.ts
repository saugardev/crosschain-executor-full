export type ChainId = 1 | 10 | 137 | 324 | 8453 | 42161 | 59144 | 84532 | 421614 | 11155420 | 11155111;

/**
 * Interface for Suggested Fees Request
 */
export interface SuggestedFeesRequest {
  /**
   * Address of the token to bridge. For native ETH, use the wrapped address, e.g., WETH.
   */
  token?: string;

  /**
   * Address of the token to bridge on the origin chain. Must be used together with `outputToken`.
   */
  inputToken: string;

  /**
   * Address of the token to bridge on the destination chain. Must be used together with `inputToken`.
   */
  outputToken: string;

  /**
   * Chain ID where the specified token or inputToken exists.
   */
  originChainId: ChainId;

  /**
   * Desired destination chain ID of the bridge transfer.
   */
  destinationChainId: ChainId;

  /**
   * Amount of the token to transfer in the native decimals of the token.
   */
  amount: number;

  /**
   * Recipient of the deposit. Can be an EOA or a contract. If this is an EOA and message is defined, the API will throw a 4xx error.
   */
  recipient?: string;

  /**
   * Calldata passed to the recipient if the recipient is a contract address.
   */
  message?: string;

  /**
   * Optionally override the relayer address used to simulate the fillRelay() call that estimates the gas costs needed to fill a deposit.
   */
  relayer?: string;

  /**
   * The quote timestamp used to compute the LP fees. This timestamp must be close to the current time on the chain where the user is depositing funds.
   */
  timestamp?: number;
}

/**
 * Interface for Suggested Fees Response
 */
export interface SuggestedFeesResponse {
  /**
   * Total relay fee details.
   */
  totalRelayFee: FeeDetail;

  /**
   * Relayer capital fee details.
   */
  relayerCapitalFee: FeeDetail;

  /**
   * Relayer gas fee details.
   */
  relayerGasFee: FeeDetail;

  /**
   * LP fee details.
   */
  lpFee: FeeDetail;

  /**
   * The quote timestamp that was used to compute the lpFeePct.
   */
  timestamp: string;

  /**
   * Indicates if the input amount is below the minimum transfer amount.
   */
  isAmountTooLow: boolean;

  /**
   * The block used associated with this quote, used to compute lpFeePct.
   */
  quoteBlock: string;

  /**
   * The contract address of the origin SpokePool.
   */
  spokePoolAddress: string;
}

/**
 * Interface for Fee Detail
 */
interface FeeDetail {
  /**
   * The percentage of the transfer amount for the fee.
   * Note: 1% is represented as 1e16, 100% is 1e18, 50% is 5e17, etc.
   */
  pct: string;

  /**
   * The total amount of the fee.
   */
  total: string;
}

/**
 * Interface for Transfer Limits Request
 */
export interface TransferLimitsRequest {
  /**
   * Address of the token to bridge. For native ETH, use the wrapped address, e.g., WETH.
   */
  token?: string;

  /**
   * Address of token to bridge on the origin chain. Must be used together with `outputToken`.
   */
  inputToken?: string;

  /**
   * Address of token to bridge on the destination chain. Must be used together with `inputToken`.
   */
  outputToken?: string;

  /**
   * Chain ID where the specified token or inputToken exists.
   * Example values: 1, 10, 137, 324, 8453, 42161, 59144, 84532, 421614, 11155420, 11155111.
   */
  originChainId: ChainId;

  /**
   * Intended destination chain ID of the bridge transfer.
   * Example values: 1, 10, 137, 324, 8453, 42161, 59144, 84532, 421614, 11155420, 11155111.
   */
  destinationChainId: ChainId;
}

/**
 * Interface for Transfer Limits Response
 */
export interface TransferLimitsResponse {
  /**
   * The minimum deposit size in the tokens' units.
   * Note: USDC has 6 decimals, so this value would be the number of USDC multiplied by 1e6. For WETH, that would be 1e18.
   */
  minDeposit: string;

  /**
   * The maximum deposit size in the tokens' units.
   * Note: The formatting of this number is the same as minDeposit.
   */
  maxDeposit: string;

  /**
   * The max deposit size that can be relayed "instantly" on the destination chain.
   * Instantly means that there is relayer capital readily available and that a relayer is expected to relay within seconds to 5 minutes of the deposit.
   */
  maxDepositInstant: string;

  /**
   * The max deposit size that can be relayed with a "short delay" on the destination chain.
   * This means that there is relayer capital available on mainnet and that a relayer will immediately begin moving that capital over the canonical bridge to relay the deposit.
   */
  maxDepositShortDelay: string;

  /**
   * The recommended deposit size that can be relayed "instantly" on the destination chain.
   * Instantly means that there is relayer capital readily available and that a relayer is expected to relay within seconds to 5 minutes of the deposit. Value is in the smallest unit of the respective token.
   */
  recommendedDepositInstant: string;
}

/**
 * Interface for Available Routes Request
 */
export interface AvailableRoutesRequest {
  /**
   * Chain ID of the originating chain.
   * Example values: 1, 10, 137, 324, 8453, 42161, 59144, 84532, 421614, 11155420, 11155111.
   */
  originChainId: ChainId;

  /**
   * Chain ID of the destination chain.
   * Example values: 1, 10, 137, 324, 8453, 42161, 59144, 84532, 421614, 11155420, 11155111.
   */
  destinationChainId: ChainId;

  /**
   * Origin chain address of token contract to transfer.
   * Example: 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2.
   */
  originToken: string;

  /**
   * Destination chain address of token contract to receive.
   * Example: 0x4200000000000000000000000000000000000006.
   */
  destinationToken: string;
}

/**
 * Interface for Available Routes Response
 */
export interface AvailableRoutesResponse {
  /**
   * Array of route details.
   */
  routes: Route[];
}

/**
 * Interface for Route Detail
 */
interface Route {
  /**
   * Chain ID of the originating chain.
   */
  originChainId: string;

  /**
   * Chain ID of the destination chain.
   */
  destinationChainId: string;

  /**
   * Origin chain address of token contract to transfer.
   */
  originToken: string;

  /**
   * Destination chain address of token contract to receive.
   */
  destinationToken: string;
}
