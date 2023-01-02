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

const AddRoomModal = ({ modalAddVisible, setModalAddVisible, newRoom, setNewRoom, handleAddNewRoom }) => {
    const { t } = useTranslation();
    const buildingManager = useSelector((state) => state.manager.buildingManager);
    const building = useSelector((state) => state.building.building);
    const floorManager = useSelector((state) => state.manager.floorManager);
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
                        Create Room
                    </Typography>
                    <Grid container sx={{ mt: 2.5 }}>
                        <Grid item xs={18}>
                            <InputLabel htmlFor="user-name" style={{ color: mainColor }}>
                                {t('Room name')}
                                <StarRequired />
                            </InputLabel>
                            <OutlinedInput
                                sx={{ width: '80%', my: 1 }}
                                onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={18}>
                            <InputLabel htmlFor="user-name" style={{ color: mainColor }}>
                                {t('Square')}
                                <StarRequired />
                            </InputLabel>
                            <OutlinedInput
                                sx={{ width: '80%', my: 1 }}
                                onChange={(e) => setNewRoom({ ...newRoom, square: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={18}>
                            <InputLabel htmlFor="user-name" style={{ color: mainColor }}>
                                {t('Max student allow')}
                                <StarRequired />
                            </InputLabel>
                            <OutlinedInput
                                sx={{ width: '80%', my: 1 }}
                                onChange={(e) => setNewRoom({ ...newRoom, maxStudentAllow: Number(e.target.value) })}
                            />
                        </Grid>
                        <Grid item xs={18}>
                            <InputLabel htmlFor="user-name" style={{ color: mainColor }}>
                                {t('Number of AC')}
                                <StarRequired />
                            </InputLabel>
                            <OutlinedInput
                                sx={{ width: '80%', my: 1 }}
                                onChange={(e) => setNewRoom({ ...newRoom, numberOfAirConditional: Number(e.target.value) })}
                            />
                        </Grid>
                        <Grid item xs={18}>
                            <InputLabel htmlFor="user-name" style={{ color: mainColor }}>
                                {t('Number of bed')}
                                <StarRequired />
                            </InputLabel>
                            <OutlinedInput
                                sx={{ width: '80%', my: 1 }}
                                onChange={(e) => setNewRoom({ ...newRoom, numberOfBed: Number(e.target.value) })}
                            />
                        </Grid>
                        <Grid item xs={18}>
                            <InputLabel htmlFor="user-name" style={{ color: mainColor }}>
                                {t('Number of fan')}
                                <StarRequired />
                            </InputLabel>
                            <OutlinedInput
                                sx={{ width: '80%', my: 1 }}
                                onChange={(e) => setNewRoom({ ...newRoom, numberOfFan: Number(e.target.value) })}
                            />
                        </Grid>
                        <Grid item xs={18}>
                            <InputLabel htmlFor="user-name" style={{ color: mainColor }}>
                                {t('Foreign only')}
                            </InputLabel>
                            <RadioGroup
                                row
                                onChange={(e) =>
                                    setNewRoom({
                                        ...newRoom,
                                        onlyForeign: e.target.value == 'true' ? true : false
                                    })
                                }
                            >
                                <FormControlLabel
                                    value={true}
                                    id="avaiable1"
                                    name="avaiable"
                                    control={<Radio />}
                                    label={t('Foreign only')}
                                />
                                <FormControlLabel
                                    value={false}
                                    id="avaiable2"
                                    name="avaiable"
                                    control={<Radio />}
                                    label={t('Not foreign only')}
                                />
                            </RadioGroup>
                        </Grid>
                        <Grid item xs={18}>
                            <InputLabel htmlFor="user-name" style={{ color: mainColor }}>
                                {t('Female only')}
                            </InputLabel>
                            <RadioGroup
                                row
                                onChange={(e) =>
                                    setNewRoom({
                                        ...newRoom,
                                        onlyFemale: e.target.value == 'true' ? true : false
                                    })
                                }
                            >
                                <FormControlLabel
                                    value={true}
                                    id="avaiable1"
                                    name="avaiable"
                                    control={<Radio />}
                                    label={t('Female only')}
                                />
                                <FormControlLabel
                                    value={false}
                                    id="avaiable2"
                                    name="avaiable"
                                    control={<Radio />}
                                    label={t('Not female only')}
                                />
                            </RadioGroup>
                        </Grid>
                        <Grid item xs={18}>
                            <InputLabel htmlFor="user-name" style={{ color: mainColor }}>
                                {t('Manager')}
                            </InputLabel>
                            <Select
                                size="small"
                                sx={{ width: '80%', my: 1 }}
                                onChange={(e) => setNewRoom({ ...newRoom, managerId: e.target.value })}
                            >
                                {buildingManager?.map((item) => {
                                    return <MenuItem value={item.id}>{item.name}</MenuItem>;
                                })}
                                {floorManager?.map((item) => {
                                    return <MenuItem value={item.id}>{item.name}</MenuItem>;
                                })}
                            </Select>
                        </Grid>
                        <Grid item xs={18}>
                            <InputLabel htmlFor="user-name" style={{ color: mainColor }}>
                                {t('Building')}
                            </InputLabel>
                            <Select
                                size="small"
                                sx={{ width: '80%', my: 1 }}
                                onChange={(e) => setNewRoom({ ...newRoom, buildingId: e.target.value })}
                            >
                                {building?.map((item) => {
                                    return <MenuItem value={item.id}>{item.name}</MenuItem>;
                                })}
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
                                    Back
                                </Button>
                            </AnimateButton>
                        </Grid>
                        <Grid item xs={3} style={{ paddingLeft: 0 }}>
                            <AnimateButton>
                                <Button disableElevation size="large" type="submit" variant="contained" onClick={handleAddNewRoom}>
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

export default AddRoomModal;
