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
import { addRoomService, getListRoomService } from 'services/roomService';
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
import { getListUserService } from 'services/userService';

// Des: UI and function List company
const UserList = () => {
    const { t } = useTranslation();

    const building = useSelector((state) => state.building.building);
    const [user, setUser] = useState();
    const [userQuery, setUserQuery] = useState();
    const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingSearch, setIsLoadingSearch] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tableRef = useRef();
    const inputRef = useRef(null);
    const profile = useSelector((state) => state.profile.profile);
    const path = window.location.pathname.split('/')[2];

    useEffect(() => {
        setUserQuery();
        setIsLoading(true);
        getUserFirstLoad();
    }, [window.location.pathname]);

    // Delete company in list company
    const deleteBuilding = () => {};

    // Get list company
    const getUser = () => {
        setIsLoadingSearch(true);
        setTimeout(() => {
            getListUserService({
                ...userQuery,
                role: path == 'building-manager-list' ? 'BUILDING_MANAGER' : path == 'room-manager-list' ? 'FLOOR_MANAGER' : 'USER',
                name: userQuery?.name == '' ? undefined : userQuery?.name,
                email: userQuery?.email == '' ? undefined : userQuery?.email,
                phone: userQuery?.phone == '' ? undefined : userQuery?.phone,
                studentId: userQuery?.studentId == '' ? undefined : userQuery?.studentId
            })
                .then((res) => {
                    setUser(res.data);
                    setIsLoadingSearch(false);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log('err: ', err);
                });
        }, 500);
    };

    const getUserFirstLoad = () => {
        setIsLoadingSearch(true);
        setTimeout(() => {
            getListUserService({
                role: path == 'building-manager-list' ? 'BUILDING_MANAGER' : path == 'room-manager-list' ? 'FLOOR_MANAGER' : 'USER'
            })
                .then((res) => {
                    setUser(res.data);
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
                            {path == 'building-manager-list'
                                ? 'Danh sách quản lí toà nhà'
                                : path == 'room-manager-list'
                                ? 'Danh sách quản lí ktc'
                                : 'Sinh viên'}
                        </Typography>
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
                                    value={userQuery?.name}
                                    onChange={(e) => setUserQuery({ ...userQuery, name: e.target.value })}
                                />
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
                                    placeholder={t('Nhập email')}
                                    value={userQuery?.email}
                                    onChange={(e) => setUserQuery({ ...userQuery, email: e.target.value })}
                                />
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
                                    placeholder={t('Nhập số điện thoại')}
                                    value={userQuery?.phone}
                                    onChange={(e) => setUserQuery({ ...userQuery, phone: e.target.value })}
                                />
                            </FormControl>
                            {path == 'student-list' && (
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
                                        placeholder={t('Nhập mssv')}
                                        value={userQuery?.studentId}
                                        onChange={(e) => setUserQuery({ ...userQuery, studentId: e.target.value })}
                                    />
                                </FormControl>
                            )}
                            <Button variant="contained" sx={{ ml: 3, width: '6rem' }} onClick={() => getUser()}>
                                {t('Tìm kiếm')}
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
                                                {t('Tên')}
                                            </TableCell>
                                            <TableCell width="10%" style={{ minWidth: 80 }} align="left">
                                                {t('Email')}
                                            </TableCell>
                                            {path == 'student-list' && (
                                                <TableCell width="5%" style={{ minWidth: 80 }} align="left">
                                                    {t('Phòng')}
                                                </TableCell>
                                            )}

                                            <TableCell width="5%" style={{ minWidth: 80 }} align="left">
                                                {t('Giới tính')}
                                            </TableCell>
                                            <TableCell width="5%" style={{ minWidth: 80 }} align="left">
                                                {t('Quốc gia')}
                                            </TableCell>
                                            <TableCell width="5%" style={{ minWidth: 80 }} align="left">
                                                {t('Tôn giáo')}
                                            </TableCell>
                                            <TableCell width="5%" style={{ minWidth: 80 }} align="left">
                                                {t('Số điện thoại')}
                                            </TableCell>
                                            <TableCell width="5%" style={{ minWidth: 80 }} align="center">
                                                {t('Tuổi')}
                                            </TableCell>
                                            {path == 'student-list' ? (
                                                <TableCell width="10%" style={{ minWidth: 80 }} align="left">
                                                    {t('Mssv')}
                                                </TableCell>
                                            ) : (
                                                <TableCell width="10%" style={{ minWidth: 80 }} align="left">
                                                    {t('Vai trò')}
                                                </TableCell>
                                            )}
                                            <TableCell width="15%" style={{ minWidth: 170 }} align="center"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {user?.map((row, index) => (
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
                                                <TableCell align="left">{row?.email}</TableCell>
                                                {path == 'student-list' && <TableCell align="left">{row?.room?.name}</TableCell>}
                                                <TableCell align="left">{row?.gender == 'Male' ? 'Nam' : 'Nữ'}</TableCell>
                                                <TableCell align="left">{row?.region == 'VietNam' ? 'Việt Nam' : 'Quốc tế'}</TableCell>
                                                <TableCell align="left">{row?.religion}</TableCell>
                                                <TableCell align="left">{row?.phone}</TableCell>
                                                <TableCell align="center">{row?.age}</TableCell>
                                                {path == 'student-list' ? (
                                                    <TableCell align="left">{row?.studentId}</TableCell>
                                                ) : (
                                                    <TableCell align="left">
                                                        {row?.role == 'FLOOR_MANAGER'
                                                            ? 'Quản lí ktx'
                                                            : row?.role == 'BUILDING_MANAGER'
                                                            ? 'Quản lí toà nhà'
                                                            : 'Sinh viên'}
                                                    </TableCell>
                                                )}
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
                                                                onClick={() => navigate(`/user/${path}/${row?.id}`)}
                                                            >
                                                                {t('Chi tiết')}
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                {user?.length <= 0 && <EmptyRows />}
                            </TableContainer>
                        </Paper>
                    )}
                    {modalDeleteVisible && (
                        <ModalDelete
                            title={t('Delete this user?')}
                            content={t('')}
                            textBtnBack={t('back')}
                            textBtnSubmit={t('delete')}
                            action={deleteBuilding}
                            callbackClose={callbackClose}
                        />
                    )}
                </React.Fragment>
            )}
        </>
    );
};

export default UserList;
