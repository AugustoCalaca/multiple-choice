import React, { memo, useCallback } from 'react';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import Alert from './Alert';

import { errorMessageFormatter } from './formatter/errorMessage';

interface IProps {
  error: any;
  onDismiss?: Function;
}

const ErrorMessageIcon = (props: IProps) => {
  const showAlert = useCallback(async () => {
    await Alert.type.show(errorMessageFormatter(props.error));
    props.onDismiss && props.onDismiss();
  }, [props]);

  return (
    <IconButton onClick={showAlert}>
      <ErrorOutlineIconStyled />
    </IconButton>
  );
};

export default memo(ErrorMessageIcon);

const ErrorOutlineIconStyled = styled(ErrorOutlineIcon)`
  && {
    opacity: 0.8;
    color: ${({ theme }) => theme.palette.error.main};
  }
`;
