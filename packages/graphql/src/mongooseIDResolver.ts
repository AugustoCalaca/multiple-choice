import { GraphQLString, GraphQLNonNull } from 'graphql';

export const mongooseIDResolver = {
  _id: {
    type: GraphQLNonNull(GraphQLString),
    description: 'Mongo _id',
    resolve: obj => obj._id.toString(),
  }
};
