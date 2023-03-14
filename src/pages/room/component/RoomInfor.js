import React, { useEffect, useState } from 'react';
import {
    Grid,
    Stack,
    Typography,
    Box,
    Button,
    InputLabel,
    OutlinedInput,
    TextField,
    FormHelperText,
    Select,
    MenuItem
} from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import { useParams, useNavigate } from 'react-router';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useDispatch, useSelector } from 'react-redux';
import { raiseNotification } from 'store/reducers/notification';
import { useTranslation } from 'react-i18next';
import LoadingPage from 'components/LoadingPage';
import { mainColor } from 'config';
import StarRequired from 'components/StarRequired';

const RoomInfor = ({ room, setRoom, updateRoomById }) => {
    const { t } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const buildingManager = useSelector((state) => state.manager.buildingManager);
    const floorManager = useSelector((state) => state.manager.floorManager);
    const profile = useSelector((state) => state.profile.profile);

    return (
        <React.Fragment>
            <Box sx={{ width: '100%', mr: 2 }}>
                <>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            name: room?.name,
                            square: room?.square,
                            maxStudentAllow: room?.maxStudentAllow,
                            numberOfBed: room?.numberOfBed,
                            numberOfAirConditional: room?.numberOfAirConditional,
                            numberOfFan: room?.numberOfFan,
                            onlyForeign: room?.onlyForeign,
                            onlyFemale: room?.onlyFemale,
                            note: room?.note,
                            managerId: room?.manager.id
                        }}
                        validationSchema={Yup.object().shape({})}
                        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                            updateRoomById(values);
                        }}
                    >
                        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                            <form noValidate onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="user-name" style={{ color: mainColor }}>
                                                {t('Tên phòng')}
                                                <StarRequired />
                                            </InputLabel>
                                            <OutlinedInput
                                                id="user-name"
                                                name="name"
                                                error={Boolean(touched.name && errors.name)}
                                                onBlur={handleBlur}
                                                style={{ marginBottom: '1rem' }}
                                                value={values?.name}
                                                onChange={handleChange}
                                            />
                                            {touched.name && errors.name && (
                                                <FormHelperText
                                                    style={{ margin: '-0.5rem 0 1rem 0' }}
                                                    error
                                                    id="standard-weight-helper-text-user-name"
                                                >
                                                    {errors.name}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="maxStudentAllow" style={{ color: mainColor }}>
                                                {t('Số lượng tối đa')}
                                                <StarRequired />
                                            </InputLabel>
                                            <OutlinedInput
                                                id="bed"
                                                name="maxStudentAllow"
                                                type="number"
                                                error={Boolean(touched.maxStudentAllow && errors.maxStudentAllow)}
                                                style={{ marginBottom: '1rem' }}
                                                value={values?.maxStudentAllow}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                            />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={4}></Grid>
                                    <Grid item xs={2}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="square" style={{ color: mainColor }}>
                                                {t('Diện tích')}
                                                <StarRequired />
                                            </InputLabel>
                                            <OutlinedInput
                                                id="square"
                                                name="square"
                                                error={Boolean(touched.square && errors.square)}
                                                style={{ marginBottom: '1rem' }}
                                                value={values?.square}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                            />
                                            {touched.square && errors.square && (
                                                <FormHelperText
                                                    error
                                                    style={{ margin: '-0.5rem 0 1rem 0' }}
                                                    id="helper-text-start-working-time"
                                                >
                                                    {errors.square}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="bed" style={{ color: mainColor }}>
                                                {t('Giường')}
                                                <StarRequired />
                                            </InputLabel>
                                            <OutlinedInput
                                                id="bed"
                                                name="numberOfBed"
                                                type="number"
                                                error={Boolean(touched.numberOfBed && errors.numberOfBed)}
                                                style={{ marginBottom: '1rem' }}
                                                value={values?.numberOfBed}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                            />
                                            {touched.numberOfBed && errors.numberOfBed && (
                                                <FormHelperText
                                                    error
                                                    style={{ margin: '-0.5rem 0 1rem 0' }}
                                                    id="helper-text-finish-working-time"
                                                >
                                                    {errors.numberOfBed}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="finish-time" style={{ color: mainColor }}>
                                                {t('Điều hoà')}
                                                <StarRequired />
                                            </InputLabel>
                                            <OutlinedInput
                                                id="finish-time"
                                                name="numberOfAirConditional"
                                                type="number"
                                                error={Boolean(touched.numberOfAirConditional && errors.numberOfAirConditional)}
                                                style={{ marginBottom: '1rem' }}
                                                value={values?.numberOfAirConditional}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                            />
                                            {touched.numberOfAirConditional && errors.numberOfAirConditional && (
                                                <FormHelperText
                                                    error
                                                    style={{ margin: '-0.5rem 0 1rem 0' }}
                                                    id="helper-text-finish-working-time"
                                                >
                                                    {errors.numberOfAirConditional}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="fan" style={{ color: mainColor }}>
                                                {t('Quạt trần')}
                                                <StarRequired />
                                            </InputLabel>
                                            <OutlinedInput
                                                id="fan"
                                                name="numberOfBed"
                                                type="number"
                                                error={Boolean(touched.numberOfFan && errors.numberOfFan)}
                                                style={{ marginBottom: '1rem' }}
                                                value={values?.numberOfFan}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                            />
                                            {touched.numberOfFan && errors.numberOfFan && (
                                                <FormHelperText
                                                    error
                                                    style={{ margin: '-0.5rem 0 1rem 0' }}
                                                    id="helper-text-finish-working-time"
                                                >
                                                    {errors.numberOfFan}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={4}></Grid>
                                    <Grid item xs={4}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="foreign" style={{ color: mainColor }}>
                                                {t('Phòng quốc tế')} <StarRequired />
                                            </InputLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                value={values?.onlyForeign}
                                                onChange={handleChange}
                                            >
                                                <FormControlLabel
                                                    value={true}
                                                    name="onlyForeign"
                                                    control={<Radio />}
                                                    label={t('Nước ngoài')}
                                                />
                                                <FormControlLabel value={false} name="onlyForeign" control={<Radio />} label={t('Không')} />
                                            </RadioGroup>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="female" style={{ color: mainColor }}>
                                                {t('Phòng cho nữ')} <StarRequired />
                                            </InputLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                value={values?.onlyFemale}
                                                onChange={handleChange}
                                            >
                                                <FormControlLabel
                                                    value={true}
                                                    name="onlyFemale"
                                                    control={<Radio />}
                                                    label={t('Phòng nữ')}
                                                />
                                                <FormControlLabel value={false} name="onlyFemale" control={<Radio />} label={t('Không')} />
                                            </RadioGroup>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="user-name" style={{ color: mainColor }}>
                                                {t('Quản lí')}
                                                <StarRequired />
                                            </InputLabel>
                                            <Select
                                                id="user-name"
                                                name="managerId"
                                                error={Boolean(touched.managerId && errors.managerId)}
                                                onBlur={handleBlur}
                                                style={
                                                    profile.role == 'BUILDING_MANAGER'
                                                        ? { backgroundColor: '', marginBottom: '1rem' }
                                                        : { backgroundColor: '#eee', marginBottom: '1rem' }
                                                }
                                                value={values?.managerId}
                                                onChange={profile.role == 'BUILDING_MANAGER' ? handleChange : undefined}
                                            >
                                                {buildingManager?.map((item) => {
                                                    return <MenuItem value={item.id}>{item.name}</MenuItem>;
                                                })}
                                                {floorManager?.map((item) => {
                                                    return <MenuItem value={item.id}>{item.name}</MenuItem>;
                                                })}
                                            </Select>
                                            {touched.name && errors.name && (
                                                <FormHelperText
                                                    style={{ margin: '-0.5rem 0 1rem 0' }}
                                                    error
                                                    id="standard-weight-helper-text-user-name"
                                                >
                                                    {errors.name}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={6}></Grid>
                                    <Grid item xs={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="user-note" style={{ color: mainColor }}>
                                                {t('Note')}
                                                <StarRequired />
                                            </InputLabel>
                                            <OutlinedInput
                                                id="user-note"
                                                name="note"
                                                error={Boolean(touched.note && errors.note)}
                                                onBlur={handleBlur}
                                                minRows={4}
                                                maxRows={4}
                                                multiline
                                                style={{ marginBottom: '1rem' }}
                                                value={values?.note}
                                                onChange={handleChange}
                                            />
                                            {touched.note && errors.note && (
                                                <FormHelperText
                                                    style={{ margin: '-0.5rem 0 1rem 0' }}
                                                    error
                                                    id="standard-weight-helper-text-user-note"
                                                >
                                                    {errors.note}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3} sx={{ mt: 1 }}>
                                    <Grid item>
                                        <AnimateButton>
                                            <Button
                                                disableElevation
                                                size="large"
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => navigate(`/room`)}
                                            >
                                                {t('Quay lại')}
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                    <Grid item>
                                        <AnimateButton>
                                            <Button
                                                disableElevation
                                                disabled={isSubmitting}
                                                size="large"
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                            >
                                                {t('Update')}
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                </Grid>
                            </form>
                        )}
                    </Formik>
                </>
            </Box>
        </React.Fragment>
    );
};

export default RoomInfor;
