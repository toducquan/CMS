import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';

function EmptyRows() {
    const { t } = useTranslation();
    return (
        <Box display="flex" justifyContent="center" sx={{ marginTop: '3rem' }}>
            {t('No Data')}
        </Box>
    );
}

export default EmptyRows;
