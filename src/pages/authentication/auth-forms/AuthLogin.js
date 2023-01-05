import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material-ui
import { Button, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import FirebaseSocial from './FirebaseSocial';
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { loginUserService } from 'services/authService';

import { useTranslation } from 'react-i18next';
// ============================|| FIREBASE - LOGIN ||============================ //

// Des: Form login
const AuthLogin = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const StarRequired = () => {
        return <span style={{ color: 'red' }}>*</span>;
    };

    return (
        <>
            <Formik
                initialValues={{
                    email: 'admin@gmail.com',
                    password: 'rewq1234'
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().trim().email(t('Email is not valid')).required(t('Email is require')),
                    password: Yup.string().required(t('Password is require'))
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    setLoading(true);
                    loginUserService(values)
                        .then((res) => {
                            setStatus({ success: false });
                            setSubmitting(false);
                            navigate(`/`);
                            setLoading(false);
                        })
                        .catch((err) => {
                            setStatus({ success: false });
                            setSubmitting(false);
                            setLoading(false);
                        });
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="email-login">
                                        {t('Email Address')}
                                        <StarRequired />
                                    </InputLabel>

                                    <OutlinedInput
                                        id="email-login"
                                        type="email"
                                        value={values.email}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder={t('Enter please')}
                                        fullWidth
                                        error={Boolean(touched.email && errors.email)}
                                    />
                                    {touched.email && errors.email && (
                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                            {errors.email}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="password-login">
                                        {t('Password')}
                                        <StarRequired />
                                    </InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.password && errors.password)}
                                        id="password-login"
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        placeholder={t('Enter please')}
                                    />
                                    {touched.password && errors.password && (
                                        <FormHelperText error id="standard-weight-helper-text-password-login">
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}

                            <Grid item xs={12}>
                                <LoadingButton
                                    disableElevation
                                    disabled={isSubmitting}
                                    loading={loading}
                                    type="submit"
                                    fullWidth
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                >
                                    Login
                                </LoadingButton>
                            </Grid>
                            {/* <Grid item xs={12}>
                                <Divider>
                                    <Typography variant="caption"> {t('login_with')}</Typography>
                                </Divider>
                            </Grid>
                            <Grid item xs={12}>
                                <FirebaseSocial />
                            </Grid> */}
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default AuthLogin;
