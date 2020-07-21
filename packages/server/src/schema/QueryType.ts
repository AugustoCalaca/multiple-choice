import { GraphQLID, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { fromGlobalId, globalIdField } from 'graphql-relay';
import { connectionArgs, GraphQLContext } from '@multiple-choice/graphql';

import { nodeField, nodesField } from '../node/nodeDefinitions';

import MultipleChoiceType, { MultipleChoiceConnection } from '../modules/multiple-choice/MultipleChoiceType';
import * as MultipleChoiceLoader from '../modules/multiple-choice/MultipleChoiceLoader';

export default new GraphQLObjectType<any, GraphQLContext>({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    id: globalIdField('Query'),
    node: nodeField,
    nodes: nodesField,
    multipleChoice: {
      type: MultipleChoiceType,
      args: {
        id: {
          type: GraphQLNonNull(GraphQLID),
        },
      },
      resolve: (_, args, context) => {
        const { id } = fromGlobalId(args.id);
        return MultipleChoiceLoader.load(context, id);
      },
    },
    multipleChoices: {
      type: GraphQLNonNull(MultipleChoiceConnection.connectionType),
      args: {
        ...connectionArgs,
      },
      resolve: (_, args, context) => MultipleChoiceLoader.loadAll(context, args),
    },
  }),
});
