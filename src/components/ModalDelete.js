import { useState } from 'react';
import Modal from '@mui/material/Modal';
import { Grid, Typography, Box, Button } from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';

// Form delete
function ModalDelete({ title, content, textBtnBack, textBtnSubmit, action, callbackClose }) {
    const [modalDeleteVisible, setModalDeleteVisible] = useState(true);

    const handleClose = () => {
        setModalDeleteVisible(false);
        callbackClose(false);
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#ffffff',
        border: '1px solid #ffffff',
        boxShadow: 24,
        p: 3,
        pr: 0
    };

    return (
        <>
            <Modal
                open={modalDeleteVisible}
                onClose={() => handleClose()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography id="modal-modal-content" component="h2" sx={{ mt: 0.5 }}>
                        {content}
                    </Typography>
                    <Grid container justifyContent="flex-end" spacing={5} sx={{ mt: 0.5 }}>
                        <Grid item xs={4}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleClose()}
                                >
                                    {textBtnBack}
                                </Button>
                            </AnimateButton>
                        </Grid>
                        <Grid item xs={3} style={{ paddingLeft: 0 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="error"
                                    onClick={action}
                                    sx={{ bgcolor: '#f5222d' }}
                                >
                                    {textBtnSubmit}
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </>
    );
}

export default ModalDelete;
