import mongoose from 'mongoose';

export { getContext } from '../src/getContext';

process.env.NODE_ENV = 'test';

const mongooseOptions = {
  autoIndex: false,
  autoReconnect: false,
  connectTimeoutMS: 10000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
};

export * from './createResource/createRows';

export async function connectMongoose() {
  return mongoose.connect(global.__MONGO_URI__, {
    ...mongooseOptions,
  });
}

export async function clearDatabase() {
  await mongoose.connection.db.dropDatabase();
}

export async function disconnectMongoose() {
  await mongoose.disconnect();

  mongoose.connections.forEach((connection) => {
    const modelNames = Object.keys(connection.models);

    modelNames.forEach((modelName) => {
      delete connection.models[modelName];
    });

    const collectionNames = Object.keys(connection.collections);
    collectionNames.forEach((collectionName) => {
      delete connection.collections[collectionName];
    });
  });

  const modelSchemaNames = Object.keys(mongoose.modelSchemas);
  modelSchemaNames.forEach((modelSchemaName) => {
    delete mongoose.modelSchemas[modelSchemaName];
  });
}

export async function clearDbAndRestartCounters() {
  await clearDatabase();
  restartCounters();
}

export const restartCounters = () => {
  global.__COUNTERS__ = Object.keys(global.__COUNTERS__).reduce((prev, curr) => ({ ...prev, [curr]: 0 }), {});
};

export function mockFetchResponse(response: {}) {
  const mockJsonPromise = Promise.resolve(response);
  const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise,
  });

  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
}
