/* eslint-disable @typescript-eslint/interface-name-prefix */
import '@material-ui/core/styles/createMuiTheme';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface ThemeVariables {
    contentPadding: number;
    headerHeight: number;
  }

  interface Theme {
    variables?: ThemeVariables;
  }

  interface ThemeOptions {
    variables?: ThemeVariables;
  }
}
