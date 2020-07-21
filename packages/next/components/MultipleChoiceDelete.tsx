import { graphql } from 'react-relay';
import { ROOT_ID, SelectorStoreUpdater } from 'relay-runtime';
import { connectionDeleteEdgeUpdater } from '@multiple-choice/relay';

export const MultipleChoiceDelete = graphql`
  mutation MultipleChoiceDeleteMutation($input: MultipleChoiceDeleteInput!) {
    MultipleChoiceDelete(input: $input) {
      error
      success
    }
  }
`;

export const deleteUpdater: SelectorStoreUpdater = (store, data) => {
  connectionDeleteEdgeUpdater({
    store,
    parentId: ROOT_ID,
    nodeId: data.id,
    connectionName: 'MultipleChoiceListPagination_multipleChoices',
  });
};
