import { Box } from '@mui/material';
import { styled } from '@mui/system';

const WidgetWrapper = styled(Box)(({theme,bgColor}) => ({
    padding: "1.5rem 1.5rem 0.75rem 1.5rem",
    backgroundColor: bgColor || theme.palette.background.alt,
    borderRadius: "0.75rem",
    boxShadow: "0px 4px 6px 1px rgba(0,0,0,0.1)"
}));

export default WidgetWrapper;