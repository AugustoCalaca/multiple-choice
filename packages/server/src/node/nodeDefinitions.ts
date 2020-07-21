import { nodeDefinitions } from 'graphql-relay';
import { idFetcher, typeResolver } from '@multiple-choice/graphql';

export const { nodeField, nodesField, nodeInterface } = nodeDefinitions(idFetcher, typeResolver);
