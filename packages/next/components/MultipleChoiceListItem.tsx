import React from 'react';
import { useFragment, graphql } from 'react-relay/hooks';

import CardItem from './CardItem';
import { MultipleChoiceListItem_multipleChoice$key } from './__generated__/MultipleChoiceListItem_multipleChoice.graphql';

type Props = {
  multipleChoice: MultipleChoiceListItem_multipleChoice$key;
};

const MultipleChoiceListItem = (props: Props) => {
  const multipleChoice = useFragment<MultipleChoiceListItem_multipleChoice$key>(
    graphql`
      fragment MultipleChoiceListItem_multipleChoice on MultipleChoice {
        id
        question
        statementA
        statementB
        statementC
        statementD
        statementE
        correctAnswer
      }
    `,
    props.multipleChoice,
  );

  return <CardItem data={multipleChoice} correctAnswer={multipleChoice} />;
};

export default MultipleChoiceListItem;
