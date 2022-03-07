import { RequestParameters, UploadableMap, Variables } from 'relay-runtime';

import fetchWithRetries from './fetchWithRetries';
import { getHeaders, getRequestBody, handleData, isMutation } from './helpers';

export const PLATFORM = {
  APP: 'APP',
  WEB: 'WEB',
};

// Define a function that fetches the results of a request (query/mutation/etc)
// and returns its results as a Promise:
const fetchQuery = async (request: RequestParameters, variables: Variables, uploadables?: UploadableMap | null) => {
  try {
    const body = getRequestBody(request, variables, uploadables);
    const authorization = typeof window !== 'undefined' ? localStorage.getItem('TOKEN_KEY') : null;

    const headers = {
      appplatform: PLATFORM.WEB,
      ...getHeaders(uploadables),
      authorization,
    };

    const isMutationOperation = isMutation(request);
    const fetchFn = isMutationOperation ? fetch : fetchWithRetries;
    // @ts-ignore
    const response = await fetchFn(process.env.GRAPHQL_URL, {
      method: 'POST',
      headers,
      body,
      fetchTimeout: 20000,
      retryDelays: [1000, 3000, 5000],
    });

    const data = await handleData(response);

    if (response.status === 401) {
      throw data.errors;
    }

    if (isMutationOperation && data.errors) {
      throw data;
    }

    return data;
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.log('err:', err);

    // TODO - handle no successful response after
    const timeoutRegexp = new RegExp(/Still no successful response after/);
    const serverUnavailableRegexp = new RegExp(/Failed to fetch/);
    if (timeoutRegexp.test(err.message) || serverUnavailableRegexp.test(err.message)) {
      throw new Error('Unavailable service. Try again later.');
    }

    throw err;
  }
};

export default fetchQuery;
