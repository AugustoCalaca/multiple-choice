import { Context } from 'koa';
import DataLoader from 'dataloader';
import { Types } from 'mongoose';

export type DataLoaderKey = string | Types.ObjectId | object;

export type GraphQLDataLoaders = {
  [loader: string]: DataLoader<string, any>;
};

export type Load = (context: GraphQLContext, id: DataLoaderKey) => any;
export type GetLoader = () => DataLoader<string, any>;

export type GraphQLContext = {
  dataloaders: GraphQLDataLoaders;
  koaContext: Context;
};

export type KoaContextExt = {
  dataloaders: GraphQLDataLoaders;
};
