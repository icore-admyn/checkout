import { Stack, Box } from '@mui/material'

export default function Container({ children }) {
    return (
        <Stack
            width={'100%'}
            minHeight={'100dvh'}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <Box
                backgroundColor={'white'}
                p={4}
                borderRadius={2}
                maxWidth={'440px'}
                boxShadow={'0 4px 10px 0 rgba(0,0,0,.1)'}
            >
                {children}
            </Box>
        </Stack>
    );
}