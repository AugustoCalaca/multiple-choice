import { graphql } from 'react-relay';
import { ROOT_ID, SelectorStoreUpdater } from 'relay-runtime';
import { connectionUpdater } from '@multiple-choice/relay';

export const MultipleChoiceEdit = graphql`
  mutation MultipleChoiceEditMutation($input: MultipleChoiceEditInput!) {
    MultipleChoiceEdit(input: $input) {
      error
      multipleChoice {
        id
        question
        statements
        correctAnswer
      }
    }
  }
`;

export const updater: SelectorStoreUpdater = (store) => {
  const newEdge = store.getRootField('MultipleChoiceEdit')?.getLinkedRecord('multipleChoice');

  connectionUpdater({
    store,
    parentId: ROOT_ID,
    connectionName: 'MultipleChoiceListPagination_multipleChoices',
    edge: newEdge,
    before: true,
  });
};
