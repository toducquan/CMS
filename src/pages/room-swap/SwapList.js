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
import { approveSwapRequest, getAllSwapRequest, rejectSwapRequest } from 'services/swapRoom';
import * as moment from 'moment';

const SwapList = () => {
    const { t } = useTranslation();

    const [swapList, setSwapList] = useState();
    const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
    const [selectedRequest, setSeletedRequest] = useState([]);
    const [rejectRequest, setRejectRequest] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tableRef = useRef();
    const inputRef = useRef(null);

    useEffect(() => {
        setIsLoading(true);
        getListSwap();
    }, []);

    // Delete company in list company
    const deleteRequest = () => {
        setIsLoading(true);

        setTimeout(() => {
            rejectSwapRequest(rejectRequest)
                .then(() => {
                    getListSwap();
                    setModalDeleteVisible(false);
                    dispatch(
                        raiseNotification({
                            visible: true,
                            content: 'Từ chối thành công',
                            severity: 'success'
                        })
                    );
                })
                .catch((err) => {
                    console.log('err: ', err);
                    dispatch(
                        raiseNotification({
                            visible: true,
                            content: 'Từ chối thất bại',
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
            approveSwapRequest({
                swapIds: [...selectedRequest]
            })
                .then(() => {
                    getListSwap();
                    dispatch(
                        raiseNotification({
                            visible: true,
                            content: 'Phê duyệt nguyện vọng thành công',
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
    const getListSwap = () => {
        setRejectRequest();
        setSeletedRequest([]);
        setTimeout(() => {
            getAllSwapRequest()
                .then((res) => {
                    setSwapList(res.data);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log('err: ', err);
                });
        }, 500);
    };

    const handleClickCheckBox = (id) => {
        let arr;
        const idExist = selectedRequest.filter((item) => {
            return item == id;
        });
        if (idExist.length == 0) {
            arr = [...selectedRequest];
            arr.push(id);
        } else {
            arr = selectedRequest.filter((item) => {
                return item != id;
            });
        }
        setSeletedRequest([...arr]);
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
                        <Typography variant="h4">Yêu cầu đổi phòng</Typography>
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
                                    placeholder={t('Nhập tên')}
                                />
                            </FormControl>
                            <Button variant="contained" sx={{ ml: 3, width: '6rem' }} onClick={() => getBuilding()}>
                                {t('Tìm kiếm')}
                            </Button>
                        </Stack>
                        <Stack direction="row">
                            {selectedRequest?.length > 0 && (
                                <Button variant="contained" sx={{ mr: 15, width: '6rem' }} onClick={() => approveAllSelected()}>
                                    {t('Duyệt')}
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
                                            {t('Người yêu cầu')}
                                        </TableCell>
                                        <TableCell width="20%" style={{ minWidth: 80 }} align="left">
                                            {t('Phòng')}
                                        </TableCell>
                                        <TableCell width="15%" style={{ minWidth: 80 }} align="left">
                                            {t('Người được đổi')}
                                        </TableCell>
                                        <TableCell width="20%" style={{ minWidth: 80 }} align="left">
                                            {t('Phòng')}
                                        </TableCell>
                                        <TableCell width="15%" style={{ minWidth: 80 }} align="left">
                                            {t('Ngày tạo')}
                                        </TableCell>
                                        <TableCell width="15%" style={{ minWidth: 170 }} align="center"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {swapList?.map((row, index) => (
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
                                                    text={row?.requestUser.name}
                                                    width={{
                                                        xs: '140px',
                                                        sm: '140px',
                                                        md: '140px',
                                                        lg: '140px',
                                                        xl: '280px'
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell align="left">{row?.requestUser?.room?.name}</TableCell>
                                            <TableCell align="left">{row?.receiveUser.name}</TableCell>
                                            <TableCell align="left">{row?.receiveUser?.room?.name}</TableCell>
                                            <TableCell align="left">{moment(row?.createdAt).format('YYYY-MM-DD')}</TableCell>
                                            <TableCell align="center">
                                                <Grid container>
                                                    <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
                                                        <Button
                                                            variant="contained"
                                                            sx={{
                                                                width: '94.33px',
                                                                marginLeft: { lg: '1rem' },
                                                                height: '1.8rem',
                                                                pt: 0.8,
                                                                bgcolor: '#f5222d'
                                                            }}
                                                            color="error"
                                                            onClick={() => {
                                                                setModalDeleteVisible(true);
                                                                setRejectRequest(row.id);
                                                            }}
                                                        >
                                                            {t('Từ chối')}
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            {swapList?.length <= 0 && <EmptyRows />}
                        </TableContainer>
                    </Paper>
                    {modalDeleteVisible && (
                        <ModalDelete
                            title={t('Từ chối nguyện vọng đổi phòng?')}
                            content={t('')}
                            textBtnBack={t('Thoát')}
                            textBtnSubmit={t('Từ chối')}
                            action={deleteRequest}
                            callbackClose={callbackClose}
                        />
                    )}
                </React.Fragment>
            )}
        </>
    );
};

export default SwapList;
