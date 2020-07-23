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
        statements
        correctAnswer
      }
    `,
    props.multipleChoice,
  );

  return <CardItem data={multipleChoice} />;
};

export default MultipleChoiceListItem;
