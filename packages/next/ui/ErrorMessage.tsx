import React, { memo } from 'react';
import styled from 'styled-components';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Typography from '@material-ui/core/Typography';

import { errorMessageFormatter } from './formatter/errorMessage';

interface IProps {
  error: any;
}

const ErrorMessage = (props: IProps) => {
  const { error } = props;

  if (!error) {
    return null;
  }

  return (
    <Wrapper>
      <ErrorOutlineIconStyled fontSize="large" />
      <Typography variant="body1">{errorMessageFormatter(error)}</Typography>
    </Wrapper>
  );
};

export default memo(ErrorMessage);

const Wrapper = styled.div`
  text-align: center;
  margin: 20px 0;
`;

const ErrorOutlineIconStyled = styled(ErrorOutlineIcon)`
  && {
    opacity: 0.8;
    color: ${({ theme }) => theme.palette.error.main};
  }
`;
