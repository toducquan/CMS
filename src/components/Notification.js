import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { removeNotification } from 'store/reducers/notification';
import { useTranslation } from 'react-i18next';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Toast message
const Notification = () => {
    const { visible, content, severity } = useSelector((state) => state.notification);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(removeNotification());
    };

    return (
        <React.Fragment>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={visible}
                autoHideDuration={2000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {t(content)}
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
};

export default Notification;
