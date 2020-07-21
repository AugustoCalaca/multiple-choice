import React, { memo } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ErrorIcon from '@material-ui/icons/ErrorOutline';

import ErrorMessage from './ErrorMessage';
import IconMessage from './IconMessage';

interface IProps {
  error?: any;
  hasData: boolean;
}

const EmptyAndErrorMessages = (props: IProps) => {
  const { error, hasData } = props;

  return (
    <Card>
      {error && (
        <CardContent>
          <ErrorMessage error={error} />
        </CardContent>
      )}
      {!error && !hasData && (
        <CardContent>
          <IconMessage message="No items found...">
            <ErrorIcon fontSize="large" />
          </IconMessage>
        </CardContent>
      )}
    </Card>
  );
};

export default memo(EmptyAndErrorMessages);
