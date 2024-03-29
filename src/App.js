import { Routes, Route } from 'react-router-dom';
import { Box, Stack, useTheme } from '@mui/material';

import Home from './pages';
import Direct from './pages/direct';
import Hosted from './pages/hosted';
import Success from './pages/success'

import Logo from './assets/logo.svg';

export default function App() {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%', minHeight: '100dvh' }}>
      <Stack
        justifyContent={'center'}
        alignItems={'center'}
        sx={{
          width: '100%',
          height: '50px',
          padding: '40px',
          boxSizing: 'border-box',
          position: 'absolute',
          [theme.breakpoints.down('sm')]: {
            position: 'relative',
            backgroundColor: '#05767'
          },
        }}>
        <img src={Logo} alt='' width={150} height={50} />
      </Stack>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/direct" element={<Direct />} />
        <Route path="/hosted" element={<Hosted />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Box>
  );
}
