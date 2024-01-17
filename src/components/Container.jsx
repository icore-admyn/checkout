import { Stack, Box, useTheme, SpeedDial } from '@mui/material';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';

export default function Container({ children }) {
    const theme = useTheme();

    return (
        <Stack
            width={'100%'}
            minHeight={'100dvh'}
            justifyContent={'center'}
            alignItems={'center'}
            sx={{
                [theme.breakpoints.down('sm')]: {
                    minHeight: 'auto',
                    mt: '40px',
                    mb: '40px'
                },
            }}
        >
            <Box
                backgroundColor={'white'}
                p={4}
                borderRadius={2}
                maxWidth={'440px'}
                boxShadow={'0 4px 10px 0 rgba(0,0,0,.1)'}
                sx={{
                    [theme.breakpoints.down('sm')]: {
                        p: 2,
                        pt: 6,
                        pb: 6,
                        borderRadius: 0
                    },
                }}
            >
                {children}
            </Box>
            <SpeedDial
                ariaLabel="SpeedDial Card Info"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
            >
                <Box>
                    Hello
                </Box>
            </SpeedDial>
        </Stack>
    );
}