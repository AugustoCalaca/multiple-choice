import { graphql } from 'graphql';

import { schema } from '../schema';

describe('Schema', () => {
  it('should matches root query type and description', async () => {
    const query = `{
      __schema {
        __typename
        queryType {
          name
          description
        }
      }
    }`;

    const result = await graphql(schema, query);

    expect(result.data).toBeDefined();
    expect(result.data!.__schema.__typename).toBe('__Schema');
    expect(result.data!.__schema.queryType).toEqual({
      name: 'Query',
      description: 'The root of all... queries',
    });
  });

  it('should matches root mutation type and description', async () => {
    const query = `{
      __schema {
        __typename
        mutationType {
          name
          description
        }
      }
    }`;

    const result = await graphql(schema, query);

    expect(result.data).toBeDefined();
    expect(result.data!.__schema.__typename).toBe('__Schema');
    expect(result.data!.__schema.mutationType).toEqual({
      name: 'Mutation',
      description: 'The root of all... mutations',
    });
  });

  it('should matches types name and kind definitions', async () => {
    const query = `{
      __schema {
        types {
          name
          kind
        }
      }
    }`;

    const result = await graphql(schema, query);

    expect(result.data).toBeDefined();
    expect(result.data!.__schema.types).toBeDefined();
  });

  it('should matches query types fields', async () => {
    const query = `{
      __type(name: "Query") {
        fields {
          name
        }
      }
    }`;

    const result = await graphql(schema, query);

    expect(result.data).toBeDefined();
    expect(result.data!.__type.fields).toBeDefined();
  });

  it('should matches mutation types fields', async () => {
    const query = `{
      __type(name: "Mutation") {
        fields {
          name
        }
      }
    }`;

    const result = await graphql(schema, query);

    expect(result.data).toBeDefined();
    expect(result.data!.__type.fields).toBeDefined();
  });

  // it('should matches root subscription type and description', async () => {
  //   const query = `{
  //     __schema {
  //       __typename
  //       subscriptionType {
  //         name
  //         description
  //       }
  //     }
  //   }`;

  //   const result = await graphql(schema, query);

  //   expect(result.data).toBeDefined();
  //   expect(result.data!.__schema.__typename).toBe('__Schema');
  //   expect(result.data!.__schema.subscriptionType).toEqual({
  //     name: 'Subscription',
  //     description: 'The root of all... subscriptions',
  //   });
  // });

  // it('should matches subscription types fields', async () => {
  //   const query = `{
  //     __type(name: "Subscription") {
  //       fields {
  //         name
  //       }
  //     }
  //   }`;

  //   const result = await graphql(schema, query);

  //   expect(result.data).toBeDefined();
  //   expect(result.data!.__type.fields).toBeDefined();
  // });
});
