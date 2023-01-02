import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

// Load component
function LoadingPage({ minHeight }) {
    return (
        <>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight={
                    minHeight || {
                        xs: '300px',
                        sm: '350px',
                        md: '400px',
                        lg: '450px',
                        xl: '600px'
                    }
                }
            >
                <CircularProgress color="primary" />
            </Box>
        </>
    );
}

export default LoadingPage;
