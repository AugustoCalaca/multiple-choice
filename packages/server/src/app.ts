import 'isomorphic-fetch';
import koaPlayground from 'graphql-playground-middleware-koa';
import { print, DocumentNode } from 'graphql/language';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import convert from 'koa-convert';
import cors from 'koa-cors';
import graphqlHttp, { OptionsData } from 'koa-graphql';
import koaLogger from 'koa-logger';
import Router from '@koa/router';
import { getDataloaders, GraphQLContext, KoaContextExt } from '@multiple-choice/graphql';

import { schema } from './schema/schema';
import { DEBUG_GRAPHQL } from './common/config';

const app = new Koa<any, KoaContextExt>();
const router = new Router<any, KoaContextExt>();

if (process.env.NODE_ENV === 'production') {
  app.proxy = true;
}

app.use(bodyParser());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('[ERROR] - Koa error:', err);
    ctx.status = err.status || 500;
    ctx.app.emit('error', err, ctx);
  }
});

app.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.error('[SHIT] - Error while answering request', { error: err });
});

if (process.env.NODE_ENV !== 'test') {
  app.use(koaLogger());
}

app.use(convert(cors({ maxAge: 86400, origin: '*' })));

router.get('/healthz', async (ctx) => {
  try {
    ctx.body = 'Database working';
    ctx.status = 200;
  } catch (err) {
    ctx.body = err.toString();
    ctx.status = 400;
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(async (ctx, next) => {
    const { request } = ctx;
    const { operationName } = request.body;
    if (operationName === 'IntrospectionQuery') {
      ctx.status = 400;

      // eslint-disable-next-line
      console.log('IntrospectionQuery:', request.headers, request.body);
      ctx.body = {
        data: null,
        errors: [
          {
            message: null,
            severity: 'ERROR',
          },
        ],
      };
      return;
    }
    await next();
  });
}

// Middleware to get dataloaders
app.use((ctx, next) => {
  ctx.dataloaders = getDataloaders();
  return next();
});

function hasIntrospectionQuery(document: DocumentNode) {
  if (document.definitions.length === 0) {
    return false;
  }
  const definition = document.definitions[0];
  if (definition.kind !== 'OperationDefinition') {
    return false;
  }
  return definition.name && definition.name.value === 'IntrospectionQuery';
}

const graphqlSettingsPerReq = async (request, ctx, koaContext: unknown): Promise<OptionsData> => {
  const { dataloaders } = koaContext as KoaContextExt;

  return {
    graphiql: process.env.NODE_ENV === 'development',
    schema,
    rootValue: {
      request: ctx.req,
    },
    context: {
      dataloaders,
      koaContext,
    } as GraphQLContext,
    extensions: ({ document, variables, result }) => {
      if (process.env.NODE_ENV === 'development' && DEBUG_GRAPHQL) {
        if (document && !hasIntrospectionQuery(document)) {
          // eslint-disable-next-line no-console
          console.log(print(document));
          // eslint-disable-next-line no-console
          console.log(variables);
          // eslint-disable-next-line no-console
          console.log(JSON.stringify(result, null, 2));
        }
      }

      return null as any;
    },
    formatError: (error: any) => {
      if (error.path || error.name !== 'GraphQLError') {
        // eslint-disable-next-line no-console
        console.error(error);
      } else {
        // eslint-disable-next-line no-console
        console.log(`GraphQLWrongQuery: ${error.message}`);
      }

      if (error.name && error.name === 'BadRequestError') {
        ctx.status = 400;
        ctx.body = 'Bad Request';
        return {
          message: 'Bad Request',
        };
      }

      // eslint-disable-next-line no-console
      console.error('GraphQL Error', { error });

      return {
        message: error.message,
        locations: error.locations,
        stack: error.stack,
      };
    },
  };
};

const graphqlServer = graphqlHttp(graphqlSettingsPerReq);

router.all('/graphql', convert(graphqlServer));

if (process.env.NODE_ENV !== 'production') {
  router.all(
    '/playground',
    koaPlayground({
      endpoint: '/graphql',
      subscriptionEndpoint: '/subscriptions',
    }),
  );
}

app.use(router.routes()).use(router.allowedMethods());

export default app;
