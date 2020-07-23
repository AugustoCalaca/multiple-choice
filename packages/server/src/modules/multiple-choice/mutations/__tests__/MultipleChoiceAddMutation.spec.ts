import { graphql } from 'graphql';

import { schema } from '../../../../schema/schema';

import {
  connectMongoose,
  clearDbAndRestartCounters,
  disconnectMongoose,
  getContext,
} from '../../../../../test/helpers';

beforeEach(connectMongoose);
beforeEach(clearDbAndRestartCounters);
afterAll(disconnectMongoose);

describe('MultipleChoiceAddMutation', () => {
  it('should create a new multiple choice', async () => {
    const mutation = `
      mutation M($input: MultipleChoiceAddInput!) {
        MultipleChoiceAdd(input: $input) {
          error
          multipleChoiceEdge {
            node {
              question
              statements
              correctAnswer
              markedAnswer
            }
          }
        }
      }
    `;

    const variables = {
      input: {
        question: 'Is it an awesome question?',
        statements: [
          'Awesome statement A',
          'Awesome statement B',
          'Awesome statement C',
          'Awesome statement D',
          'Awesome statement E',
        ],
        correctAnswer: 'a',
      },
    };
    const rootValue = {};
    const context = getContext();
    const result = await graphql(schema, mutation, rootValue, context, variables);

    expect(result.errors).toBeUndefined();
    expect(result.data!.MultipleChoiceAdd.error).toBeNull();
    expect(result.data!.MultipleChoiceAdd.multipleChoiceEdge.node).toMatchObject({
      question: variables.input.question,
      correctAnswer: variables.input.correctAnswer,
      markedAnswer: null,
    });
    expect(result.data!.MultipleChoiceAdd.multipleChoiceEdge.node.statements).toEqual([...variables.input.statements]);
  });
});
