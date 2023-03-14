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
                    dispatch(raiseNotification({ visible: true, content: 'Update thành công', severity: 'success' }));
                })
                .catch((err) => {
                    setIsLoading(false);
                    console.log('err: ', err);
                    dispatch(raiseNotification({ visible: true, content: 'Update thất bại', severity: 'error' }));
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
                            {t('Thông tin người dùng')}
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
                                                            {t('Tên họ')}
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
                                                            {t('Số điện thoại')}
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
                                                            {t('Tuổi')}
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
                                                            {t('Giới tính')}
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
                                                                label={t('Nữ')}
                                                            />
                                                        </RadioGroup>
                                                    </Stack>
                                                </Grid>
                                                {path == 'student-list' && (
                                                    <>
                                                        <Grid item xs={10}>
                                                            <Stack spacing={1}>
                                                                <InputLabel htmlFor="user-religion" style={{ color: mainColor }}>
                                                                    {t('Tôn Giáo')}
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
                                                                    <MenuItem value={'None'}>Không</MenuItem>
                                                                    <MenuItem value={'Budhism'}>Đạo Phật</MenuItem>
                                                                    <MenuItem value={'Christian'}>Thiên Chúa Giáo</MenuItem>
                                                                    <MenuItem value={'Hindu'}>Đạo Hindu</MenuItem>
                                                                </Select>
                                                            </Stack>
                                                        </Grid>
                                                        <Grid item xs={10}>
                                                            <Stack spacing={1}>
                                                                <InputLabel htmlFor="user-grade" style={{ color: mainColor }}>
                                                                    {t('Năm')}
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
                                                                    <MenuItem value={'first'}>Năm nhất</MenuItem>
                                                                    <MenuItem value={'second'}>Năm hai</MenuItem>
                                                                    <MenuItem value={'third'}>Năm ba</MenuItem>
                                                                    <MenuItem value={'fouth'}>Năm bốn</MenuItem>
                                                                    <MenuItem value={'fifth'}>Năm năm</MenuItem>
                                                                </Select>
                                                            </Stack>
                                                        </Grid>
                                                        <Grid item xs={10}>
                                                            <Stack spacing={1}>
                                                                <InputLabel htmlFor="user-father-name" style={{ color: mainColor }}>
                                                                    {t('Họ và tên bố')}
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
                                                                    {t('Tuổi bố')}
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
                                                                    {t('Email bố')}
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
                                                                    {t('Số điện thoại bố')}
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
                                                                    {t('Nghề nghiệp của bố')}
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
                                                            {t('Quốc gia')}
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
                                                                    {t('Có hút thuốc?')}
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
                                                                    {t('Vai trò')}
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
                                                                    <MenuItem value={'BUILDING_MANAGER'}>Quản lí toà nhà</MenuItem>
                                                                    <MenuItem value={'FLOOR_MANAGER'}>Quản lí ktx</MenuItem>
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
                                                                    {t('Kí túc xá')}
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
                                                                    {t('Chuyên ngành')}
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
                                                                    <MenuItem value={'IT1'}>Khoa học máy tính</MenuItem>
                                                                    <MenuItem value={'IT2'}>Kĩ thuật máy tính</MenuItem>
                                                                    <MenuItem value={'IT3'}>Công nghệ thông tin</MenuItem>
                                                                    <MenuItem value={'BF1'}>Kĩ thuật sinh học</MenuItem>
                                                                    <MenuItem value={'BF2'}>Kĩ thuật thực phầm</MenuItem>
                                                                    <MenuItem value={'CH1'}>Kĩ thuật hoá học</MenuItem>
                                                                    <MenuItem value={'CH2'}>Hoá học</MenuItem>
                                                                    <MenuItem value={'CH3'}>Kĩ thuật in</MenuItem>
                                                                    <MenuItem value={'EE1'}>Kĩ thuật điện</MenuItem>
                                                                    <MenuItem value={'EE2'}>Kĩ thuật điều khiển-Tự động hoá</MenuItem>
                                                                    <MenuItem value={'EM1'}>Kinh tế công nghiệp</MenuItem>
                                                                    <MenuItem value={'EM2'}>Quản lí công nghiệp</MenuItem>
                                                                    <MenuItem value={'EM3'}>Quản trị kinh doanh</MenuItem>
                                                                    <MenuItem value={'EM4'}>Kế toán</MenuItem>
                                                                    <MenuItem value={'EM5'}>Tài chính ngân hàng</MenuItem>
                                                                    <MenuItem value={'ET1'}>Điện tử-Viễn thông</MenuItem>
                                                                    <MenuItem value={'HE1'}>Kĩ thuật nhiệt</MenuItem>
                                                                    <MenuItem value={'EV1'}>Kĩ thuật môi trường</MenuItem>
                                                                </Select>
                                                            </Stack>
                                                        </Grid>
                                                        <Grid item xs={10}>
                                                            <Stack spacing={1}>
                                                                <InputLabel htmlFor="user-mother-name" style={{ color: mainColor }}>
                                                                    {t('Họ và tên mẹ')}
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
                                                                    {t('Tuổi mẹ')}
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
                                                                    {t('Email mẹ')}
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
                                                                    {t('Số điện thoại mẹ')}
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
                                                                    {t('Nghề nghiệp của mẹ')}
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
                                                        {t('Thoát')}
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
