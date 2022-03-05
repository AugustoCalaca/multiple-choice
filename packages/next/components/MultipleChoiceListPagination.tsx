import React, { useCallback } from 'react';
import { graphql, usePaginationFragment } from 'react-relay/hooks';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';

import { EmptyAndErrorMessages } from '../ui';

import MultipleChoiceListItem from './MultipleChoiceListItem';
import { MultipleChoiceListPaginationQuery } from './__generated__/MultipleChoiceListPaginationQuery.graphql';
import { MultipleChoiceListPagination_query$key } from './__generated__/MultipleChoiceListPagination_query.graphql';

type Props = {
  query: MultipleChoiceListPagination_query$key;
};

const MultipleChoiceListPagination = (props: Props) => {
  const { data, isLoadingNext, loadNext, hasNext } = usePaginationFragment<
    MultipleChoiceListPaginationQuery,
    MultipleChoiceListPagination_query$key
  >(
    graphql`
      fragment MultipleChoiceListPagination_query on Query
      @argumentDefinitions(first: { type: Int, defaultValue: 10 }, after: { type: String })
      @refetchable(queryName: "MultipleChoiceListPaginationQuery") {
        multipleChoices(first: $first, after: $after) @connection(key: "MultipleChoiceListPagination_multipleChoices") {
          edges {
            node {
              id
              ...MultipleChoiceListItem_multipleChoice
            }
          }
        }
      }
    `,
    props.query,
  );

  const loadMore = useCallback(() => {
    if (isLoadingNext) {
      return;
    }

    loadNext(10);
  }, [isLoadingNext, loadNext]);

  return (
    <>
      {data.multipleChoices.edges.length === 0 && <EmptyAndErrorMessages hasData={false} error="" />}
      {data.multipleChoices.edges.map((edge) => {
        if (edge === null || edge.node === null) {
          return;
        }

        return <MultipleChoiceListItem key={edge.node.id} multipleChoice={edge.node} />;
      })}
      {hasNext && (
        <CardContentStyled>
          <Button variant="contained" color="primary" onClick={loadMore}>
            Load More
          </Button>
        </CardContentStyled>
      )}
    </>
  );
};

export default MultipleChoiceListPagination;

const CardContentStyled = styled(CardContent)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
