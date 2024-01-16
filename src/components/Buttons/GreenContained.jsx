import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#05767A'),
    backgroundColor: '#05767A',
    '&:hover': {
        backgroundColor: '#025558',
    },
}));

export default function GreenContained({ children }) {
    return (
        <ColorButton variant="contained">{children}</ColorButton>
    );
}