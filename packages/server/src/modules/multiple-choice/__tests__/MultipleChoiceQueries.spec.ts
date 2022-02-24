import { graphql } from 'graphql';
import { toGlobalId } from 'graphql-relay';

import { schema } from '../../../schema/schema';
import {
  connectMongoose,
  disconnectMongoose,
  clearDbAndRestartCounters,
  createMultipleChoice,
  getContext,
} from '../../../../test/helpers';

beforeAll(connectMongoose);
beforeEach(clearDbAndRestartCounters);
afterAll(disconnectMongoose);

const multipleChoiceFragment = `
  fragment multipleChoiceFragment on MultipleChoice {
    id
    question
    statements
    correctAnswer
  }
`;

describe('MultipleChoiceType queries', () => {
  it('should query one multiple choice', async () => {
    const multipleChoice = await createMultipleChoice();

    const query = `
      ${multipleChoiceFragment}

      query Q($id: ID!) {
        multipleChoice(id: $id) {
          ...multipleChoiceFragment
        }
      }
    `;

    const variables = {
      id: toGlobalId('MultipleChoice', multipleChoice._id),
    };

    const context = getContext();
    const rootValue = {};
    const result = await graphql(schema, query, rootValue, context, variables);

    expect(result.errors).toBeUndefined();
    expect(result.data!.multipleChoice).toMatchObject({
      id: variables.id,
      question: multipleChoice.question,
      correctAnswer: multipleChoice.correctAnswer,
    });
    expect(result.data!.multipleChoice.statements).toEqual([...multipleChoice.statements]);
  });

  it('should query all MultipleChoices', async () => {
    const multipleChoice1 = await createMultipleChoice();
    const multipleChoice2 = await createMultipleChoice();
    const multipleChoice3 = await createMultipleChoice();
    const multipleChoice4 = await createMultipleChoice();
    const multipleChoice5 = await createMultipleChoice();

    const query = `
    ${multipleChoiceFragment}

    query Q {
      multipleChoices {
        totalCount
        edges {
          node {
            ...multipleChoiceFragment
          }
        }
      }
    }`;

    const context = getContext();
    const rootValue = {};
    const result = await graphql(schema, query, rootValue, context);
    expect(result.errors).toBeUndefined();
    expect(result.data!.multipleChoices.totalCount).toBe(5);
    expect(result.data!.multipleChoices.edges[0].node).toMatchObject({
      question: multipleChoice5.question,
      correctAnswer: multipleChoice5.correctAnswer,
    });
    expect(result.data!.multipleChoices.edges[0].node.statements).toEqual([...multipleChoice5.statements]);

    expect(result.data!.multipleChoices.edges[1].node).toMatchObject({
      question: multipleChoice4.question,
      correctAnswer: multipleChoice4.correctAnswer,
    });
    expect(result.data!.multipleChoices.edges[1].node.statements).toEqual([...multipleChoice4.statements]);

    expect(result.data!.multipleChoices.edges[2].node).toMatchObject({
      question: multipleChoice3.question,
      correctAnswer: multipleChoice3.correctAnswer,
    });
    expect(result.data!.multipleChoices.edges[2].node.statements).toEqual([...multipleChoice3.statements]);

    expect(result.data!.multipleChoices.edges[3].node).toMatchObject({
      question: multipleChoice2.question,
      correctAnswer: multipleChoice2.correctAnswer,
    });
    expect(result.data!.multipleChoices.edges[3].node.statements).toEqual([...multipleChoice2.statements]);

    expect(result.data!.multipleChoices.edges[4].node).toMatchObject({
      question: multipleChoice1.question,
      correctAnswer: multipleChoice1.correctAnswer,
    });
    expect(result.data!.multipleChoices.edges[4].node.statements).toEqual([...multipleChoice1.statements]);
  });
});
