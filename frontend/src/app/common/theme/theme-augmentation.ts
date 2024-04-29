import '@mui/material/styles';

interface GlassTheme {
  background: (opacity: number) => string;
  shadow: string;
  opacity: number;
  borderColor: string;
}

declare module '@mui/material/styles' {
  interface Theme {
    glass: GlassTheme;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    glass?: Partial<GlassTheme>;
  }
}
