import Form from './form';
import Container from '../../components/Container';
import { Link } from 'react-router-dom';
import { Stack, Typography, useTheme } from '@mui/material';
import WhiteContained from '../../components/Buttons/WhiteOutlined';

export default function Direct() {
    const theme = useTheme();

    return (
        <>
            <Stack
                direction={'row'}
                gap={2}
                sx={{
                    position: 'absolute',
                    top: 20,
                    left: 20,
                    [theme.breakpoints.down('sm')]: {
                        position: 'relative',
                        backgroundColor: '#05767',
                        top: 0,
                        left: 0,
                        justifyContent: 'center'
                    },
                }}
            >
                <Typography sx={{ fontSize: '20px', color: 'white', textTransform: 'uppercase' }}>Direct (S2S)</Typography>
            </Stack>
            <Container>
                <Form />
            </Container>
            <Stack
                direction={'row'}
                gap={2}
                sx={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    [theme.breakpoints.down('sm')]: {
                        position: 'relative',
                        backgroundColor: '#05767',
                        top: 0,
                        left: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                        pb: '40px'
                    },
                }}
            >
                <Link to='/hosted'><WhiteContained >Hosted (H2H)</WhiteContained></Link>
                <Link to='https://portal.gatewaypay.io/api-document'><WhiteContained >API Docs</WhiteContained></Link>
            </Stack>
        </>
    );
}
