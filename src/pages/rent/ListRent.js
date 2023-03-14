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
import { addRentService, deleteRentByIdService, getListRentService } from 'services/rentService';
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
import AddNewRentModal from './component/AddNewRentModal';
import * as moment from 'moment';

// Des: UI and function List company
const ListRent = () => {
    const { t } = useTranslation();

    const building = useSelector((state) => state.building.building);
    const [rent, setRent] = useState();
    const [modalAddVisible, setModalAddVisible] = useState();
    const [newRent, setNewRent] = useState();
    const [rentQuery, setRentQuery] = useState();
    const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
    const [selectedRent, setSelectedRent] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingSearch, setIsLoadingSearch] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tableRef = useRef();
    const inputRef = useRef(null);
    const profile = useSelector((state) => state.profile.profile);

    useEffect(() => {
        setIsLoading(true);
        setRentQuery();
        getRent();
    }, []);

    // Delete company in list company
    const deleteRent = () => {
        setIsLoading(true);
        setTimeout(() => {
            deleteRentByIdService(selectedRent)
                .then((res) => {
                    getRent();
                    setIsLoading(false);
                    setModalDeleteVisible(false);
                })
                .catch((err) => {
                    console.log('err: ', err);
                });
        }, 500);
    };

    const handleAddNewRent = () => {
        setIsLoading(true);
        addRentService(newRent).then(() => {
            getRent();
            dispatch(raiseNotification({ visible: true, content: 'Thêm mới thành công', severity: 'success' }));
            setIsLoading(false);
            setModalAddVisible(false);
        });
    };
    // Get list company
    const getRent = () => {
        setIsLoadingSearch(true);
        setTimeout(() => {
            getListRentService({
                ...rentQuery,
                buildingId: rentQuery?.buildingId == '' ? undefined : rentQuery?.buildingId
            })
                .then((res) => {
                    setRent(res.data);
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
                        <Typography variant="h4">Danh sách khoản thuê</Typography>
                    </Grid>
                    <Stack direction="row" sx={{ mt: 0, justifyContent: 'space-between' }}>
                        <Stack direction="row">
                            <FormControl sx={{ width: { xs: '100%', md: 224 } }}>
                                <Select
                                    size="small"
                                    id="header-search"
                                    value={rentQuery?.buildingId ? rentQuery?.buildingId : ''}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    onChange={(e) => setRentQuery({ ...rentQuery, buildingId: e.target.value })}
                                >
                                    <MenuItem value={''}>Tất cả toà nhà</MenuItem>
                                    {building?.map((item) => {
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
                                    placeholder={t('Nhập tên khoản thuê')}
                                    value={rentQuery?.name}
                                    onChange={(e) => setRentQuery({ ...rentQuery, name: e.target.value })}
                                />
                            </FormControl>
                            <Button variant="contained" sx={{ ml: 3, width: '6rem' }} onClick={() => getRent()}>
                                {t('Search')}
                            </Button>
                        </Stack>
                        {profile?.role == 'BUILDING_MANAGER' && (
                            <Stack direction="row">
                                <Button variant="contained" sx={{ mr: 3, width: '10rem' }} onClick={() => setModalAddVisible(true)}>
                                    {t('Thêm khoản thuê')}
                                </Button>
                            </Stack>
                        )}
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
                                                {t('Khoản thuê')}
                                            </TableCell>
                                            <TableCell width="10%" style={{ minWidth: 80 }} align="left">
                                                {t('Phải thu')}
                                            </TableCell>
                                            <TableCell width="15%" style={{ minWidth: 80 }} align="left">
                                                {t('Thời hạn')}
                                            </TableCell>
                                            <TableCell width="10%" style={{ minWidth: 80 }} align="left">
                                                {t('Toà nhà')}
                                            </TableCell>
                                            <TableCell width="15%" style={{ minWidth: 170 }} align="center"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rent?.map((row, index) => (
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
                                                <TableCell align="left">{row?.building?.name}</TableCell>
                                                <TableCell align="center">
                                                    <Grid container>
                                                        <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
                                                            <Button
                                                                variant="contained"
                                                                sx={{
                                                                    width: '94.33px',
                                                                    marginBottom: '0.3rem',
                                                                    height: '1.8rem',
                                                                    pt: 0.8
                                                                }}
                                                                onClick={() => navigate(`/rent/${row?.id}`)}
                                                            >
                                                                {t('Chi tiết')}
                                                            </Button>
                                                        </Grid>
                                                        {profile?.role == 'BUILDING_MANAGER' && (
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
                                                                        setSelectedRent(row.id);
                                                                    }}
                                                                >
                                                                    {t('Xoá')}
                                                                </Button>
                                                            </Grid>
                                                        )}
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                {rent?.length <= 0 && <EmptyRows />}
                            </TableContainer>
                        </Paper>
                    )}
                    {modalDeleteVisible && (
                        <ModalDelete
                            title={t('Xác nhận xoá khoản thuê?')}
                            content={t('')}
                            textBtnBack={t('Thoát')}
                            textBtnSubmit={t('Xoá')}
                            action={deleteRent}
                            callbackClose={callbackClose}
                        />
                    )}
                    {modalAddVisible && (
                        <AddNewRentModal
                            modalAddVisible={modalAddVisible}
                            setModalAddVisible={setModalAddVisible}
                            newRent={newRent}
                            setNewRent={setNewRent}
                            handleAddNewRent={handleAddNewRent}
                        />
                    )}
                </React.Fragment>
            )}
        </>
    );
};

export default ListRent;
