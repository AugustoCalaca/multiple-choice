import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';
import { GraphQLNonNull, GraphQLString, GraphQLList } from 'graphql';

import MultiplieChoiceModel from '../MultipleChoiceModel';
import { MultipleChoiceConnection } from '../MultipleChoiceType';
import * as MultipleChoiceLoader from '../MultipleChoiceLoader';

type Args = {
  question: string;
  statements: string[];
  correctAnswer: string;
};

const MultipleChoiceAddMutation = mutationWithClientMutationId({
  name: 'MultipleChoiceAdd',
  inputFields: {
    question: {
      type: GraphQLNonNull(GraphQLString),
    },
    statements: {
      type: GraphQLNonNull(GraphQLList(GraphQLString)),
    },
    correctAnswer: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
    multipleChoiceEdge: {
      type: MultipleChoiceConnection.edgeType,
      resolve: async (root, _, context) => {
        const multipleChoice = await MultipleChoiceLoader.load(context, root.id);

        if (!multipleChoice) {
          return null;
        }

        return {
          cursor: toGlobalId('MultipleChoice', multipleChoice.id),
          node: multipleChoice,
        };
      },
    },
  },
  mutateAndGetPayload: async (args: Args) => {
    try {
      const multipleChoice = await new MultiplieChoiceModel({
        ...args,
      }).save();

      return { id: multipleChoice._id };
    } catch (error) {
      return { error };
    }
  },
});

export default MultipleChoiceAddMutation;
