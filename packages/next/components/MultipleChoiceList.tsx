import React, { Suspense, useCallback, useState } from 'react';
import { useLazyLoadQuery, graphql } from 'react-relay/hooks';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import FormDialog from './FormDialog';
import MultipleChoiceListPagination from './MultipleChoiceListPagination';
import { MultipleChoiceListQuery } from './__generated__/MultipleChoiceListQuery.graphql';

export const MULTIPLE_CHOICE_LIST_QUERY = graphql`
  query MultipleChoiceListQuery {
    ...MultipleChoiceListPagination_query
  }
`;

export const MULTIPLE_CHOICE_LIST_VARIABLES = {};

const MultipleChoiceListLoad = () => {
  const data = useLazyLoadQuery<MultipleChoiceListQuery>(MULTIPLE_CHOICE_LIST_QUERY, MULTIPLE_CHOICE_LIST_VARIABLES, {
    fetchPolicy: 'store-or-network',
  });

  const [formOpen, setFormOpen] = useState(false);
  const handleAdd = useCallback(() => {
    setFormOpen(true);
  }, []);
  const formCallback = useCallback(() => {
    setFormOpen(false);
  }, []);

  return (
    <CardStyled>
      <FormDialog opened={formOpen} onComplete={formCallback} onCancel={formCallback} />

      <CardContent>
        <Grid container alignItems="center" justify="flex-end">
          <Button variant="contained" color="primary" onClick={handleAdd}>
            Add
          </Button>
        </Grid>
      </CardContent>
      <MultipleChoiceListPagination query={data} />
    </CardStyled>
  );
};

const MultipleChoiceList = () => (
  <Suspense fallback={<div>Loading Multiple Choice List...</div>}>
    <MultipleChoiceListLoad />
  </Suspense>
);

export default MultipleChoiceList;

const CardStyled = styled(Card)`
  && {
    width: 100%;
    max-width: 600px;
  }
`;
