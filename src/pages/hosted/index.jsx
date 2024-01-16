import Container from '../../components/Container';
import { Link } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';
import WhiteContained from '../../components/Buttons/WhiteOutlined';
import ConstructionIcon from '@mui/icons-material/Construction';

export default function Hosted() {

    return (
        <>
            <Stack
                direction={'row'}
                gap={2}
                sx={{
                    position: 'absolute',
                    top: 20,
                    left: 20,
                }}
            >
                <Typography sx={{ fontSize: '20px', color: 'white', textTransform: 'uppercase' }}>Hosted (H2H)</Typography>
            </Stack>
            <Container>
                <Stack alignItems={'center'}>
                    <ConstructionIcon sx={{mb:2}}/>
                    <Typography>Under Construction</Typography>
                </Stack>
            </Container>
            <Stack
                direction={'row'}
                gap={2}
                sx={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                }}
            >
                <Link to='/direct'><WhiteContained>Direct (S2S)</WhiteContained></Link>
                <Link to='https://portal.gatewaypay.io/api-document'><WhiteContained>API Docs</WhiteContained></Link>
            </Stack>
        </>
    );
}
