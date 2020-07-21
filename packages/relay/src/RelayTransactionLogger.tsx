import { OperationDescriptor, RequestParameters, Variables, GraphQLResponse } from 'relay-runtime';

export type LogEvent =
  | {
      name: 'queryresource.fetch';
      operation: OperationDescriptor;
      // FetchPolicy from relay-experimental
      fetchPolicy: string;
      // RenderPolicy from relay-experimental
      renderPolicy: string;
      hasFullQuery: boolean;
      shouldFetch: boolean;
    }
  | {
      name: 'execute.info';
      transactionID: number;
      info: any;
    }
  | {
      name: 'execute.start';
      transactionID: number;
      params: RequestParameters;
      variables: Variables;
    }
  | {
      name: 'execute.next';
      transactionID: number;
      response: GraphQLResponse;
    }
  | {
      name: 'execute.error';
      transactionID: number;
      error: Error;
    }
  | {
      name: 'execute.complete';
      transactionID: number;
    }
  | {
      name: 'execute.unsubscribe';
      transactionID: number;
    };

const unlogged: { [key: number]: LogEvent }[] = [];

// TODO - improve this caralha
export const relayTransactionLogger = (event: LogEvent) => {
  if (event.name === 'execute.start') {
    const { transactionID } = event;
    unlogged[transactionID] = [event];
    // eslint-disable-next-line no-console
    console.group('RELAY: ', unlogged[transactionID]);
    // eslint-disable-next-line no-console
    console.groupEnd();
  }
  if (event.name === 'execute.next') {
    const { transactionID } = event;
    // @ts-ignore
    unlogged[transactionID] = [...unlogged[transactionID], event];
    // eslint-disable-next-line no-console
    console.group('RELAY: ', unlogged[transactionID]);
    // eslint-disable-next-line no-console
    console.groupEnd();
  }
  if (event.name === 'execute.error' || event.name === 'execute.complete' || event.name === 'execute.unsubscribe') {
    const { transactionID } = event;
    // eslint-disable-next-line no-console
    console.group('RELAY: ', unlogged[transactionID]);
    delete unlogged[transactionID];
    // eslint-disable-next-line no-console
    console.groupEnd();
  }
};
