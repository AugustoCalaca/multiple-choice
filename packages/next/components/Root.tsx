import React, { FC } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

import { Footer } from '../ui';

const Root: FC = (props) => {
  return (
    <Container>
      <Head>
        <title>Next Relay</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <Header>
          <Typography variant="h5">Welcome to Next with Relay!</Typography>
        </Header>

        {props.children}
      </Main>
      <Footer />
    </Container>
  );
};

export default Root;

const Container = styled.div`
  background: ${({ theme }) => theme.palette.background.default};
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: 100vh;
  justify-content: space-between;
`;

const Header = styled.header`
  display: flex;
  padding: 15px;
  justify-content: center;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: 100vh;
  justify-content: flex-start;
  align-items: center;
`;
