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

describe('MultipleChoiceEditMarkedAnswerMutation', () => {
  it('should edit an marked answer', async () => {
    const multipleChoice = await createMultipleChoice();

    const mutation = `
      mutation M($input: MultipleChoiceEditMarkedAnswerInput!) {
        MultipleChoiceEditMarkedAnswer(input: $input) {
          error
          success
        }
      }
    `;

    const variables = {
      input: {
        id: toGlobalId('MultipleChoice', multipleChoice._id),
        markedAnswer: 'B',
      },
    };
    const rootValue = {};
    const context = getContext();
    const result = await graphql(schema, mutation, rootValue, context, variables);

    expect(result.errors).toBeUndefined();
    expect(result.data!.MultipleChoiceEditMarkedAnswer).toMatchObject({
      error: null,
      success: 'Marked answer successfully changed!',
    });
  });

  it('should edit one marked answer field offentimes', async () => {
    const multipleChoice = await createMultipleChoice();

    const mutation = `
      mutation M($input: MultipleChoiceEditMarkedAnswerInput!) {
        MultipleChoiceEditMarkedAnswer(input: $input) {
          error
          success
        }
      }
    `;

    const rootValue = {};
    const context = getContext();

    const variables1 = {
      input: {
        id: toGlobalId('MultipleChoice', multipleChoice._id),
        markedAnswer: 'A',
      },
    };

    const result1 = await graphql(schema, mutation, rootValue, context, variables1);
    expect(result1.errors).toBeUndefined();
    expect(result1.data!.MultipleChoiceEditMarkedAnswer).toMatchObject({
      error: null,
      success: 'Marked answer successfully changed!',
    });

    const variables2 = {
      input: {
        id: toGlobalId('MultipleChoice', multipleChoice._id),
        markedAnswer: 'B',
      },
    };

    const result2 = await graphql(schema, mutation, rootValue, context, variables2);
    expect(result2.errors).toBeUndefined();
    expect(result2.data!.MultipleChoiceEditMarkedAnswer).toMatchObject({
      error: null,
      success: 'Marked answer successfully changed!',
    });

    const variables3 = {
      input: {
        id: toGlobalId('MultipleChoice', multipleChoice._id),
        markedAnswer: 'C',
      },
    };

    const result3 = await graphql(schema, mutation, rootValue, context, variables3);
    expect(result3.errors).toBeUndefined();
    expect(result3.data!.MultipleChoiceEditMarkedAnswer).toMatchObject({
      error: null,
      success: 'Marked answer successfully changed!',
    });

    const variables4 = {
      input: {
        id: toGlobalId('MultipleChoice', multipleChoice._id),
        markedAnswer: 'D',
      },
    };

    const result4 = await graphql(schema, mutation, rootValue, context, variables4);
    expect(result4.errors).toBeUndefined();
    expect(result4.data!.MultipleChoiceEditMarkedAnswer).toMatchObject({
      error: null,
      success: 'Marked answer successfully changed!',
    });

    const variables5 = {
      input: {
        id: toGlobalId('MultipleChoice', multipleChoice._id),
        markedAnswer: 'E',
      },
    };

    const result5 = await graphql(schema, mutation, rootValue, context, variables5);
    expect(result5.errors).toBeUndefined();
    expect(result5.data!.MultipleChoiceEditMarkedAnswer).toMatchObject({
      error: null,
      success: 'Marked answer successfully changed!',
    });
  });

  it('should catch an error for not passing an valid marked answer field', async () => {
    const multipleChoice = await createMultipleChoice();

    const mutation = `
      mutation M($input: MultipleChoiceEditMarkedAnswerInput!) {
        MultipleChoiceEditMarkedAnswer(input: $input) {
          error
          success
        }
      }
    `;

    const variables = {
      input: {
        id: toGlobalId('MultipleChoice', multipleChoice._id),
        markedAnswer: 'f',
      },
    };
    const rootValue = {};
    const context = getContext();
    const result = await graphql(schema, mutation, rootValue, context, variables);
    expect(result.errors).toBeDefined();
  });

  it('should not edit an marked answer for passing an wrong id field', async () => {
    const mutation = `
      mutation M($input: MultipleChoiceEditMarkedAnswerInput!) {
        MultipleChoiceEditMarkedAnswer(input: $input) {
          error
          success
        }
      }
    `;

    const variables = {
      input: {
        id: toGlobalId('MultipleChoice', Types.ObjectId().toString()),
        markedAnswer: 'A',
      },
    };
    const rootValue = {};
    const context = getContext();
    const result = await graphql(schema, mutation, rootValue, context, variables);

    expect(result.errors).toBeUndefined();
    expect(result.data!.MultipleChoiceEditMarkedAnswer).toMatchObject({
      error: 'Multiple choice not found',
      success: null,
    });
  });

  it('should catch an error for not passing an id field', async () => {
    const mutation = `
      mutation M($input: MultipleChoiceEditMarkedAnswerInput!) {
        MultipleChoiceEditMarkedAnswer(input: $input) {
          error
          success
        }
      }
    `;

    const variables = {
      input: {
        markedAnswer: 'I',
      },
    };
    const rootValue = {};
    const context = getContext();
    const result = await graphql(schema, mutation, rootValue, context, variables);
    expect(result.errors).toBeDefined();
  });
});
