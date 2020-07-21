import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay';
import { GraphQLString, GraphQLID, GraphQLNonNull } from 'graphql';

import MultiplieChoiceModel from '../MultipleChoiceModel';

type Args = {
  id: string;
};

const MultipleChoiceDeleteMutation = mutationWithClientMutationId({
  name: 'MultipleChoiceDelete',
  inputFields: {
    id: {
      type: GraphQLNonNull(GraphQLID),
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
  mutateAndGetPayload: async (args: Args) => {
    const { id } = fromGlobalId(args.id);

    try {
      const multipleChoice = await MultiplieChoiceModel.findByIdAndDelete(id);

      if (!multipleChoice) {
        throw 'Was not possible to delete this multiple choice!';
      }

      return { success: 'Multiple choice deleted!' };
    } catch (error) {
      return { error };
    }
  },
});

export default MultipleChoiceDeleteMutation;
