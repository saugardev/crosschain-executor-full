import {
  SuggestedFeesRequest,
  SuggestedFeesResponse,
  TransferLimitsRequest,
  TransferLimitsResponse,
  AvailableRoutesRequest,
  AvailableRoutesResponse,
} from '@/types';

/**
 * Helper function to construct URLs with query parameters.
 * 
 * @param baseUrl - The base URL for the API endpoint.
 * @param params - The parameters for the request.
 * @returns The constructed URL with query parameters.
 */
function constructUrl(baseUrl: string, params: Record<string, any>): URL {
  const url = new URL(baseUrl);
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined) {
      url.searchParams.append(key, String(params[key]));
    }
  });
  return url;
}

/**
 * Helper function to make an API request and handle the response.
 * 
 * @param url - The URL to fetch.
 * @returns The response data.
 */
async function fetchData<T>(url: URL): Promise<T> {
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url.pathname}: ${response.statusText}`);
  }
  return await response.json() as T;
}

/**
 * Returns suggested fees based on the token OR inputToken+outputToken, originChainId, destinationChainId, and amount.
 * 
 * @param params - The parameters for the suggested fees request.
 * @returns The suggested fees response.
 */
export async function getSuggestedFees(params: SuggestedFeesRequest): Promise<SuggestedFeesResponse> {
  const url = constructUrl('https://app.across.to/api/suggested-fees', params);
  return await fetchData<SuggestedFeesResponse>(url);
}

/**
 * Returns transfer limits for specified token OR inputToken+outputToken, originChainId, and destinationChainId.
 * 
 * @param params - The parameters for the transfer limits request.
 * @returns The transfer limits response.
 */
export async function getTransferLimits(params: TransferLimitsRequest): Promise<TransferLimitsResponse> {
  const url = constructUrl('https://app.across.to/api/limits', params);
  return await fetchData<TransferLimitsResponse>(url);
}

/**
 * Returns available routes based on specified parameters.
 * 
 * @param params - The parameters for the available routes request.
 * @returns The available routes response.
 */
export async function getAvailableRoutes(params: AvailableRoutesRequest): Promise<AvailableRoutesResponse> {
  const url = constructUrl('https://app.across.to/api/available-routes', params);
  return await fetchData<AvailableRoutesResponse>(url);
}
