import React, { useEffect, useState, useRef } from 'react';
import { Grid, Stack, Typography, Box, Button, InputLabel, FormControl, OutlinedInput, InputAdornment, Checkbox } from '@mui/material';
import { SearchOutlined } from '@ant-design/icons';
import { getListBuildingService } from 'services/buildingService';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import { useDispatch } from 'react-redux';
import { raiseNotification } from 'store/reducers/notification';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import EmptyRows from 'components/EmptyRows';
import ModalDelete from 'components/ModalDelete';
import LoadingPage from 'components/LoadingPage';
import Breakword from 'components/common/breakword/index';
import * as moment from 'moment';
import { approveAspiration, getAllAspiration, rejectAspirationService } from 'services/aspirationService';

const AspirationList = () => {
    const { t } = useTranslation();

    const [aspirationList, setAspirationList] = useState();
    const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
    const [selectedAspiration, setSelectedAspiration] = useState([]);
    const [rejectAspiration, setRejectAspiration] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tableRef = useRef();
    const inputRef = useRef(null);

    useEffect(() => {
        setIsLoading(true);
        getAspirations();
    }, []);

    // Delete company in list company
    const deleteRequest = () => {
        setIsLoading(true);

        setTimeout(() => {
            rejectAspirationService(rejectAspiration)
                .then(() => {
                    getAspirations();
                    setModalDeleteVisible(false);
                    dispatch(
                        raiseNotification({
                            visible: true,
                            content: 'Reject successfully',
                            severity: 'success'
                        })
                    );
                })
                .catch((err) => {
                    console.log('err: ', err);
                    dispatch(
                        raiseNotification({
                            visible: true,
                            content: 'Can not reject this aspiration',
                            severity: 'error'
                        })
                    );
                    setIsLoading(false);
                });
        }, 500);
    };

    const approveAllSelected = () => {
        setIsLoading(true);

        setTimeout(() => {
            approveAspiration({
                ids: [...selectedAspiration]
            })
                .then(() => {
                    getAspirations();
                    dispatch(
                        raiseNotification({
                            visible: true,
                            content: 'Approve successfully',
                            severity: 'success'
                        })
                    );
                })
                .catch((err) => {
                    console.log('err: ', err);
                    setIsLoading(false);
                });
        }, 500);
    };

    // Get list company
    const getAspirations = () => {
        setRejectAspiration();
        setSelectedAspiration([]);
        setTimeout(() => {
            getAllAspiration()
                .then((res) => {
                    setAspirationList(res.data);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log('err: ', err);
                });
        }, 500);
    };

    const handleClickCheckBox = (id) => {
        let arr;
        const idExist = selectedAspiration.filter((item) => {
            return item == id;
        });
        if (idExist.length == 0) {
            arr = [...selectedAspiration];
            arr.push(id);
        } else {
            arr = selectedAspiration.filter((item) => {
                return item != id;
            });
        }
        setSelectedAspiration([...arr]);
    };

    // Close modal edit team
    const callbackClose = (childData) => {
        setModalDeleteVisible(false);
    };

    return (
        <>
            {isLoading ? (
                <LoadingPage />
            ) : (
                <React.Fragment>
                    <Grid item sx={{ mt: 2, mb: 2 }}>
                        <Typography variant="h4">Student aspirations</Typography>
                    </Grid>
                    <Stack direction="row" sx={{ mt: 0, justifyContent: 'space-between' }}>
                        <Stack direction="row">
                            <FormControl sx={{ width: { xs: '100%', md: 224 } }}>
                                <OutlinedInput
                                    size="small"
                                    id="header-search"
                                    ref={inputRef}
                                    startAdornment={
                                        <InputAdornment position="start" sx={{ mr: -0.5 }}>
                                            <SearchOutlined />
                                        </InputAdornment>
                                    }
                                    aria-describedby="header-search-text"
                                    inputProps={{
                                        'aria-label': 'weight'
                                    }}
                                    placeholder={t('Enter name')}
                                />
                            </FormControl>
                            <Button variant="contained" sx={{ ml: 3, width: '6rem' }} onClick={() => getBuilding()}>
                                {t('Search')}
                            </Button>
                        </Stack>
                        <Stack direction="row">
                            {selectedAspiration?.length > 0 && (
                                <Button variant="contained" sx={{ mr: 15, width: '6rem' }} onClick={() => approveAllSelected()}>
                                    {t('Approve')}
                                </Button>
                            )}
                        </Stack>
                    </Stack>
                    <Paper
                        sx={{
                            width: '100%'
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
                                        <TableCell width="15%" style={{ minWidth: 100 }} align="left">
                                            {t('Student')}
                                        </TableCell>
                                        <TableCell width="15%" style={{ minWidth: 80 }} align="left">
                                            {t('First room')}
                                        </TableCell>
                                        <TableCell width="15%" style={{ minWidth: 80 }} align="left">
                                            {t('Second room')}
                                        </TableCell>
                                        <TableCell width="15%" style={{ minWidth: 80 }} align="left">
                                            {t('Third room')}
                                        </TableCell>
                                        <TableCell width="15%" style={{ minWidth: 80 }} align="left">
                                            {t('Create at')}
                                        </TableCell>
                                        <TableCell width="15%" style={{ minWidth: 170 }} align="center"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {aspirationList?.map((row, index) => (
                                        <TableRow hover key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell align="left">
                                                <Grid container spacing={3}>
                                                    <Grid item xs={7}>
                                                        <Checkbox
                                                            // checked={checkedTeams.includes(row.id)}
                                                            onChange={() => handleClickCheckBox(row.id)}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                            <TableCell align="left">{index}</TableCell>
                                            <TableCell align="left">
                                                <Breakword
                                                    text={row?.student.name}
                                                    width={{
                                                        xs: '140px',
                                                        sm: '140px',
                                                        md: '140px',
                                                        lg: '140px',
                                                        xl: '280px'
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell align="left">{row?.firstRoom?.name}</TableCell>
                                            <TableCell align="left">{row?.secondRoom?.name}</TableCell>
                                            <TableCell align="left">{row?.thirdRoom?.name}</TableCell>
                                            <TableCell align="left">{moment(row?.createdAt).format('YYYY-MM-DD')}</TableCell>
                                            <TableCell align="center">
                                                <Grid container>
                                                    <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
                                                        <Button
                                                            variant="contained"
                                                            sx={{
                                                                width: '74.33px',
                                                                marginLeft: { lg: '1rem' },
                                                                height: '1.8rem',
                                                                pt: 0.8,
                                                                bgcolor: '#f5222d'
                                                            }}
                                                            color="error"
                                                            onClick={() => {
                                                                setModalDeleteVisible(true);
                                                                setRejectAspiration(row.id);
                                                            }}
                                                        >
                                                            {t('Reject')}
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            {aspirationList?.length <= 0 && <EmptyRows />}
                        </TableContainer>
                    </Paper>
                    {modalDeleteVisible && (
                        <ModalDelete
                            title={t('Reject this aspiration?')}
                            content={t('')}
                            textBtnBack={t('back')}
                            textBtnSubmit={t('Reject')}
                            action={deleteRequest}
                            callbackClose={callbackClose}
                        />
                    )}
                </React.Fragment>
            )}
        </>
    );
};

export default AspirationList;
