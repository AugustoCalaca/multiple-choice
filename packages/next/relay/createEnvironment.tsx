import { Network, Store, RecordSource, Environment } from 'relay-runtime';
import { cacheHandler } from '@multiple-choice/relay';

let relayEnvironment: Environment;

const createEnvironment = (records) => {
  const network = Network.create(cacheHandler);
  const source = new RecordSource(records);
  const store = new Store(source, {
    // This property tells Relay to not immediately clear its cache when the user
    // navigates around the app. Relay will hold onto the specified number of
    // query results, allowing the user to return to recently visited pages
    // and reusing cached data if its available/fresh.
    gcReleaseBufferSize: 10,
  });

  const environment = new Environment({
    network,
    store,
  });

  return environment;
};

type InitProps = {
  records?: any;
};

export const initEnvironment = (options: InitProps = {}) => {
  const { records = {} } = options;

  // for SSG and SSR always create a new Relay environment
  // make sure to create a new Relay environment for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return createEnvironment(records);
  }

  // reuse Relay environment on client-side
  if (!relayEnvironment) {
    relayEnvironment = createEnvironment(records);
  }

  return relayEnvironment;
};
