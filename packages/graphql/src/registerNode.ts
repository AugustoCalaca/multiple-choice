import { fromGlobalId } from 'graphql-relay';

import { GraphQLContext } from './types';
import { getTypesLoaders } from './registerTypeLoader';

const typesLoaders = getTypesLoaders();
// How to return an object given its globalId
// Is used to take the ID argument of the node field and use it to resolve an object
export const idFetcher = async (globalId: string, context: GraphQLContext) => {
  const { type, id } = fromGlobalId(globalId);
  const data = await typesLoaders[type].load(context, id);

  return data;
};

// How to return a type given an object
// Allows your GraphQL server to work out which type of object was returned
export const typeResolver = (object) => typesLoaders[object.constructor.name].type || null;
