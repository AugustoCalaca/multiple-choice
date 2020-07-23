import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay';
import { GraphQLString, GraphQLID, GraphQLNonNull, GraphQLList } from 'graphql';

import MultiplieChoiceModel from '../MultipleChoiceModel';
import MultipleChoiceType from '../MultipleChoiceType';
import * as MultipleChoiceLoader from '../MultipleChoiceLoader';

type Args = {
  id: string;
  question: string;
  statements: string[];
  correctAnswer: string;
};

const MultipleChoiceEditMutation = mutationWithClientMutationId({
  name: 'MultipleChoiceEdit',
  inputFields: {
    id: {
      type: GraphQLNonNull(GraphQLID),
    },
    question: {
      type: GraphQLString,
    },
    statements: {
      type: GraphQLList(GraphQLString),
    },
    correctAnswer: {
      type: GraphQLString,
    },
  },
  outputFields: {
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
    multipleChoice: {
      type: MultipleChoiceType,
      resolve: (root, _, context) => MultipleChoiceLoader.load(context, root.id),
    },
  },
  mutateAndGetPayload: async (args: Args, context) => {
    const { id } = fromGlobalId(args.id);

    try {
      const multipleChoice = await MultiplieChoiceModel.findById(id);

      if (!multipleChoice) {
        throw 'Multiple choice not found';
      }

      await MultiplieChoiceModel.findByIdAndUpdate(
        id,
        {
          $set: {
            question: args.question || multipleChoice.question,
            statements: args.statements || multipleChoice.statements,
            correctAnswer: args.correctAnswer || multipleChoice.correctAnswer,
          },
        },
        {
          runValidators: true,
        },
      );

      MultipleChoiceLoader.clearCache(context, multipleChoice._id);

      return { id: multipleChoice._id };
    } catch (error) {
      return { error };
    }
  },
});

export default MultipleChoiceEditMutation;
