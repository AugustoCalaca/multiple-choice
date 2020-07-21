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

describe('MultipleChoiceDeleteMutation', () => {
  it('should delete an multiple choice', async () => {
    const multipleChoice = await createMultipleChoice();

    const mutation = `
      mutation M($input: MultipleChoiceDeleteInput!) {
        MultipleChoiceDelete(input: $input) {
          error
          success
        }
      }
    `;

    const variables = {
      input: {
        id: toGlobalId('MultipleChoice', multipleChoice._id),
      },
    };
    const rootValue = {};
    const context = getContext();
    const result = await graphql(schema, mutation, rootValue, context, variables);

    expect(result.errors).toBeUndefined();
    expect(result.data!.MultipleChoiceDelete).toMatchObject({
      error: null,
      success: 'Multiple choice deleted!',
    });
  });

  it('should delete an multiple choice and show an error case try to delete it again', async () => {
    const multipleChoice = await createMultipleChoice();

    const mutation = `
      mutation M($input: MultipleChoiceDeleteInput!) {
        MultipleChoiceDelete(input: $input) {
          error
          success
        }
      }
    `;

    const variables = {
      input: {
        id: toGlobalId('MultipleChoice', multipleChoice._id),
      },
    };
    const rootValue = {};
    const context = getContext();

    const result1 = await graphql(schema, mutation, rootValue, context, variables);
    expect(result1.errors).toBeUndefined();
    expect(result1.data!.MultipleChoiceDelete).toMatchObject({
      error: null,
      success: 'Multiple choice deleted!',
    });

    const result2 = await graphql(schema, mutation, rootValue, context, variables);
    expect(result2.errors).toBeUndefined();
    expect(result2.data!.MultipleChoiceDelete).toMatchObject({
      error: 'Was not possible to delete this multiple choice!',
      success: null,
    });
  });

  it('should not delete an multiple choice for passing an wrong id field', async () => {
    const mutation = `
      mutation M($input: MultipleChoiceDeleteInput!) {
        MultipleChoiceDelete(input: $input) {
          error
          success
        }
      }
    `;

    const variables = {
      input: {
        id: toGlobalId('MultipleChoice', Types.ObjectId().toString()),
      },
    };
    const rootValue = {};
    const context = getContext();

    const result = await graphql(schema, mutation, rootValue, context, variables);
    expect(result.errors).toBeUndefined();
    expect(result.data!.MultipleChoiceDelete).toMatchObject({
      error: 'Was not possible to delete this multiple choice!',
      success: null,
    });
  });

  it('should catch an error for not passing an id field', async () => {
    const mutation = `
      mutation M($input: MultipleChoiceDeleteInput!) {
        MultipleChoiceDelete(input: $input) {
          error
          success
        }
      }
    `;

    const variables = {
      input: {},
    };
    const rootValue = {};
    const context = getContext();
    const result = await graphql(schema, mutation, rootValue, context, variables);

    expect(result.errors).toBeDefined();
  });
});
