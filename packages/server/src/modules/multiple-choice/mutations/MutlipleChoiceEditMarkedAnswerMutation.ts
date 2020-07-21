import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay';
import { GraphQLString, GraphQLID, GraphQLNonNull } from 'graphql';

import MultiplieChoiceModel from '../MultipleChoiceModel';
import * as MultipleChoiceLoader from '../MultipleChoiceLoader';

type Args = {
  id: string;
  markedAnswer: string;
};

const MultipleChoiceEditMarkedAnswerMutation = mutationWithClientMutationId({
  name: 'MultipleChoiceEditMarkedAnswer',
  inputFields: {
    id: {
      type: GraphQLNonNull(GraphQLID),
    },
    markedAnswer: {
      type: GraphQLString,
    },
  },
  outputFields: {
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
    success: {
      type: GraphQLString,
      resolve: ({ success }) => success,
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
            markedAnswer: args.markedAnswer || multipleChoice.markedAnswer,
          },
        },
        {
          runValidators: true,
        },
      );

      MultipleChoiceLoader.clearCache(context, multipleChoice._id);

      return { success: 'Marked answer successfully changed!' };
    } catch (error) {
      return { error };
    }
  },
});

export default MultipleChoiceEditMarkedAnswerMutation;
