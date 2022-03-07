import React, { Suspense } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import styled, { ThemeProvider } from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';
import { StylesProvider } from '@material-ui/core/styles';

import ErrorBoundary from '../components/ErrorBoundary';

import { Themes, Alert, Toast } from '../ui';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Next Relay</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssBaseline />
      <StylesProvider injectFirst>
        <ThemeProvider theme={Themes}>
          <ErrorBoundary>
            <Suspense fallback={<div>Loading app...</div>}>
              <Alert.type.Global />
              <Toast.type.Global />

              <Main>
                <Component {...pageProps} />
              </Main>
            </Suspense>
          </ErrorBoundary>
        </ThemeProvider>
      </StylesProvider>
    </>
  );
};

export default MyApp;

const Main = styled.main`
  overflow: auto;
  width: 100vw;
  height: 100vh;
  padding: ${({ theme }) => theme.variables.contentPadding};
  background-color: ${({ theme }) => theme.palette.background};
`;
