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
import { addRoomService, deleteRoomByIdService, getListRoomService } from 'services/roomService';
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
import AddRoomModal from './component/AddRoomModal';

// Des: UI and function List company
const RoomList = () => {
    const { t } = useTranslation();

    const building = useSelector((state) => state.building.building);
    const [room, setRoom] = useState();
    const [modalAddVisible, setModalAddVisible] = useState();
    const [newRoom, setNewRoom] = useState();
    const [roomQuery, setRoomQuery] = useState();
    const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingSearch, setIsLoadingSearch] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tableRef = useRef();
    const inputRef = useRef(null);
    const profile = useSelector((state) => state.profile.profile);

    useEffect(() => {
        setIsLoading(true);
        setRoomQuery();
        getRoom();
    }, []);

    // Delete company in list company
    const deleteRoom = () => {
        setIsLoading(true);
        setTimeout(() => {
            deleteRoomByIdService(selectedRoom)
                .then((res) => {
                    getRoom();
                    setIsLoading(false);
                    setModalDeleteVisible(false);
                })
                .catch((err) => {
                    console.log('err: ', err);
                });
        }, 500);
    };

    const handleAddNewRoom = () => {
        setIsLoading(true);
        addRoomService(newRoom).then(() => {
            getRoom();
            dispatch(raiseNotification({ visible: true, content: 'Th??m m???i th??nh c??ng', severity: 'success' }));
            setIsLoading(false);
            setModalAddVisible(false);
        });
    };
    // Get list company
    const getRoom = () => {
        setIsLoadingSearch(true);
        setTimeout(() => {
            getListRoomService({
                ...roomQuery,
                buildingId: roomQuery?.buildingId == '' ? undefined : roomQuery?.buildingId
            })
                .then((res) => {
                    setRoom(res.data);
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
                        <Typography variant="h4">Danh s??ch c??c ph??ng</Typography>
                    </Grid>
                    <Stack direction="row" sx={{ mt: 0, justifyContent: 'space-between' }}>
                        <Stack direction="row">
                            <FormControl sx={{ width: { xs: '100%', md: 224 } }}>
                                <Select
                                    size="small"
                                    id="header-search"
                                    value={roomQuery?.buildingId ? roomQuery?.buildingId : ''}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    onChange={(e) => setRoomQuery({ ...roomQuery, buildingId: e.target.value })}
                                >
                                    <MenuItem value={''}>T???t c??? to?? nh??</MenuItem>
                                    {building?.map((item) => {
                                        return <MenuItem value={item.id}>{item.name}</MenuItem>;
                                    })}
                                </Select>
                            </FormControl>
                            <Button variant="contained" sx={{ ml: 3, width: '6rem' }} onClick={() => getRoom()}>
                                {t('T??m ki???m')}
                            </Button>
                        </Stack>
                        {profile?.role == 'BUILDING_MANAGER' && (
                            <Stack direction="row">
                                <Button variant="contained" sx={{ mr: 3, width: '10rem' }} onClick={() => setModalAddVisible(true)}>
                                    {t('Th??m ph??ng m???i')}
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
                                                {t('T??n ph??ng')}
                                            </TableCell>
                                            <TableCell width="10%" style={{ minWidth: 80 }} align="left">
                                                {t('Di???n t??ch')}
                                            </TableCell>
                                            <TableCell width="7%" style={{ minWidth: 80 }} align="left">
                                                {t('Ph??ng cho n???')}
                                            </TableCell>
                                            <TableCell width="7%" style={{ minWidth: 80 }} align="left">
                                                {t('Ph??ng qu???c t???')}
                                            </TableCell>
                                            <TableCell width="10%" style={{ minWidth: 80 }} align="center">
                                                {t('S??? l?????ng t???i ??a')}
                                            </TableCell>
                                            <TableCell width="10%" style={{ minWidth: 80 }} align="left">
                                                {t('Qu???n l??')}
                                            </TableCell>
                                            <TableCell width="15%" style={{ minWidth: 170 }} align="center"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {room?.map((row, index) => (
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
                                                <TableCell align="left">{row?.square}</TableCell>
                                                <TableCell align="center">{row?.onlyFemale ? 'n??? gi???i' : '_'}</TableCell>
                                                <TableCell align="center">{row?.onlyForeign ? 'qu???c t???' : '_'}</TableCell>
                                                <TableCell align="center">{row?.maxStudentAllow}</TableCell>
                                                <TableCell align="left">{row?.manager.name || '-'}</TableCell>
                                                <TableCell align="center">
                                                    <Grid container>
                                                        <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
                                                            <Button
                                                                variant="contained"
                                                                sx={{
                                                                    width: '104.33px',
                                                                    marginBottom: '0.3rem',
                                                                    height: '1.8rem',
                                                                    pt: 0.8
                                                                }}
                                                                onClick={() => navigate(`/room/${row?.id}`)}
                                                            >
                                                                {t('Chi ti???t')}
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
                                                                        setSelectedRoom(row.id);
                                                                    }}
                                                                >
                                                                    {t('Xo??')}
                                                                </Button>
                                                            </Grid>
                                                        )}
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                {room?.length <= 0 && <EmptyRows />}
                            </TableContainer>
                        </Paper>
                    )}
                    {modalDeleteVisible && (
                        <ModalDelete
                            title={t('Xo?? c??n ph??ng n??y kh???i h??? th???ng?')}
                            content={t('')}
                            textBtnBack={t('Tho??t')}
                            textBtnSubmit={t('Xo??')}
                            action={deleteRoom}
                            callbackClose={callbackClose}
                        />
                    )}
                    {modalAddVisible && (
                        <AddRoomModal
                            modalAddVisible={modalAddVisible}
                            setModalAddVisible={setModalAddVisible}
                            newRoom={newRoom}
                            setNewRoom={setNewRoom}
                            handleAddNewRoom={handleAddNewRoom}
                        />
                    )}
                </React.Fragment>
            )}
        </>
    );
};

export default RoomList;
