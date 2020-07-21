import { GraphQLObjectType } from 'graphql';

import { Load } from './types';

type TypeLoaders = {
  [key: string]: {
    type: GraphQLObjectType;
    load: Load;
  };
};

const typesLoaders: TypeLoaders = {};
export const getTypesLoaders = () => typesLoaders;
export const registerTypeLoader = (type: GraphQLObjectType, load: Load) => {
  typesLoaders[type.name] = {
    type,
    load,
  };
  // eslint-disable-next-line
  console.log('typeloaders: ', typesLoaders);
  return type;
};
