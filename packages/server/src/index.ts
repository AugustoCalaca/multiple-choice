import 'core-js';
import { createServer } from 'http';

import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import { PORT } from './common/config';
import { connectDatabase } from './common/database';

import app from './app';
import { getContext } from './getContext';
import { schema } from './schema/schema';

const runServer = async () => {
  try {
    // eslint-disable-next-line no-console
    console.log('[WAIT] - Connecting to database...');
    await connectDatabase();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[SHIT] - Could not connect to database', { error });
    throw error;
  }

  const server = createServer(app.callback());

  server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.info(`[\\o/] - Server started on port: ${PORT}`);
  });

  SubscriptionServer.create(
    {
      onConnect: async () => {
        // eslint-disable-next-line no-console
        console.info('[INFO] - Client subscription connected');

        return getContext();
      },
      // eslint-disable-next-line no-console
      onDisconnect: () => console.info('[INFO] - Client subscription disconnected'),
      execute,
      subscribe,
      schema,
    },
    {
      server,
      path: '/subscriptions',
    },
  );
};

export const viteNodeApp = app;

(async () => {
  // eslint-disable-next-line no-console
  console.log('[WAIT] - Server starting...');
  await runServer();
})();
