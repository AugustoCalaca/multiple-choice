import React from 'react';
import Card from '@material-ui/core/Card';

import { withData } from '../relay';

import MultipleChoiceList, {
  MULTIPLE_CHOICE_LIST_QUERY,
  MULTIPLE_CHOICE_LIST_VARIABLES,
} from '../components/MultipleChoiceList';

import Root from '../components/Root';
import { Toolbar } from '../ui';

const PageRoot = () => (
  <Card>
    <Toolbar title="Multiple Choice" />
    <Root>
      <MultipleChoiceList />
    </Root>
  </Card>
);

export default withData(PageRoot, {
  query: MULTIPLE_CHOICE_LIST_QUERY,
  variables: MULTIPLE_CHOICE_LIST_VARIABLES,
});
