import React from 'react';
import { NextPage } from 'next';
import { DocumentContext } from 'next/document';
import { GraphQLTaggedNode, Variables, fetchQuery } from 'react-relay';
import { RelayEnvironmentProvider } from 'react-relay/hooks';

import { initEnvironment } from './createEnvironment';

type OptionsWithData = {
  query: GraphQLTaggedNode;
  variables: Variables;
};

const withData = (ComposedComponent: NextPage, options: OptionsWithData) => {
  const WrappedComponent = ({ records, environment }) => {
    const relayEnvironment = typeof window === 'undefined' ? environment : initEnvironment(records);

    return (
      <RelayEnvironmentProvider environment={relayEnvironment}>
        <ComposedComponent />
      </RelayEnvironmentProvider>
    );
  };

  WrappedComponent.getInitialProps = async (context: DocumentContext) => {
    const isServer = !!context.req;
    let composedInitalProps = {};

    if (ComposedComponent.getInitialProps) {
      composedInitalProps = await ComposedComponent.getInitialProps(context);
    }

    if (!isServer) {
      return {
        ...composedInitalProps,
        environment: null,
      };
    }

    const environment = initEnvironment();
    const { query, variables } = options;

    if (query) {
      // fetch queries on server and the hooks like `useLazyLoad` can fetch data directly
      // from the store
      await fetchQuery(environment, query, variables);

      // fetchQuery(environment, query, variables).subscribe({
      //   start: (observer) => console.log('start query.. ', observer),
      //   complete: () => console.log('complete query.. '),
      //   error: () => console.log('error query.. '),
      // });
    }

    const records = environment.getStore().getSource().toJSON();
    // eslint-disable-next-line
    console.log('records: ', records);

    return {
      ...composedInitalProps,
      records,
      environment,
    };
  };

  return WrappedComponent;
};

export default withData;
