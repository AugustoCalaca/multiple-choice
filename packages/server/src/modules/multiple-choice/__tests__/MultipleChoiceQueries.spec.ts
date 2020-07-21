import { graphql } from 'graphql';
import { toGlobalId } from 'graphql-relay';

import { schema } from '../../../schema/schema';
import {
  connectMongoose,
  clearDatabase,
  clearDbAndRestartCounters,
  createMultipleChoice,
  getContext,
} from '../../../../test/helpers';

beforeAll(connectMongoose);
beforeEach(clearDbAndRestartCounters);
afterAll(clearDatabase);

const multipleChoiceFragment = `
  fragment multipleChoiceFragment on MultipleChoice {
    id
    question
    statementA
    statementB
    statementC
    statementD
    statementE
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
      statementA: multipleChoice.statementA,
      statementB: multipleChoice.statementB,
      statementC: multipleChoice.statementC,
      statementD: multipleChoice.statementD,
      statementE: multipleChoice.statementE,
      correctAnswer: multipleChoice.correctAnswer,
    });
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
      statementA: multipleChoice5.statementA,
      statementB: multipleChoice5.statementB,
      statementC: multipleChoice5.statementC,
      statementD: multipleChoice5.statementD,
      statementE: multipleChoice5.statementE,
      correctAnswer: multipleChoice5.correctAnswer,
    });
    expect(result.data!.multipleChoices.edges[1].node).toMatchObject({
      question: multipleChoice4.question,
      statementA: multipleChoice4.statementA,
      statementB: multipleChoice4.statementB,
      statementC: multipleChoice4.statementC,
      statementD: multipleChoice4.statementD,
      statementE: multipleChoice4.statementE,
      correctAnswer: multipleChoice4.correctAnswer,
    });
    expect(result.data!.multipleChoices.edges[2].node).toMatchObject({
      question: multipleChoice3.question,
      statementA: multipleChoice3.statementA,
      statementB: multipleChoice3.statementB,
      statementC: multipleChoice3.statementC,
      statementD: multipleChoice3.statementD,
      statementE: multipleChoice3.statementE,
      correctAnswer: multipleChoice3.correctAnswer,
    });
    expect(result.data!.multipleChoices.edges[3].node).toMatchObject({
      question: multipleChoice2.question,
      statementA: multipleChoice2.statementA,
      statementB: multipleChoice2.statementB,
      statementC: multipleChoice2.statementC,
      statementD: multipleChoice2.statementD,
      statementE: multipleChoice2.statementE,
      correctAnswer: multipleChoice2.correctAnswer,
    });
    expect(result.data!.multipleChoices.edges[4].node).toMatchObject({
      question: multipleChoice1.question,
      statementA: multipleChoice1.statementA,
      statementB: multipleChoice1.statementB,
      statementC: multipleChoice1.statementC,
      statementD: multipleChoice1.statementD,
      statementE: multipleChoice1.statementE,
      correctAnswer: multipleChoice1.correctAnswer,
    });
  });
});
