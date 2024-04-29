import { Box, styled } from '@mui/material';

export const GlassSurface = styled(Box)<{ opacity?: number }>(({ opacity, theme }) => ({
  backgroundColor: theme.glass.background(opacity ?? theme.glass.opacity),
  backdropFilter: 'blur(20px)',
  border: `2px solid ${theme.glass.borderColor}`,
  boxShadow: `0 0 10px ${theme.glass.shadow}`,
}));
