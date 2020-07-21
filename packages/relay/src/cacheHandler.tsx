import { QueryResponseCache, FetchFunction } from 'relay-runtime';

import fetchQuery from './fetchQuery';
import { forceFetch, isMutation, isQuery } from './helpers';

const oneMinute = 60 * 1000;
export const relayResponseCache = new QueryResponseCache({ size: 250, ttl: oneMinute });

export const cacheHandler: FetchFunction = async (request, variables, cacheConfig, uploadables) => {
  const queryID = request.text ? request.text : '';

  if (isMutation(request)) {
    relayResponseCache.clear();
    return fetchQuery(request, variables, uploadables);
  }

  const fromCache = relayResponseCache.get(queryID, variables);
  if (isQuery(request) && fromCache !== null && !forceFetch(cacheConfig)) {
    return fromCache;
  }

  const fromServer = await fetchQuery(request, variables, uploadables);
  if (fromServer) {
    relayResponseCache.set(queryID, variables, fromServer);
  }

  return fromServer;
};
