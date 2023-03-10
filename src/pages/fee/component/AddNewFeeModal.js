import { useState } from 'react';
import Modal from '@mui/material/Modal';
import { Grid, Typography, Box, Button, InputLabel, OutlinedInput, Select, MenuItem } from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import StarRequired from 'components/StarRequired';
import { useTranslation } from 'react-i18next';
import { mainColor } from 'config';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useDispatch, useSelector } from 'react-redux';

const AddNewFeeModal = ({ modalAddVisible, setModalAddVisible, newFee, setNewFee, handleAddNewFee }) => {
    const { t } = useTranslation();
    const room = useSelector((state) => state.room.room);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: '#ffffff',
        border: '1px solid #ffffff',
        boxShadow: 24,
        p: 3,
        pr: 0
    };
    return (
        <>
            <Modal
                open={modalAddVisible}
                onClose={() => setModalAddVisible(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        Tạo khoản phí mới
                    </Typography>
                    <Grid container sx={{ mt: 2.5 }}>
                        <Grid item xs={18}>
                            <InputLabel htmlFor="user-name" style={{ color: mainColor }}>
                                {t('Tên khoản phí')}
                                <StarRequired />
                            </InputLabel>
                            <OutlinedInput sx={{ width: '80%', my: 1 }} onChange={(e) => setNewFee({ ...newFee, name: e.target.value })} />
                        </Grid>
                        <Grid item xs={18}>
                            <InputLabel htmlFor="user-name" style={{ color: mainColor }}>
                                {t('Phải thu')}
                                <StarRequired />
                            </InputLabel>
                            <OutlinedInput
                                sx={{ width: '80%', my: 1 }}
                                onChange={(e) => setNewFee({ ...newFee, cost: Number(e.target.value) })}
                            />
                        </Grid>
                        <Grid item xs={18}>
                            <InputLabel htmlFor="user-name" style={{ color: mainColor }}>
                                {t('Phòng')}
                            </InputLabel>
                            <Select
                                size="small"
                                sx={{ width: '80%', my: 1 }}
                                onChange={(e) => setNewFee({ ...newFee, roomId: e.target.value })}
                            >
                                {room?.map((item) => {
                                    return <MenuItem value={item.id}>{item.name}</MenuItem>;
                                })}
                            </Select>
                        </Grid>
                        <Grid item xs={18}>
                            <InputLabel htmlFor="user-name" style={{ color: mainColor }}>
                                {t('Loại')}
                            </InputLabel>
                            <Select
                                size="small"
                                sx={{ width: '80%', my: 1 }}
                                onChange={(e) => setNewFee({ ...newFee, type: e.target.value })}
                            >
                                <MenuItem value={'Electric'}>Tiền điện</MenuItem>
                                <MenuItem value={'Water'}>Tiền nước</MenuItem>
                                <MenuItem value={'Internet'}>Tiền mạng</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="flex-end" spacing={5} sx={{ mt: 0.5 }}>
                        <Grid item xs={3}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => setModalAddVisible(false)}
                                >
                                    Thoát
                                </Button>
                            </AnimateButton>
                        </Grid>
                        <Grid item xs={3} style={{ paddingLeft: 0 }}>
                            <AnimateButton>
                                <Button disableElevation size="large" type="submit" variant="contained" onClick={handleAddNewFee}>
                                    Submit
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </>
    );
};

export default AddNewFeeModal;
