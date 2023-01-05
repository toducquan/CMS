import React, { useEffect, useState, useRef } from 'react';
import { Grid, Stack, Typography, Box, Button, InputLabel, FormControl, OutlinedInput, InputAdornment } from '@mui/material';
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
import { setStudentRoom } from 'store/reducers/building';

// Des: UI and function List company
const StudentRoom = ({ studentInRoom }) => {
    const { t } = useTranslation();
    const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
    const [selectStudents, setSelectStudents] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tableRef = useRef();
    const inputRef = useRef(null);

    // Close modal edit team
    const callbackClose = (childData) => {
        setModalDeleteVisible(false);
    };

    return (
        <>
            <React.Fragment>
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
                                placeholder={t('Enter student id')}
                            />
                        </FormControl>
                        <Button variant="contained" sx={{ ml: 3, width: '6rem' }}>
                            {t('Search')}
                        </Button>
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
                                    <TableCell width="5%" style={{ minWidth: 70 }} align="left">
                                        {t('No')}
                                    </TableCell>
                                    <TableCell width="10%" style={{ minWidth: 100 }} align="left">
                                        {t('Name')}
                                    </TableCell>
                                    <TableCell width="10%" style={{ minWidth: 80 }} align="left">
                                        {t('Email')}
                                    </TableCell>
                                    <TableCell width="10%" style={{ minWidth: 80 }} align="left">
                                        {t('Phone')}
                                    </TableCell>
                                    <TableCell width="10%" style={{ minWidth: 80 }} align="left">
                                        {t('Student Id')}
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {studentInRoom?.map((row, index) => (
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
                                        <TableCell align="left">{row?.phone}</TableCell>
                                        <TableCell align="left">{row?.studentId}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {studentInRoom?.length <= 0 && <EmptyRows />}
                    </TableContainer>
                </Paper>
                {modalDeleteVisible && (
                    <ModalDelete
                        title={t('Delete this building?')}
                        content={t('')}
                        textBtnBack={t('back')}
                        textBtnSubmit={t('delete')}
                        action={deleteBuilding}
                        callbackClose={callbackClose}
                    />
                )}
            </React.Fragment>
        </>
    );
};

export default StudentRoom;
