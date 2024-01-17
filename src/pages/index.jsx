import { Stack, useTheme } from '@mui/material'
import { Link } from 'react-router-dom';
import WhiteContained from '../components/Buttons/WhiteOutlined';


export default function Home() {
    const theme = useTheme();

    return (
        <Stack
            alignItems={'center'}
            justifyContent={'center'}
            minHeight={'100dvh'}
            direction={'column'}
            gap={2}
            sx={{
                [theme.breakpoints.down('sm')]: {
                    minHeight: 'auto',
                    mt: '80px'
                },
            }}
        >
            <Stack
                alignItems={'center'}
                justifyContent={'center'}
                direction={'row'}
                gap={2}
            >
                <Link to='/direct'><WhiteContained>Direct (S2S)</WhiteContained></Link>
                <Link to='/hosted'><WhiteContained>Hosted (H2H)</WhiteContained></Link>
            </Stack>
        </Stack>
    );
}
