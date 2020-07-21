import React, { Suspense, useEffect } from 'react';
import { AppProps } from 'next/app';
import styled, { ThemeProvider } from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';
import { StylesProvider } from '@material-ui/core/styles';

import ErrorBoundary from '../components/ErrorBoundary';

import { Themes, Alert, Toast } from '../ui';

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
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
