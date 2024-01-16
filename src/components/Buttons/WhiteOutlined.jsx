import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#05767A'),
    borderColor: 'white',
    '&:hover': {
        backgroundColor: 'white',
        color: '#05767A',
        borderColor: 'white',
    },
}));

export default function WhiteOutlined({ children }) {
    return (
        <ColorButton variant="outlined">{children}</ColorButton>
    );
}