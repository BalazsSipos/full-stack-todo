import { createTheme } from '@mui/material';

const palette = {
  primary: {
    main: '#052120',
  },
  secondary: {
    main: '#592f17',
  },
  important: {
    light: '#e0d1c8',
    main: '#dbc6ba',
    dark: '#a8968c',
  },
  warning: {
    main: '#f2d142',
  },
  error: {
    main: '#fd8f82',
  },
  info: {
    main: '#02394d',
  },
  success: {
    main: '#8cac9c',
  },
} as const;

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    ...palette,
    background: {
      default: '#f7f7f7',
      paper: '#ffffff',
    },
  },
  glass: {
    background: (opacity) => `rgba(255,255,255,${opacity})`,
    opacity: 0.4,
    borderColor: 'rgba(255,255,255,0.3)',
    shadow: 'rgba(0,0,0,0.1)',
  },
});

export const useTheme = () => {
  return lightTheme;
};
