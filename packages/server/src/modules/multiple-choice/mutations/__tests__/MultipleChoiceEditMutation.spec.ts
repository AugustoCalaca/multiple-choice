import { graphql } from 'graphql';
import { toGlobalId } from 'graphql-relay';
import { Types } from 'mongoose';

import { schema } from '../../../../schema/schema';

import {
  connectMongoose,
  clearDbAndRestartCounters,
  disconnectMongoose,
  createMultipleChoice,
  getContext,
} from '../../../../../test/helpers';

beforeEach(connectMongoose);
beforeEach(clearDbAndRestartCounters);
afterAll(disconnectMongoose);

describe('MultipleChoiceEditMutation', () => {
  it('should edit all multiple choice fields', async () => {
    const multipleChoice = await createMultipleChoice();

    const mutation = `
      mutation M($input: MultipleChoiceEditInput!) {
        MultipleChoiceEdit(input: $input) {
          error
          multipleChoice {
            question
            statements
            correctAnswer
          }
        }
      }
    `;

    const statements = [
      'Awesome edited statement A',
      'Awesome edited statement B',
      'Awesome edited statement C',
      'Awesome edited statement D',
      'Awesome edited statement E',
    ];

    const variables = {
      input: {
        id: toGlobalId('MultipleChoice', multipleChoice._id),
        question: 'Is it an awesome edited question?',
        statements,
        correctAnswer: 'B',
      },
    };
    const rootValue = {};
    const context = getContext();
    const result = await graphql(schema, mutation, rootValue, context, variables);

    expect(result.errors).toBeUndefined();
    expect(result.data!.MultipleChoiceEdit.error).toBeNull();
    expect(result.data!.MultipleChoiceEdit.multipleChoice).toMatchObject({
      question: variables.input.question,
      correctAnswer: variables.input.correctAnswer,
    });
    expect(result.data!.MultipleChoiceEdit.multipleChoice.statements).toEqual(statements);
  });

  it('should edit one multiple choice field at a time', async () => {
    const multipleChoice = await createMultipleChoice();

    const mutation = `
      mutation M($input: MultipleChoiceEditInput!) {
        MultipleChoiceEdit(input: $input) {
          error
          multipleChoice {
            question
            statements
            correctAnswer
          }
        }
      }
    `;

    const rootValue = {};
    const context = getContext();

    const variables1 = {
      input: {
        id: toGlobalId('MultipleChoice', multipleChoice._id),
        question: 'Is it an awesome edited question?',
      },
    };

    const result1 = await graphql(schema, mutation, rootValue, context, variables1);
    expect(result1.errors).toBeUndefined();
    expect(result1.data!.MultipleChoiceEdit.error).toBeNull();
    expect(result1.data!.MultipleChoiceEdit.multipleChoice).toMatchObject({
      question: variables1.input.question,
      correctAnswer: multipleChoice.correctAnswer,
    });
    expect(result1.data!.MultipleChoiceEdit.multipleChoice.statements).toEqual([...multipleChoice.statements]);

    const variables2 = {
      input: {
        id: toGlobalId('MultipleChoice', multipleChoice._id),
        statements: ['Awesome edited statement A'],
      },
    };

    const result2 = await graphql(schema, mutation, rootValue, context, variables2);
    expect(result2.errors).toBeUndefined();
    expect(result2.data!.MultipleChoiceEdit.error).toBeNull();
    expect(result2.data!.MultipleChoiceEdit.multipleChoice).toMatchObject({
      question: variables1.input.question,
      correctAnswer: multipleChoice.correctAnswer,
    });
    expect(result2.data!.MultipleChoiceEdit.multipleChoice.statements).toEqual(variables2.input.statements);

    const variables3 = {
      input: {
        id: toGlobalId('MultipleChoice', multipleChoice._id),
        statements: ['Awesome edited statement A', 'Awesome edited statement B'],
      },
    };

    const result3 = await graphql(schema, mutation, rootValue, context, variables3);
    expect(result3.errors).toBeUndefined();
    expect(result3.data!.MultipleChoiceEdit.error).toBeNull();
    expect(result3.data!.MultipleChoiceEdit.multipleChoice).toMatchObject({
      question: variables1.input.question,
      correctAnswer: multipleChoice.correctAnswer,
    });
    expect(result3.data!.MultipleChoiceEdit.multipleChoice.statements).toEqual(variables3.input.statements);

    const variables4 = {
      input: {
        id: toGlobalId('MultipleChoice', multipleChoice._id),
        statements: ['Awesome edited statement A', 'Awesome edited statement B', 'Awesome edited statement C'],
      },
    };

    const result4 = await graphql(schema, mutation, rootValue, context, variables4);
    expect(result4.errors).toBeUndefined();
    expect(result4.data!.MultipleChoiceEdit.error).toBeNull();
    expect(result4.data!.MultipleChoiceEdit.multipleChoice).toMatchObject({
      question: variables1.input.question,
      correctAnswer: multipleChoice.correctAnswer,
    });
    expect(result4.data!.MultipleChoiceEdit.multipleChoice.statements).toEqual(variables4.input.statements);

    const variables5 = {
      input: {
        id: toGlobalId('MultipleChoice', multipleChoice._id),
        statements: [
          'Awesome edited statement A',
          'Awesome edited statement B',
          'Awesome edited statement C',
          'Awesome edited statement D',
        ],
      },
    };

    const result5 = await graphql(schema, mutation, rootValue, context, variables5);
    expect(result5.errors).toBeUndefined();
    expect(result5.data!.MultipleChoiceEdit.error).toBeNull();
    expect(result5.data!.MultipleChoiceEdit.multipleChoice).toMatchObject({
      question: variables1.input.question,
      correctAnswer: multipleChoice.correctAnswer,
    });
    expect(result5.data!.MultipleChoiceEdit.multipleChoice.statements).toEqual(variables5.input.statements);

    const variables6 = {
      input: {
        id: toGlobalId('MultipleChoice', multipleChoice._id),
        statements: [
          'Awesome edited statement A',
          'Awesome edited statement B',
          'Awesome edited statement C',
          'Awesome edited statement D',
          'Awesome edited statement E',
        ],
      },
    };

    const result6 = await graphql(schema, mutation, rootValue, context, variables6);
    expect(result6.errors).toBeUndefined();
    expect(result6.data!.MultipleChoiceEdit.error).toBeNull();
    expect(result6.data!.MultipleChoiceEdit.multipleChoice).toMatchObject({
      question: variables1.input.question,
      correctAnswer: multipleChoice.correctAnswer,
    });
    expect(result6.data!.MultipleChoiceEdit.multipleChoice.statements).toEqual(variables6.input.statements);
  });

  it('should not edit an multiple choice for passing an wrong id field', async () => {
    const mutation = `
      mutation M($input: MultipleChoiceEditInput!) {
        MultipleChoiceEdit(input: $input) {
          error
          multipleChoice {
            question
            statements
            correctAnswer
          }
        }
      }
    `;

    const variables = {
      input: {
        id: toGlobalId('MultipleChoice', Types.ObjectId().toString()),
        question: 'Is it an awesome edited question?',
      },
    };
    const rootValue = {};
    const context = getContext();
    const result = await graphql(schema, mutation, rootValue, context, variables);

    expect(result.errors).toBeUndefined();
    expect(result.data!.MultipleChoiceEdit).toMatchObject({
      error: 'Multiple choice not found',
      multipleChoice: null,
    });
  });

  it('should catch an error for not passing an id field', async () => {
    const mutation = `
      mutation M($input: MultipleChoiceEditInput!) {
        MultipleChoiceEdit(input: $input) {
          error
          multipleChoice {
            question
            statements
            correctAnswer
          }
        }
      }
    `;

    const variables = {
      input: {
        question: 'Is it an awesome edited question?',
      },
    };
    const rootValue = {};
    const context = getContext();
    const result = await graphql(schema, mutation, rootValue, context, variables);
    expect(result.errors).toBeDefined();
  });
});
