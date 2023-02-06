import React, { useEffect, useState, useRef } from 'react';
import {
    Grid,
    Stack,
    Typography,
    Box,
    Button,
    InputLabel,
    FormControl,
    OutlinedInput,
    InputAdornment,
    Select,
    MenuItem
} from '@mui/material';
import { SearchOutlined } from '@ant-design/icons';
import { addFeeService, getListFeeService } from 'services/feeService';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import { useDispatch, useSelector } from 'react-redux';
import { raiseNotification } from 'store/reducers/notification';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import EmptyRows from 'components/EmptyRows';
import ModalDelete from 'components/ModalDelete';
import LoadingPage from 'components/LoadingPage';
import Breakword from 'components/common/breakword/index';
import AddNewFeeModal from './component/AddNewFeeModal';
import * as moment from 'moment';

// Des: UI and function List company
const ListFee = () => {
    const { t } = useTranslation();

    const room = useSelector((state) => state.room.room);
    const [fee, setFee] = useState();
    const [modalAddVisible, setModalAddVisible] = useState();
    const [newFee, setNewFee] = useState();
    const [feeQuery, setFeeQuery] = useState();
    const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
    const [selectedFee, setSelectedFee] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingSearch, setIsLoadingSearch] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tableRef = useRef();
    const inputRef = useRef(null);
    const profile = useSelector((state) => state.profile.profile);
    const path = window.location.pathname.split('/')[2];

    useEffect(() => {
        setIsLoading(true);
        setFeeQuery();
        getFeeFirstLoad();
    }, [window.location.pathname]);

    // Delete company in list company
    const deleteBuilding = () => {};

    const handleAddNewFee = () => {
        setIsLoading(true);
        addFeeService(newFee).then(() => {
            getFee();
            dispatch(raiseNotification({ visible: true, content: 'Create successfully', severity: 'success' }));
            setIsLoading(false);
            setModalAddVisible(false);
        });
    };
    // Get list company
    const getFee = () => {
        setIsLoadingSearch(true);
        setTimeout(() => {
            getListFeeService({
                ...feeQuery,
                type: path == 'electric' ? 'Electric' : path == 'water' ? 'Water' : 'Internet',
                roomId: feeQuery?.roomId == '' ? undefined : feeQuery?.roomId
            })
                .then((res) => {
                    setFee(res.data);
                    setIsLoadingSearch(false);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log('err: ', err);
                });
        }, 500);
    };

    const getFeeFirstLoad = () => {
        setIsLoadingSearch(true);
        setTimeout(() => {
            getListFeeService({
                type: path == 'electric' ? 'Electric' : path == 'water' ? 'Water' : 'Internet'
            })
                .then((res) => {
                    setFee(res.data);
                    setIsLoadingSearch(false);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log('err: ', err);
                });
        }, 500);
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
                        <Typography variant="h4">
                            {path == 'electric' ? 'Tiền điện' : path == 'water' ? 'Tiền nước' : 'Tiền mạng'}
                        </Typography>
                    </Grid>
                    <Stack direction="row" sx={{ mt: 0, justifyContent: 'space-between' }}>
                        <Stack direction="row">
                            <FormControl sx={{ width: { xs: '100%', md: 224 } }}>
                                <Select
                                    size="small"
                                    id="header-search"
                                    value={feeQuery?.roomId ? feeQuery?.roomId : ''}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    onChange={(e) => setFeeQuery({ ...feeQuery, roomId: e.target.value })}
                                >
                                    <MenuItem value={''}>Tất cả phòng</MenuItem>
                                    {room?.map((item) => {
                                        return <MenuItem value={item.id}>{item.name}</MenuItem>;
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl sx={{ width: { xs: '100%', md: 224 }, ml: 3 }}>
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
                                    placeholder={t('Tên khoản phí')}
                                    value={feeQuery?.name}
                                    onChange={(e) => setFeeQuery({ ...feeQuery, name: e.target.value })}
                                />
                            </FormControl>
                            <Button variant="contained" sx={{ ml: 3, width: '6rem' }} onClick={() => getFee()}>
                                {t('Tìm kiếm')}
                            </Button>
                        </Stack>
                        <Stack direction="row">
                            <Button variant="contained" sx={{ mr: 3, width: '10rem' }} onClick={() => setModalAddVisible(true)}>
                                {t('Thêm khoản phí')}
                            </Button>
                        </Stack>
                    </Stack>
                    {isLoadingSearch ? (
                        <LoadingPage />
                    ) : (
                        <Paper
                            sx={{
                                width: '100%'
                            }}
                        >
                            <TableContainer sx={{ width: '100%', mt: 2, maxHeight: 600 }}>
                                <Table stickyHeader ref={tableRef} aria-label="simple table" padding={'none'}>
                                    <TableHead>
                                        <TableRow bgcolor="#f1f1f1">
                                            <TableCell width="5%" style={{ minWidth: 70 }} align="left">
                                                {t('No')}
                                            </TableCell>
                                            <TableCell width="10%" style={{ minWidth: 100 }} align="left">
                                                {t('Tên phí')}
                                            </TableCell>
                                            <TableCell width="10%" style={{ minWidth: 80 }} align="left">
                                                {t('Phải thu')}
                                            </TableCell>
                                            <TableCell width="15%" style={{ minWidth: 80 }} align="left">
                                                {t('Thời hạn')}
                                            </TableCell>
                                            <TableCell width="10%" style={{ minWidth: 80 }} align="left">
                                                {t('Phòng')}
                                            </TableCell>
                                            <TableCell width="15%" style={{ minWidth: 170 }} align="center"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {fee?.map((row, index) => (
                                            <TableRow hover key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell align="left">{index}</TableCell>
                                                <TableCell align="left">
                                                    <Breakword
                                                        text={row?.name}
                                                        width={{
                                                            xs: '140px',
                                                            sm: '140px',
                                                            md: '140px',
                                                            lg: '140px',
                                                            xl: '280px'
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell align="left">{row?.cost}</TableCell>
                                                <TableCell align="left">{moment(row?.deadline).format('YYYY-MM-DD')}</TableCell>
                                                <TableCell align="left">{row?.room?.name}</TableCell>
                                                <TableCell align="center">
                                                    <Grid container>
                                                        <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
                                                            <Button
                                                                variant="contained"
                                                                sx={{
                                                                    width: '90.33px',
                                                                    marginBottom: '0.3rem',
                                                                    height: '1.8rem',
                                                                    pt: 0.8
                                                                }}
                                                                onClick={() => navigate(`/fee/${path}/${row?.id}`)}
                                                            >
                                                                {t('Chi tiết')}
                                                            </Button>
                                                        </Grid>
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
                                                                    setSelectedFee(row.id);
                                                                }}
                                                            >
                                                                {t('Xoá')}
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                {fee?.length <= 0 && <EmptyRows />}
                            </TableContainer>
                        </Paper>
                    )}
                    {modalDeleteVisible && (
                        <ModalDelete
                            title={t('Xoá khoản phí?')}
                            content={t('')}
                            textBtnBack={t('Thoát')}
                            textBtnSubmit={t('Xoá')}
                            action={deleteBuilding}
                            callbackClose={callbackClose}
                        />
                    )}
                    {modalAddVisible && (
                        <AddNewFeeModal
                            modalAddVisible={modalAddVisible}
                            setModalAddVisible={setModalAddVisible}
                            newFee={newFee}
                            setNewFee={setNewFee}
                            handleAddNewFee={handleAddNewFee}
                        />
                    )}
                </React.Fragment>
            )}
        </>
    );
};

export default ListFee;
