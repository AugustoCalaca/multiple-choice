import React, { memo, Props } from 'react';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CoreToolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';

interface IProps extends Props<any> {
  title?: string;
}

const Toolbar = (props: IProps) => {
  return (
    <Wrapper>
      <AppBar position="static" color="default">
        <CoreToolbar>
          <IconButton color="inherit" style={{ marginLeft: '-15px' }}>
            <MenuIcon />
          </IconButton>
          {props.children}
          {!props.children && (
            <Grid container alignItems="center">
              <Grid item xs={true}>
                <Typography variant="h6" color="inherit" noWrap>
                  {props.title || 'App'}
                </Typography>
              </Grid>
            </Grid>
          )}
        </CoreToolbar>
      </AppBar>
    </Wrapper>
  );
};

export default memo(Toolbar);

const Wrapper = styled.div`
  height: ${({ theme }) => theme.variables.headerHeight};
  margin-top: ${({ theme }) => theme.variables.contentPadding * -1};
  margin-bottom: ${({ theme }) => theme.variables.contentPadding};
`;
