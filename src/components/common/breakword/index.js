import { Box } from '@mui/material';

function Breakword({ text, width }) {
    return (
        <Box
            sx={{
                maxWidth: width,
                wordWrap: 'break-word',
                whiteSpace: 'normal'
            }}
        >
            {text}
        </Box>
    );
}

export default Breakword;
