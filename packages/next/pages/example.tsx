import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';

import MultipleChoice, { MULTIPLE_CHOICE_QUERY, MULTIPLE_CHOICE_VARIABLES } from '../components/MultipleChoice';
import Root from '../components/Root';
import { withData } from '../relay';

import { Toolbar } from '../ui';

const PageRoot = () => (
  <Card>
    <Toolbar title="Just a Test" />
    <Root>
      <MultipleChoice />
    </Root>
  </Card>
);

export default withData(PageRoot, {
  query: MULTIPLE_CHOICE_QUERY,
  variables: MULTIPLE_CHOICE_VARIABLES,
});
