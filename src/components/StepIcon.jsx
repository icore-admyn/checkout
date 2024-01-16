import { Typography, styled } from '@mui/material';
import Check from '@mui/icons-material/Check';

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: 'rgba(0, 0, 0, 0.38)',
    zIndex: 1,
    color: '#fff',
    width: 25,
    height: 25,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        backgroundColor: '#05767A',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundColor: '#05767A',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
}));

export default function StepIcon(props) {
    const { active, completed, className } = props;

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className} >
            {completed ? (
                <Check sx={{ width: '18px', height: '18px' }} />
            ) : (
                <Typography>{String(props.icon)}</Typography>
            )}
        </ColorlibStepIconRoot >
    );
}
