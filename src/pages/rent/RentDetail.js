import React, { useEffect, useState, useRef } from 'react';
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
import { getRentByIdService, updateRentByIdService } from 'services/rentService';
import * as moment from 'moment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import Breakword from 'components/common/breakword/index';
import EmptyRows from 'components/EmptyRows';

const RentDetail = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const profile = useSelector((state) => state.profile.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [rent, setRent] = useState();
    const tableRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [selectStudents, setSelectStudents] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        getRentById();
    }, []);

    const getRentById = () => {
        setTimeout(() => {
            getRentByIdService(id)
                .then((res) => {
                    setRent(res.data);
                    setIsLoading(false);
                })
                .catch((err) => {
                    setIsLoading(false);
                    console.log('err: ', err);
                });
        }, 500);
    };
    // Update user
    const updateRent = (values) => {
        setIsLoading(true);
        setTimeout(() => {
            updateRentByIdService(id, values)
                .then((res) => {
                    setIsLoading(false);
                    getRentById();
                    dispatch(raiseNotification({ visible: true, content: 'Update thành công', severity: 'success' }));
                })
                .catch((err) => {
                    setIsLoading(false);
                    console.log('err: ', err);
                    dispatch(raiseNotification({ visible: true, content: 'Update thất bại', severity: 'error' }));
                });
        }, 500);
    };

    const handleClickCheckBox = (id) => {
        let arr;
        const idExist = selectStudents.filter((item) => {
            return item == id;
        });
        if (idExist.length == 0) {
            arr = [...selectStudents];
            arr.push(id);
        } else {
            arr = selectStudents.filter((item) => {
                return item != id;
            });
        }
        setSelectStudents([...arr]);
    };

    return (
        <>
            {isLoading ? (
                <LoadingPage />
            ) : (
                <React.Fragment>
                    <Box sx={{ width: '100%', mr: 2 }}>
                        <Typography id="modal-modal-title" variant="h4" component="h2" sx={{ mb: 2 }}>
                            {t('Chi tiết khoản thuê')}
                        </Typography>
                        <>
                            <Formik
                                enableReinitialize
                                initialValues={{
                                    name: rent?.rent?.name,
                                    cost: rent?.rent?.cost,
                                    createdAt: moment(rent?.rent?.createdAt).format('YYYY-MM-DD'),
                                    deadline: moment(rent?.rent?.deadline).format('YYYY-MM-DD')
                                }}
                                validationSchema={Yup.object().shape({})}
                                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                                    updateRent({
                                        ...values,
                                        paid: [...selectStudents]
                                    });
                                }}
                            >
                                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                                    <form noValidate onSubmit={handleSubmit}>
                                        <Grid container>
                                            <Grid xs={10} sm={9} md={8} lg={7} xl={5} spacing={3}>
                                                <Grid item xs={10}>
                                                    <Stack spacing={1}>
                                                        <InputLabel htmlFor="user-name" style={{ color: mainColor }}>
                                                            {t('Tên')}
                                                            <StarRequired />
                                                        </InputLabel>
                                                        <OutlinedInput
                                                            id="user-name"
                                                            style={
                                                                profile.role == 'BUILDING_MANAGER'
                                                                    ? { backgroundColor: '', marginBottom: '1rem' }
                                                                    : { backgroundColor: '#eee', marginBottom: '1rem' }
                                                            }
                                                            name="name"
                                                            error={Boolean(touched.name && errors.name)}
                                                            onBlur={handleBlur}
                                                            value={values?.name}
                                                            onChange={profile.role == 'BUILDING_MANAGER' ? handleChange : undefined}
                                                        />
                                                    </Stack>
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <Stack spacing={1}>
                                                        <InputLabel htmlFor="user-created-at" style={{ color: mainColor }}>
                                                            {t('Ngày tạo')}
                                                            <StarRequired />
                                                        </InputLabel>
                                                        <OutlinedInput
                                                            id="user-created-at"
                                                            style={{ backgroundColor: '#eee', marginBottom: '1rem' }}
                                                            type="date"
                                                            name="createdAt"
                                                            error={Boolean(touched.createdAt && errors.createdAt)}
                                                            onBlur={handleBlur}
                                                            value={values?.createdAt}
                                                        />
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                            <Grid xs={10} sm={9} md={8} lg={7} xl={5} spacing={3}>
                                                <Grid item xs={10}>
                                                    <Stack spacing={1}>
                                                        <InputLabel htmlFor="cost" style={{ color: mainColor }}>
                                                            {t('Phải thu')}
                                                            <StarRequired />
                                                        </InputLabel>
                                                        <OutlinedInput
                                                            id="cost"
                                                            style={
                                                                profile.role == 'BUILDING_MANAGER'
                                                                    ? { backgroundColor: '', marginBottom: '1rem' }
                                                                    : { backgroundColor: '#eee', marginBottom: '1rem' }
                                                            }
                                                            name="cost"
                                                            error={Boolean(touched.cost && errors.cost)}
                                                            onBlur={handleBlur}
                                                            value={values?.cost}
                                                            onChange={profile.role == 'BUILDING_MANAGER' ? handleChange : undefined}
                                                        />
                                                    </Stack>
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <Stack spacing={1}>
                                                        <InputLabel htmlFor="deadline" style={{ color: mainColor }}>
                                                            {t('Thời hạn')}
                                                            <StarRequired />
                                                        </InputLabel>
                                                        <OutlinedInput
                                                            id="deadline"
                                                            style={
                                                                profile.role == 'BUILDING_MANAGER'
                                                                    ? { backgroundColor: '', marginBottom: '1rem' }
                                                                    : { backgroundColor: '#eee', marginBottom: '1rem' }
                                                            }
                                                            name="deadline"
                                                            type="date"
                                                            error={Boolean(touched.deadline && errors.deadline)}
                                                            onBlur={handleBlur}
                                                            value={values?.deadline}
                                                            onChange={profile.role == 'BUILDING_MANAGER' ? handleChange : undefined}
                                                        />
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Paper
                                            sx={{
                                                width: '70%'
                                            }}
                                        >
                                            <TableContainer sx={{ width: '100%', mt: 2, maxHeight: 600 }}>
                                                <Table stickyHeader ref={tableRef} aria-label="simple table" padding={'none'}>
                                                    <TableHead>
                                                        <TableRow bgcolor="#f1f1f1">
                                                            <TableCell width="5%" align="left"></TableCell>
                                                            <TableCell width="5%" style={{ minWidth: 70 }} align="left">
                                                                {t('No')}
                                                            </TableCell>
                                                            <TableCell width="10%" style={{ minWidth: 100 }} align="left">
                                                                {t('Tên họ')}
                                                            </TableCell>
                                                            <TableCell width="10%" style={{ minWidth: 80 }} align="left">
                                                                {t('Email')}
                                                            </TableCell>
                                                            <TableCell width="10%" style={{ minWidth: 80 }} align="left">
                                                                {t('Số điện thoại')}
                                                            </TableCell>
                                                            <TableCell width="10%" style={{ minWidth: 80 }} align="left">
                                                                {t('Trạng thái')}
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {rent?.studentInRent?.map((row, index) => (
                                                            <TableRow
                                                                hover
                                                                key={row.id}
                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                            >
                                                                <TableCell align="left">
                                                                    <Grid container spacing={3}>
                                                                        <Grid item xs={7}>
                                                                            {!row?.paid && (
                                                                                <Checkbox
                                                                                    // checked={checkedTeams.includes(row.id)}
                                                                                    onChange={() => handleClickCheckBox(row?.student?.id)}
                                                                                />
                                                                            )}
                                                                        </Grid>
                                                                    </Grid>
                                                                </TableCell>
                                                                <TableCell align="left">{index}</TableCell>
                                                                <TableCell align="left">
                                                                    <Breakword
                                                                        text={row?.student?.name}
                                                                        width={{
                                                                            xs: '140px',
                                                                            sm: '140px',
                                                                            md: '140px',
                                                                            lg: '140px',
                                                                            xl: '280px'
                                                                        }}
                                                                    />
                                                                </TableCell>
                                                                <TableCell align="left">{row?.student?.email}</TableCell>
                                                                <TableCell align="left">{row?.student?.phone}</TableCell>
                                                                <TableCell align="left">{row?.paid ? 'Xong' : '_'}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                                {rent?.studentInRent?.length <= 0 && <EmptyRows />}
                                            </TableContainer>
                                        </Paper>
                                        <Grid container spacing={3} sx={{ mt: 1 }}>
                                            <Grid item>
                                                <AnimateButton>
                                                    <Button
                                                        disableElevation
                                                        size="large"
                                                        variant="contained"
                                                        color="secondary"
                                                        onClick={() => navigate(`/rent`)}
                                                    >
                                                        {t('Thoát')}
                                                    </Button>
                                                </AnimateButton>
                                            </Grid>
                                            {profile.role == 'BUILDING_MANAGER' && (
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
                                            )}
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

export default RentDetail;
