import { createTheme } from '@material-ui/core/styles';
import { ComponentsProps } from '@material-ui/core/styles/props';

import variables from './ThemeVariables';

const props: ComponentsProps = {
  MuiTextField: {
    variant: 'filled',
    margin: 'normal',
  },
};

const themes: ReturnType<typeof createTheme> = createTheme(
  {
    palette: {
      primary: {
        light: '#ffff53',
        main: '#ffcc09',
        dark: '#c79c00',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ffff53',
        main: '#ffcc09',
        dark: '#c79c00',
        contrastText: '#fff',
      },
      background: {
        default: '#dfdfdf',
      },
    },
    props,
  },
  {
    variables,
  },
);

export default themes;
