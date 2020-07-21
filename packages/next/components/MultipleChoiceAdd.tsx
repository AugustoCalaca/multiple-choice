import { graphql } from 'react-relay';
import { ROOT_ID, SelectorStoreUpdater } from 'relay-runtime';
import { connectionUpdater } from '@multiple-choice/relay';

export const MultipleChoiceAdd = graphql`
  mutation MultipleChoiceAddMutation($input: MultipleChoiceAddInput!) {
    MultipleChoiceAdd(input: $input) {
      error
      multipleChoiceEdge {
        node {
          id
          question
          statementA
          statementB
          statementC
          statementD
          statementE
          correctAnswer
        }
      }
    }
  }
`;

export const updater: SelectorStoreUpdater = (store) => {
  const newEdge = store.getRootField('MultipleChoiceAdd')?.getLinkedRecord('multipleChoiceEdge');

  connectionUpdater({
    store,
    parentId: ROOT_ID,
    connectionName: 'MultipleChoiceListPagination_multipleChoices',
    edge: newEdge,
    before: true,
  });
};
