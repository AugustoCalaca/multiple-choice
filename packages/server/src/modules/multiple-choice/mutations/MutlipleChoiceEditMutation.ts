import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay';
import { GraphQLString, GraphQLID, GraphQLNonNull } from 'graphql';

import MultiplieChoiceModel from '../MultipleChoiceModel';
import MultipleChoiceType from '../MultipleChoiceType';
import * as MultipleChoiceLoader from '../MultipleChoiceLoader';

type Args = {
  id: string;
  question: string;
  statementA: string;
  statementB: string;
  statementC: string;
  statementD: string;
  statementE: string;
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
    statementA: {
      type: GraphQLString,
    },
    statementB: {
      type: GraphQLString,
    },
    statementC: {
      type: GraphQLString,
    },
    statementD: {
      type: GraphQLString,
    },
    statementE: {
      type: GraphQLString,
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
            statementA: args.statementA || multipleChoice.statementA,
            statementB: args.statementB || multipleChoice.statementB,
            statementC: args.statementC || multipleChoice.statementC,
            statementD: args.statementD || multipleChoice.statementD,
            statementE: args.statementE || multipleChoice.statementE,
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
