import React, { useEffect, useState } from 'react';
import { Grid, Stack, Typography, Checkbox, Box, Button, InputLabel, OutlinedInput, FormHelperText } from '@mui/material';
import { getBuildingByIdService, updateBuildingByIdService } from 'services/buildingService';
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

/**
 * Des: Get user details
 */
const BuildingDetail = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const profile = useSelector((state) => state.profile.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [building, setBuilding] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getBuildingById();
    }, []);

    const getBuildingById = () => {
        setTimeout(() => {
            getBuildingByIdService(id)
                .then((res) => {
                    setBuilding(res.data);
                    setIsLoading(false);
                })
                .catch((err) => {
                    setIsLoading(false);
                    console.log('err: ', err);
                });
        }, 500);
    };
    // Update user
    const updateBuilding = (values) => {
        setIsLoading(true);
        setTimeout(() => {
            updateBuildingByIdService(id, values)
                .then((res) => {
                    setIsLoading(false);
                    getBuildingById();
                    dispatch(raiseNotification({ visible: true, content: 'Update successfully', severity: 'success' }));
                })
                .catch((err) => {
                    setIsLoading(false);
                    console.log('err: ', err);
                    dispatch(raiseNotification({ visible: true, content: 'Update failed', severity: 'error' }));
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
                            {t('Building information')}
                        </Typography>
                        <img src="http://ctsv.hust.edu.vn/img/BK.jpg" alt="hust" width={200} style={{ width: 200, marginBottom: 20 }} />
                        <>
                            <Formik
                                enableReinitialize
                                initialValues={{
                                    name: building?.name,
                                    address: building?.address,
                                    numberOfFloors: building?.numberOfFloors
                                }}
                                validationSchema={Yup.object().shape({})}
                                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                                    updateBuilding(values);
                                }}
                            >
                                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                                    <form noValidate onSubmit={handleSubmit}>
                                        <Grid container>
                                            <Grid xs={10} sm={9} md={8} lg={7} xl={5} spacing={3}>
                                                <Grid item xs={10}>
                                                    <Stack spacing={1}>
                                                        <InputLabel htmlFor="user-name" style={{ color: mainColor }}>
                                                            {t('Building name')}
                                                            <StarRequired />
                                                        </InputLabel>
                                                        <OutlinedInput
                                                            id="building-name"
                                                            style={
                                                                profile.role == 'BUILDING_MANAGER'
                                                                    ? { backgroundColor: '', marginBottom: '1rem' }
                                                                    : { backgroundColor: '#eee', marginBottom: '1rem' }
                                                            }
                                                            name="name"
                                                            error={Boolean(touched.name && errors.name)}
                                                            onBlur={handleBlur}
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
                                                <Grid item xs={10}>
                                                    <Stack spacing={1}>
                                                        <InputLabel htmlFor="address" style={{ color: mainColor }}>
                                                            {t('Address')}
                                                        </InputLabel>
                                                        <OutlinedInput
                                                            id="address"
                                                            name="address"
                                                            style={{ marginBottom: '1rem', backgroundColor: '#eee' }}
                                                            value={values?.address}
                                                            readOnly
                                                        />
                                                    </Stack>
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <Stack spacing={1}>
                                                        <InputLabel style={{ color: mainColor }}>{t('Manager')}</InputLabel>
                                                        <OutlinedInput
                                                            id="manager"
                                                            style={{ marginBottom: '1rem', backgroundColor: '#eee' }}
                                                            value={building?.manager?.name}
                                                            readOnly
                                                        />
                                                    </Stack>
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <Stack spacing={1}>
                                                        <InputLabel htmlFor="number-of-floors" style={{ color: mainColor }}>
                                                            {t('Number of floors')}
                                                            <StarRequired />
                                                        </InputLabel>
                                                        <OutlinedInput
                                                            id="number-of-floors"
                                                            name="numberOfFloors"
                                                            error={Boolean(touched.numberOfFloors && errors.numberOfFloors)}
                                                            style={
                                                                profile.role == 'BUILDING_MANAGER'
                                                                    ? { backgroundColor: '', marginBottom: '1rem' }
                                                                    : { backgroundColor: '#eee', marginBottom: '1rem' }
                                                            }
                                                            value={values?.numberOfFloors}
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                        />
                                                        {touched.numberOfFloors && errors.numberOfFloors && (
                                                            <FormHelperText
                                                                error
                                                                style={{ margin: '-0.5rem 0 1rem 0' }}
                                                                id="helper-text-start-working-time"
                                                            >
                                                                {errors.numberOfFloors}
                                                            </FormHelperText>
                                                        )}
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                            <Grid xs={10} sm={9} md={8} lg={7} xl={5} spacing={3}>
                                                <InputLabel htmlFor="number-of-floors" style={{ color: mainColor, marginBottom: '5px' }}>
                                                    Room
                                                </InputLabel>
                                                <Grid container spacing={3}>
                                                    {building?.rooms?.map((item) => {
                                                        return (
                                                            <Grid item>
                                                                <AnimateButton>
                                                                    <Button
                                                                        disableElevation
                                                                        disabled={isSubmitting}
                                                                        size="large"
                                                                        variant="contained"
                                                                        color="primary"
                                                                    >
                                                                        {item.name}
                                                                    </Button>
                                                                </AnimateButton>
                                                            </Grid>
                                                        );
                                                    })}
                                                </Grid>
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
                                                        onClick={() => navigate(`/building`)}
                                                    >
                                                        {t('back')}
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

export default BuildingDetail;
