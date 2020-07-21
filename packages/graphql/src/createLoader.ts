import DataLoader from 'dataloader';
import { Model, Document } from 'mongoose';
import { mongooseLoader } from '@entria/graphql-mongoose-loader';
import { buildMongoConditionsFromFilters, FilterFieldMapping } from '@entria/graphql-mongo-helpers';

import { GraphQLContext, DataLoaderKey } from './types';
import { withConnectionCursor } from './withConnectionCursor';

type CreateLoaderArgs<TModel extends Document> = {
  loaderName: string;
  model: Model<TModel>;
  filterMapping?: { [key: string]: FilterFieldMapping<any> };
  viewerCanSee?: (context: GraphQLContext, data: TModel) => TModel | null;
};

const defaulViewerCanSee = (_ /* context */, data) => {
  const canSee = {
    ...data,
  };

  return canSee;
};

export const createLoader = <TModel extends Document>({
  loaderName,
  model,
  filterMapping = {},
  viewerCanSee = defaulViewerCanSee,
}: CreateLoaderArgs<TModel>) => {
  class Loader {
    id: string;

    constructor(data: TModel) {
      Object.keys(data).map((key) => {
        this[key] = data[key];
      });

      this.id = data._id;
    }
  }

  const nameIt = (name) =>
    ({
      [name]: class extends Loader {},
    }[name]);

  const Wrapper = nameIt(model.collection.name);

  const getLoader = () => new DataLoader<string, TModel>((ids) => mongooseLoader(model, ids));

  const load = async (context: GraphQLContext, id: DataLoaderKey) => {
    if (!id) return null;

    try {
      const data = await context.dataloaders[loaderName].load(id.toString());

      if (!data) return null;

      const canSee = viewerCanSee(context, data);
      if (!canSee) return null;

      return new Wrapper(canSee);
    } catch (err) {
      return null;
    }
  };

  const clearCache = ({ dataloaders }: GraphQLContext, id: string) => dataloaders[loaderName].clear(id.toString());

  const loadAll = withConnectionCursor(model, load, (context, args) => {
    const buildConditions = buildMongoConditionsFromFilters(context, args.filter, filterMapping);

    const conditions = {
      ...buildConditions.conditions,
    };

    const sort = {
      createdAt: -1,
    };

    return {
      conditions,
      sort,
    };
  });

  return {
    Wrapper,
    getLoader,
    clearCache,
    load,
    loadAll,
  };
};
