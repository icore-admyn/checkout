import { Routes, Route } from 'react-router-dom';
import { Box, Stack } from '@mui/material';

import Home from './pages';
import Direct from './pages/direct';
import Hosted from './pages/hosted';

import Logo from './assets/logo.svg';

export default function App() {

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
          position: 'absolute'
        }}>
        <img src={Logo} alt='' width={150} height={50} />
      </Stack>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/direct" element={<Direct />} />
        <Route path="/hosted" element={<Hosted />} />
      </Routes>
    </Box>
  );
}
