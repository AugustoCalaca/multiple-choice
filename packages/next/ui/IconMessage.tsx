import React, { memo, Props } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

interface IProps extends Props<null> {
  message: string;
}

const IconMessage = (props: IProps | any) => (
  <Wrapper>
    {props.children}
    <Typography variant="body1">{props.message}</Typography>
  </Wrapper>
);

export default memo(IconMessage);

const Wrapper = styled.div`
  text-align: center;
  padding: 20px;
  width: 350px;
  max-width: 100%;
  margin: auto;
`;
