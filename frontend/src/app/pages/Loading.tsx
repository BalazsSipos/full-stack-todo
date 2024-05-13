import { Box, LinearProgress } from '@mui/material';

export const Loading = () => {
  return (
    <>
      <Box alignItems="center" maxWidth="65px" justifyContent="center">
        <div>Loading...</div>
        <LinearProgress />
      </Box>
    </>
  );
};
