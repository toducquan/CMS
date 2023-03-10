import React, { useEffect, useState } from 'react';
import { Grid, Stack, Typography, Checkbox, Box, Button, InputLabel, OutlinedInput, FormHelperText, Select, MenuItem } from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import { useParams, useNavigate } from 'react-router';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useDispatch, useSelector } from 'react-redux';
import { raiseNotification } from 'store/reducers/notification';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Formik } from 'formik';
import StarRequired from 'components/StarRequired';
import { mainColor } from 'config';
import LoadingPage from 'components/LoadingPage';
import { getUserByIdService, updateUserByIdService } from 'services/userService';

const UserDetail = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const profile = useSelector((state) => state.profile.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const path = window.location.pathname.split('/')[2];

    useEffect(() => {
        setIsLoading(true);
        getUserById();
    }, [window.location.pathname]);

    const getUserById = () => {
        setTimeout(() => {
            getUserByIdService(id)
                .then((res) => {
                    setUser(res.data);
                    setIsLoading(false);
                })
                .catch((err) => {
                    setIsLoading(false);
                    console.log('err: ', err);
                });
        }, 500);
    };
    // Update user
    const updateUser = (values) => {
        setIsLoading(true);
        setTimeout(() => {
            updateUserByIdService(id, values)
                .then((res) => {
                    setIsLoading(false);
                    getUserById();
                    dispatch(raiseNotification({ visible: true, content: 'Update th??nh c??ng', severity: 'success' }));
                })
                .catch((err) => {
                    setIsLoading(false);
                    console.log('err: ', err);
                    dispatch(raiseNotification({ visible: true, content: 'Update th???t b???i', severity: 'error' }));
                });
        }, 500);
    };

    return (
        <>
            {isLoading ? (
                <LoadingPage />
            ) : (
                <React.Fragment>
                    <Box sx={{ width: '100%', mr: 2 }}>
                        <Typography id="modal-modal-title" variant="h4" component="h2" sx={{ mb: 2 }}>
                            {t('Th??ng tin ng?????i d??ng')}
                        </Typography>
                        <>
                            <Formik
                                enableReinitialize
                                initialValues={{
                                    name: user?.name,
                                    email: user?.email,
                                    phone: user?.phone,
                                    gender: user?.gender,
                                    isSmoking: user?.isSmoking,
                                    religion: user?.religion,
                                    region: user?.region,
                                    age: user?.age,
                                    role: user?.role,
                                    studentId: user?.studentId,
                                    fatherName: user?.fatherName,
                                    fatherAge: user?.fatherAge,
                                    fatherEmail: user?.fatherEmail,
                                    fatherPhone: user?.fatherPhone,
                                    fatherOccupation: user?.fatherOccupation,
                                    motherOccupation: user?.motherOccupation,
                                    motherName: user?.motherName,
                                    motherAge: user?.motherAge,
                                    motherEmail: user?.motherEmail,
                                    motherPhone: user?.motherPhone,
                                    grade: user?.grade,
                                    major: user?.major,
                                    room: user?.room?.name
                                }}
                                validationSchema={Yup.object().shape({})}
                                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                                    updateUser(values);
                                }}
                            >
                                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                                    <form noValidate onSubmit={handleSubmit}>
                                        <Grid container>
                                            <Grid xs={10} sm={9} md={8} lg={7} xl={5} spacing={3}>
                                                <Grid item xs={10}>
                                                    <Stack spacing={1}>
                                                        <InputLabel htmlFor="user-name" style={{ color: mainColor }}>
                                                            {t('T??n h???')}
                                                            <StarRequired />
                                                        </InputLabel>
                                                        <OutlinedInput
                                                            id="user-name"
                                                            style={{ backgroundColor: '#eee', marginBottom: '1rem' }}
                                                            name="name"
                                                            error={Boolean(touched.name && errors.name)}
                                                            onBlur={handleBlur}
                                                            value={values?.name}
                                                        />
                                                    </Stack>
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <Stack spacing={1}>
                                                        <InputLabel htmlFor="user-phone" style={{ color: mainColor }}>
                                                            {t('S??? ??i???n tho???i')}
                                                            <StarRequired />
                                                        </InputLabel>
                                                        <OutlinedInput
                                                            id="user-phone"
                                                            style={{ backgroundColor: '#eee', marginBottom: '1rem' }}
                                                            name="phone"
                                                            error={Boolean(touched.phone && errors.phone)}
                                                            onBlur={handleBlur}
                                                            value={values?.phone}
                                                        />
                                                    </Stack>
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <Stack spacing={1}>
                                                        <InputLabel htmlFor="user-age" style={{ color: mainColor }}>
                                                            {t('Tu???i')}
                                                            <StarRequired />
                                                        </InputLabel>
                                                        <OutlinedInput
                                                            id="user-age"
                                                            style={{ backgroundColor: '#eee', marginBottom: '1rem' }}
                                                            name="age"
                                                            error={Boolean(touched.age && errors.age)}
                                                            onBlur={handleBlur}
                                                            value={values?.age}
                                                        />
                                                    </Stack>
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <Stack spacing={1}>
                                                        <InputLabel htmlFor="user-age" style={{ color: mainColor }}>
                                                            {t('Gi???i t??nh')}
                                                            <StarRequired />
                                                        </InputLabel>
                                                        <RadioGroup
                                                            row
                                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                                            value={values?.gender}
                                                        >
                                                            <FormControlLabel
                                                                value={'Male'}
                                                                name="gender"
                                                                control={<Radio />}
                                                                label={t('Nam')}
                                                            />
                                                            <FormControlLabel
                                                                value={'Female'}
                                                                name="gender"
                                                                control={<Radio />}
                                                                label={t('N???')}
                                                            />
                                                        </RadioGroup>
                                                    </Stack>
                                                </Grid>
                                                {path == 'student-list' && (
                                                    <>
                                                        <Grid item xs={10}>
                                                            <Stack spacing={1}>
                                                                <InputLabel htmlFor="user-religion" style={{ color: mainColor }}>
                                                                    {t('T??n Gi??o')}
                                                                    <StarRequired />
                                                                </InputLabel>
                                                                <Select
                                                                    id="user-name"
                                                                    name="religion"
                                                                    error={Boolean(touched.religion && errors.religion)}
                                                                    onBlur={handleBlur}
                                                                    value={values.religion}
                                                                    style={{ backgroundColor: '#eee', marginBottom: '1rem' }}
                                                                >
                                                                    <MenuItem value={'None'}>Kh??ng</MenuItem>
                                                                    <MenuItem value={'Budhism'}>?????o Ph???t</MenuItem>
                                                                    <MenuItem value={'Christian'}>Thi??n Ch??a Gi??o</MenuItem>
                                                                    <MenuItem value={'Hindu'}>?????o Hindu</MenuItem>
                                                                </Select>
                                                            </Stack>
                                                        </Grid>
                                                        <Grid item xs={10}>
                                                            <Stack spacing={1}>
                                                                <InputLabel htmlFor="user-grade" style={{ color: mainColor }}>
                                                                    {t('N??m')}
                                                                    <StarRequired />
                                                                </InputLabel>
                                                                <Select
                                                                    id="grade-login"
                                                                    type="grade"
                                                                    style={{ backgroundColor: '#eee', marginBottom: '1rem' }}
                                                                    value={values.grade}
                                                                    name="grade"
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                    fullWidth
                                                                    error={Boolean(touched.grade && errors.grade)}
                                                                >
                                                                    <MenuItem value={'first'}>N??m nh???t</MenuItem>
                                                                    <MenuItem value={'second'}>N??m hai</MenuItem>
                                                                    <MenuItem value={'third'}>N??m ba</MenuItem>
                                                                    <MenuItem value={'fouth'}>N??m b???n</MenuItem>
                                                                    <MenuItem value={'fifth'}>N??m n??m</MenuItem>
                                                                </Select>
                                                            </Stack>
                                                        </Grid>
                                                        <Grid item xs={10}>
                                                            <Stack spacing={1}>
                                                                <InputLabel htmlFor="user-father-name" style={{ color: mainColor }}>
                                                                    {t('H??? v?? t??n b???')}
                                                                </InputLabel>
                                                                <OutlinedInput
                                                                    id="user-father-name"
                                                                    style={{ backgroundColor: '#eee', marginBottom: '1rem' }}
                                                                    name="fatherName"
                                                                    error={Boolean(touched.fatherName && errors.fatherName)}
                                                                    onBlur={handleBlur}
                                                                    value={values?.fatherName}
                                                                />
                                                            </Stack>
                                                        </Grid>
                                                        <Grid item xs={10}>
                                                            <Stack spacing={1}>
                                                                <InputLabel htmlFor="user-father-age" style={{ color: mainColor }}>
                                                                    {t('Tu???i b???')}
                                                                </InputLabel>
                                                                <OutlinedInput
                                                                    id="user-father-age"
                                                                    style={{ backgroundColor: '#eee', marginBottom: '1rem' }}
                                                                    name="fatherAge"
                                                                    error={Boolean(touched.fatherAge && errors.fatherAge)}
                                                                    onBlur={handleBlur}
                                                                    value={values?.fatherAge}
                                                                />
                                                            </Stack>
                                                        </Grid>
                                                        <Grid item xs={10}>
                                                            <Stack spacing={1}>
                                                                <InputLabel htmlFor="user-father-email" style={{ color: mainColor }}>
                                                                    {t('Email b???')}
                                                                </InputLabel>
                                                                <OutlinedInput
                                                                    id="user-father-email"
                                                                    style={{ backgroundColor: '#eee', marginBottom: '1rem' }}
                                                                    name="fatherEmail"
                                                                    error={Boolean(touched.fatherEmail && errors.fatherEmail)}
                                                                    onBlur={handleBlur}
                                                                    value={values?.fatherEmail}
                                                                />
                                                            </Stack>
                                                        </Grid>
                                                        <Grid item xs={10}>
                                                            <Stack spacing={1}>
                                                                <InputLabel htmlFor="user-father-phone" style={{ color: mainColor }}>
                                                                    {t('S??? ??i???n tho???i b???')}
                                                                </InputLabel>
                                                                <OutlinedInput
                                                                    id="user-father-phone"
                                                                    style={{ backgroundColor: '#eee', marginBottom: '1rem' }}
                                                                    name="fatherPhone"
                                                                    error={Boolean(touched.fatherPhone && errors.fatherPhone)}
                                                                    onBlur={handleBlur}
                                                                    value={values?.fatherPhone}
                                                                />
                                                            </Stack>
                                                        </Grid>
                                                        <Grid item xs={10}>
                                                            <Stack spacing={1}>
                                                                <InputLabel htmlFor="user-father-occupation" style={{ color: mainColor }}>
                                                                    {t('Ngh??? nghi???p c???a b???')}
                                                                </InputLabel>
                                                                <OutlinedInput
                                                                    id="user-father-occupation"
                                                                    style={{ backgroundColor: '#eee', marginBottom: '1rem' }}
                                                                    name="fatherOccupation"
                                                                    error={Boolean(touched.fatherOccupation && errors.fatherOccupation)}
                                                                    onBlur={handleBlur}
                                                                    value={values?.fatherOccupation}
                                                                />
                                                            </Stack>
                                                        </Grid>
                                                    </>
                                                )}
                                            </Grid>
                                            <Grid xs={10} sm={9} md={8} lg={7} xl={5} spacing={3}>
                                                <Grid item xs={10}>
                                                    <Stack spacing={1}>
                                                        <InputLabel htmlFor="email" style={{ color: mainColor }}>
                                                            {t('Email')}
                                                            <StarRequired />
                                                        </InputLabel>
                                                        <OutlinedInput
                                                            id="email"
                                                            style={{ backgroundColor: '#eee', marginBottom: '1rem' }}
                                                            name="email"
                                                            error={Boolean(touched.email && errors.email)}
                                                            onBlur={handleBlur}
                                                            value={values?.email}
                                                        />
                                                    </Stack>
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <Stack spacing={1}>
                                                        <InputLabel htmlFor="region" style={{ color: mainColor }}>
                                                            {t('Qu???c gia')}
                                                            <StarRequired />
                                                        </InputLabel>
                                                        <OutlinedInput
                                                            id="region"
                                                            style={{ backgroundColor: '#eee', marginBottom: '1rem' }}
                                                            name="region"
                                                            error={Boolean(touched.region && errors.region)}
                                                            onBlur={handleBlur}
                                                            value={values?.region}
                                                        />
                                                    </Stack>
                                                </Grid>
                                                {path == 'student-list' ? (
                                                    <>
                                                        <Grid item xs={10}>
                                                            <Stack spacing={1}>
                                                                <InputLabel htmlFor="user-student-id" style={{ color: mainColor }}>
                                                                    {t('Mssv')}
                                                                    <StarRequired />
                                                                </InputLabel>
                                                                <OutlinedInput
                                                                    id="user-student-id"
                                                                    style={{ backgroundColor: '#eee', marginBottom: '1rem' }}
                                                                    name="studentId"
                                                                    error={Boolean(touched.studentId && errors.studentId)}
                                                                    onBlur={handleBlur}
                                                                    value={values?.studentId}
                                                                />
                                                            </Stack>
                                                        </Grid>
                                                        <Grid item xs={10}>
                                                            <Stack spacing={1}>
                                                                <InputLabel htmlFor="user-age" style={{ color: mainColor }}>
                                                                    {t('C?? h??t thu???c?')}
                                                                    <StarRequired />
                                                                </InputLabel>
                                                                <RadioGroup
                                                                    row
                                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                                    value={values?.isSmoking}
                                                                    onChange={handleChange}
                                                                >
                                                                    <FormControlLabel
                                                                        value={true}
                                                                        name="isSmoking"
                                                                        control={<Radio />}
                                                                        label={t('Smoking')}
                                                                    />
                                                                    <FormControlLabel
                                                                        value={false}
                                                                        name="isSmoking"
                                                                        control={<Radio />}
                                                                        label={t('None')}
                                                                    />
                                                                </RadioGroup>
                                                            </Stack>
                                                        </Grid>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Grid item xs={10}>
                                                            <Stack spacing={1}>
                                                                <InputLabel htmlFor="user-student-id" style={{ color: mainColor }}>
                                                                    {t('Vai tr??')}
                                                                    <StarRequired />
                                                                </InputLabel>
                                                                <Select
                                                                    id="user-name"
                                                                    name="role"
                                                                    error={Boolean(touched.role && errors.role)}
                                                                    onBlur={handleBlur}
                                                                    style={
                                                                        profile.role == 'BUILDING_MANAGER'
                                                                            ? { backgroundColor: '', marginBottom: '1rem' }
                                                                            : { backgroundColor: '#eee', marginBottom: '1rem' }
                                                                    }
                                                                    onChange={handleChange}
                                                                    value={values?.role}
                                                                >
                                                                    <MenuItem value={'BUILDING_MANAGER'}>Qu???n l?? to?? nh??</MenuItem>
                                                                    <MenuItem value={'FLOOR_MANAGER'}>Qu???n l?? ktx</MenuItem>
                                                                </Select>
                                                            </Stack>
                                                        </Grid>
                                                    </>
                                                )}

                                                {path == 'student-list' && (
                                                    <>
                                                        <Grid item xs={10}>
                                                            <Stack spacing={1}>
                                                                <InputLabel htmlFor="user-room" style={{ color: mainColor }}>
                                                                    {t('K?? t??c x??')}
                                                                    <StarRequired />
                                                                </InputLabel>
                                                                <OutlinedInput
                                                                    id="user-room"
                                                                    style={{ backgroundColor: '#eee', marginBottom: '1rem' }}
                                                                    name="room"
                                                                    error={Boolean(touched.room && errors.room)}
                                                                    onBlur={handleBlur}
                                                                    value={values?.room}
                                                                />
                                                            </Stack>
                                                        </Grid>
                                                        <Grid item xs={10}>
                                                            <Stack spacing={1}>
                                                                <InputLabel htmlFor="user-major" style={{ color: mainColor }}>
                                                                    {t('Chuy??n ng??nh')}
                                                                    <StarRequired />
                                                                </InputLabel>
                                                                <Select
                                                                    fullWidth
                                                                    error={Boolean(touched.major && errors.major)}
                                                                    id="major-signup"
                                                                    style={{ backgroundColor: '#eee', marginBottom: '1rem' }}
                                                                    type="major"
                                                                    value={values.major}
                                                                    name="major"
                                                                    onBlur={handleBlur}
                                                                    inputProps={{}}
                                                                >
                                                                    <MenuItem value={'IT1'}>Khoa h???c m??y t??nh</MenuItem>
                                                                    <MenuItem value={'IT2'}>K?? thu???t m??y t??nh</MenuItem>
                                                                    <MenuItem value={'IT3'}>C??ng ngh??? th??ng tin</MenuItem>
                                                                    <MenuItem value={'BF1'}>K?? thu???t sinh h???c</MenuItem>
                                                                    <MenuItem value={'BF2'}>K?? thu???t th???c ph???m</MenuItem>
                                                                    <MenuItem value={'CH1'}>K?? thu???t ho?? h???c</MenuItem>
                                                                    <MenuItem value={'CH2'}>Ho?? h???c</MenuItem>
                                                                    <MenuItem value={'CH3'}>K?? thu???t in</MenuItem>
                                                                    <MenuItem value={'EE1'}>K?? thu???t ??i???n</MenuItem>
                                                                    <MenuItem value={'EE2'}>K?? thu???t ??i???u khi???n-T??? ?????ng ho??</MenuItem>
                                                                    <MenuItem value={'EM1'}>Kinh t??? c??ng nghi???p</MenuItem>
                                                                    <MenuItem value={'EM2'}>Qu???n l?? c??ng nghi???p</MenuItem>
                                                                    <MenuItem value={'EM3'}>Qu???n tr??? kinh doanh</MenuItem>
                                                                    <MenuItem value={'EM4'}>K??? to??n</MenuItem>
                                                                    <MenuItem value={'EM5'}>T??i ch??nh ng??n h??ng</MenuItem>
                                                                    <MenuItem value={'ET1'}>??i???n t???-Vi???n th??ng</MenuItem>
                                                                    <MenuItem value={'HE1'}>K?? thu???t nhi???t</MenuItem>
                                                                    <MenuItem value={'EV1'}>K?? thu???t m??i tr?????ng</MenuItem>
                                                                </Select>
                                                            </Stack>
                                                        </Grid>
                                                        <Grid item xs={10}>
                                                            <Stack spacing={1}>
                                                                <InputLabel htmlFor="user-mother-name" style={{ color: mainColor }}>
                                                                    {t('H??? v?? t??n m???')}
                                                                </InputLabel>
                                                                <OutlinedInput
                                                                    id="user-mother-name"
                                                                    style={{ backgroundColor: '#eee', marginBottom: '1rem' }}
                                                                    name="motherName"
                                                                    error={Boolean(touched.motherName && errors.motherName)}
                                                                    onBlur={handleBlur}
                                                                    value={values?.motherName}
                                                                />
                                                            </Stack>
                                                        </Grid>
                                                        <Grid item xs={10}>
                                                            <Stack spacing={1}>
                                                                <InputLabel htmlFor="user-mother-age" style={{ color: mainColor }}>
                                                                    {t('Tu???i m???')}
                                                                </InputLabel>
                                                                <OutlinedInput
                                                                    id="user-mother-age"
                                                                    style={{ backgroundColor: '#eee', marginBottom: '1rem' }}
                                                                    name="motherAge"
                                                                    error={Boolean(touched.motherAge && errors.motherAge)}
                                                                    onBlur={handleBlur}
                                                                    value={values?.motherAge}
                                                                />
                                                            </Stack>
                                                        </Grid>
                                                        <Grid item xs={10}>
                                                            <Stack spacing={1}>
                                                                <InputLabel htmlFor="user-mother-email" style={{ color: mainColor }}>
                                                                    {t('Email m???')}
                                                                </InputLabel>
                                                                <OutlinedInput
                                                                    id="user-mother-email"
                                                                    style={{ backgroundColor: '#eee', marginBottom: '1rem' }}
                                                                    name="motherEmail"
                                                                    error={Boolean(touched.motherEmail && errors.motherEmail)}
                                                                    onBlur={handleBlur}
                                                                    value={values?.motherEmail}
                                                                />
                                                            </Stack>
                                                        </Grid>
                                                        <Grid item xs={10}>
                                                            <Stack spacing={1}>
                                                                <InputLabel htmlFor="user-mother-phone" style={{ color: mainColor }}>
                                                                    {t('S??? ??i???n tho???i m???')}
                                                                </InputLabel>
                                                                <OutlinedInput
                                                                    id="user-mother-phone"
                                                                    style={{ backgroundColor: '#eee', marginBottom: '1rem' }}
                                                                    name="motherPhone"
                                                                    error={Boolean(touched.motherPhone && errors.motherPhone)}
                                                                    onBlur={handleBlur}
                                                                    value={values?.motherPhone}
                                                                />
                                                            </Stack>
                                                        </Grid>
                                                        <Grid item xs={10}>
                                                            <Stack spacing={1}>
                                                                <InputLabel htmlFor="user-mother-occupation" style={{ color: mainColor }}>
                                                                    {t('Ngh??? nghi???p c???a m???')}
                                                                </InputLabel>
                                                                <OutlinedInput
                                                                    id="user-mother-occupation"
                                                                    style={{ backgroundColor: '#eee', marginBottom: '1rem' }}
                                                                    name="motherOccupation"
                                                                    error={Boolean(touched.motherOccupation && errors.motherOccupation)}
                                                                    onBlur={handleBlur}
                                                                    value={values?.motherOccupation}
                                                                />
                                                            </Stack>
                                                        </Grid>
                                                    </>
                                                )}
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
                                                        onClick={() => navigate(`/user/${path}`)}
                                                    >
                                                        {t('Tho??t')}
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
            )}
        </>
    );
};

export default UserDetail;
