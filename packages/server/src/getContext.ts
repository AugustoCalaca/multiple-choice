import { getDataloaders, GraphQLContext } from '@multiple-choice/graphql';

export const getContext = (context: object = {}): GraphQLContext => {
  const dataloaders = getDataloaders();

  return {
    ...context,
    dataloaders,
    req: {},
  };
};
