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
          multipleChoice {
            question
            statementA
            statementB
            statementC
            statementD
            statementE
            correctAnswer
            markedAnswer
          }
        }
      }
    `;

    const variables = {
      input: {
        question: 'Is it an awesome question?',
        statementA: 'Awesome statement A',
        statementB: 'Awesome statement B',
        statementC: 'Awesome statement C',
        statementD: 'Awesome statement D',
        statementE: 'Awesome statement E',
        correctAnswer: 'a',
      },
    };
    const rootValue = {};
    const context = getContext();
    const result = await graphql(schema, mutation, rootValue, context, variables);

    expect(result.errors).toBeUndefined();
    expect(result.data!.MultipleChoiceAdd.error).toBeNull();
    expect(result.data!.MultipleChoiceAdd.multipleChoice).toMatchObject({
      question: variables.input.question,
      statementA: variables.input.statementA,
      statementB: variables.input.statementB,
      statementC: variables.input.statementC,
      statementD: variables.input.statementD,
      statementE: variables.input.statementE,
      correctAnswer: variables.input.correctAnswer,
      markedAnswer: null,
    });
  });
});
