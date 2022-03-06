/* eslint-disable @typescript-eslint/interface-name-prefix */
import '@material-ui/core/styles/createTheme';

declare module '@material-ui/core/styles/createTheme' {
  interface ThemeVariables {
    contentPadding: number;
    headerHeight: number;
  }
}
