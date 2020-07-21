import { GetLoader, GraphQLDataLoaders } from './types';

type Dataloaders = {
  [loader: string]: GetLoader;
};

const dataloaders: Dataloaders = {};
export const registerDataLoader = (name: string, getLoader: GetLoader) => {
  dataloaders[name] = getLoader;
  // eslint-disable-next-line
  console.log('dataloaders: ', dataloaders);
};

export const getDataloaders = (): GraphQLDataLoaders =>
  Object.keys(dataloaders).reduce(
    (acc, loaderKey) => ({
      ...acc,
      [loaderKey]: dataloaders[loaderKey](),
    }),
    {},
  );
