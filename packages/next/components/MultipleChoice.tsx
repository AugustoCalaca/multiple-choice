import React, { Suspense } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay/hooks';

import { MultipleChoiceQuery } from './__generated__/MultipleChoiceQuery.graphql';

export const MULTIPLE_CHOICE_QUERY = graphql`
  query MultipleChoiceQuery($id: ID!) {
    multipleChoice(id: $id) {
      question
      statementA
      statementB
      statementC
      statementD
      statementE
      correctAnswer
    }
  }
`;

export const MULTIPLE_CHOICE_VARIABLES = {
  id: 'TXVsdGlwbGVDaG9pY2U6NWYwZTI2ZjM5NTcwNWY0OWE0NTJkN2M1',
};

const MultipleChoice = () => {
  const data = useLazyLoadQuery<MultipleChoiceQuery>(MULTIPLE_CHOICE_QUERY, MULTIPLE_CHOICE_VARIABLES, {
    fetchPolicy: 'store-or-network',
  });

  return (
    <div>
      <p>Question: {data.multipleChoice?.question}</p>
      <p>Statement A: {data.multipleChoice?.statementA}</p>
      <p>Statement B: {data.multipleChoice?.statementB}</p>
      <p>Statement C: {data.multipleChoice?.statementC}</p>
      <p>Statement D: {data.multipleChoice?.statementD}</p>
      <p>Statement E: {data.multipleChoice?.statementE}</p>
      <p>CorrectAnswer: {data.multipleChoice?.correctAnswer}</p>
    </div>
  );
};

const SuspenseMultipleChoice = () => {
  return (
    <Suspense fallback={<div>Loading Multiple Choice...</div>}>
      <MultipleChoice />
    </Suspense>
  );
};

export default SuspenseMultipleChoice;
