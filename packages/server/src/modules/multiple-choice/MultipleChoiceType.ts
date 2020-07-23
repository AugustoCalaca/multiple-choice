import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList } from 'graphql';

import { mongooseIDResolver, timestamps, connectionDefinitions, registerTypeLoader } from '@multiple-choice/graphql';

import { globalIdField } from 'graphql-relay';

import { nodeInterface } from '../../node/nodeDefinitions';

import { IMultipleChoice } from './MultipleChoiceModel';
import { load } from './MultipleChoiceLoader';

const MultipleChoiceType = new GraphQLObjectType<IMultipleChoice>({
  name: 'MultipleChoice',
  description: 'MultipleChoice data',
  fields: () => ({
    id: globalIdField('MultipleChoice'),
    ...mongooseIDResolver,
    question: {
      type: GraphQLString,
      resolve: (multipleChoice) => multipleChoice.question,
    },
    statements: {
      type: GraphQLList(GraphQLString),
      resolve: (multipleChoice) => multipleChoice.statements,
    },
    correctAnswer: {
      type: GraphQLString,
      resolve: (multipleChoice) => multipleChoice.correctAnswer,
    },
    markedAnswer: {
      type: GraphQLString,
      resolve: (multipleChoice) => multipleChoice.markedAnswer,
    },
    ...timestamps,
  }),
  interfaces: () => [nodeInterface],
});

export const MultipleChoiceConnection = connectionDefinitions({
  name: 'MultipleChoice',
  nodeType: GraphQLNonNull(MultipleChoiceType),
});

export default registerTypeLoader(MultipleChoiceType, load);
