import { GraphQLObjectType } from 'graphql';

import MultipleChoiceMutations from '../modules/multiple-choice/mutations';

export default new GraphQLObjectType({
  name: 'Mutation',
  description: 'The root of all... mutations',
  fields: () => ({
    // Multiple Choice
    ...MultipleChoiceMutations,
  }),
});
