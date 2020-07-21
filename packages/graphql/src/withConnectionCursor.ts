import { Model } from 'mongoose';
import { ConnectionArguments } from 'graphql-relay';
import { connectionFromMongoCursor } from '@entria/graphql-mongoose-loader';
import { GraphQLArgFilter } from '@entria/graphql-mongo-helpers';

import { Load, GraphQLContext } from './types';

type FnOutput = {
  conditions: object;
  sort: object;
};

type ConnectionArgsAndFilter = ConnectionArguments & GraphQLArgFilter;

export const withConnectionCursor = (
  model: Model<any>,
  load: Load,
  fn: (context: GraphQLContext, args: ConnectionArgsAndFilter) => FnOutput,
) => {
  return (context: GraphQLContext, args: ConnectionArgsAndFilter) => {
    const { conditions, sort } = fn(context, args);
    const documentQuery = model.find(conditions).sort(sort);

    return connectionFromMongoCursor({
      cursor: documentQuery,
      context,
      args,
      loader: load,
    });
  };
};
