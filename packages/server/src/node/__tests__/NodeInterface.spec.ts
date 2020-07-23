import { graphql } from 'graphql';
import { toGlobalId } from 'graphql-relay';

import { schema } from '../../schema/schema';
import {
  getContext,
  connectMongoose,
  clearDbAndRestartCounters,
  disconnectMongoose,
  createMultipleChoice,
} from '../../../test/helpers';

beforeAll(connectMongoose);
beforeEach(clearDbAndRestartCounters);
afterAll(disconnectMongoose);

it('should load one MultipleChoice by inline fragment', async () => {
  const multipleChoice = await createMultipleChoice();

  const query = `
    query Node($id: ID!) {
      node(id: $id) {
        id
        ... on MultipleChoice {
          id
          question
          statements
          correctAnswer
          __typename
        }
      }
    }
  `;

  const rootValue = {};
  const context = getContext();
  const variables = {
    id: toGlobalId('MultipleChoice', multipleChoice._id),
  };

  const result = await graphql(schema, query, rootValue, context, variables);
  expect(result.errors).toBeUndefined();
  expect(result.data!.node).toMatchObject({
    id: variables.id,
    question: multipleChoice.question,
    correctAnswer: multipleChoice.correctAnswer,
    __typename: 'MultipleChoice',
  });
  expect(result.data!.node.statements).toEqual([...multipleChoice.statements]);
});

it('should load MultipleChoice by spread fragment', async () => {
  const multipleChoice = await createMultipleChoice();

  const query = `
    query Node($id: ID!) {
      node(id: $id) {
        id
        ...multipleChoiceFields
        __typename
      }
    }

    fragment multipleChoiceFields on MultipleChoice {
      id
      question
      statements
      correctAnswer
    }
  `;

  const rootValue = {};
  const context = getContext();
  const variables = {
    id: toGlobalId('MultipleChoice', multipleChoice._id),
  };

  const result = await graphql(schema, query, rootValue, context, variables);
  expect(result.errors).toBeUndefined();
  expect(result.data!.node).toMatchObject({
    id: variables.id,
    question: multipleChoice.question,
    correctAnswer: multipleChoice.correctAnswer,
    __typename: 'MultipleChoice',
  });
  expect(result.data!.node.statements).toEqual([...multipleChoice.statements]);
});
