import { createTheme } from '@mui/material'

const palette = {
  primary: {
    main: '#ffffff',
  },
  secondary: {
    main: '#451d06',
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
} as const

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    ...palette,
    background: {
      default: '#f7f7f7',
      paper: '#4599b0',
    },
  }
})

export const useTheme = () => {
  return lightTheme
}
