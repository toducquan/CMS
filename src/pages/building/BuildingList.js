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
import { setBuildingList } from 'store/reducers/building';

// Des: UI and function List company
const BuildingList = () => {
    const { t } = useTranslation();

    const [buildings, setBuilding] = useState();
    const [buildingQuery, setBuildingQuery] = useState();
    const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingSearch, setIsLoadingSearch] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tableRef = useRef();
    const inputRef = useRef(null);

    useEffect(() => {
        setIsLoading(true);
        setBuildingQuery();
        getBuilding();
    }, []);

    // Delete company in list company
    const deleteBuilding = () => {};

    // Get list company
    const getBuilding = () => {
        setIsLoadingSearch(true);
        setTimeout(() => {
            getListBuildingService(buildingQuery)
                .then((res) => {
                    setBuilding(res.data);
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
                        <Typography variant="h4">Buildings</Typography>
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
                                    placeholder={t('Enter building name')}
                                    value={buildingQuery?.name}
                                    onChange={(e) => setBuildingQuery({ ...buildingQuery, name: e.target.value })}
                                />
                            </FormControl>
                            <Button variant="contained" sx={{ ml: 3, width: '6rem' }} onClick={() => getBuilding()}>
                                {t('Search')}
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
                                            <TableCell width="20%" style={{ minWidth: 100 }} align="left">
                                                {t('Name')}
                                            </TableCell>
                                            <TableCell width="10%" style={{ minWidth: 80 }} align="left">
                                                {t('Number of floors')}
                                            </TableCell>
                                            <TableCell width="10%" style={{ minWidth: 80 }} align="left">
                                                {t('Address')}
                                            </TableCell>
                                            <TableCell width="10%" style={{ minWidth: 80 }} align="left">
                                                {t('Manager')}
                                            </TableCell>
                                            <TableCell width="15%" style={{ minWidth: 170 }} align="center"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {buildings?.map((row, index) => (
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
                                                <TableCell align="left">{row?.numberOfFloors}</TableCell>
                                                <TableCell align="left">{row?.address || '-'}</TableCell>
                                                <TableCell align="left">{row?.manager.name || '-'}</TableCell>
                                                <TableCell align="center">
                                                    <Grid container>
                                                        <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
                                                            <Button
                                                                variant="contained"
                                                                sx={{
                                                                    width: '74.33px',
                                                                    marginBottom: '0.3rem',
                                                                    height: '1.8rem',
                                                                    pt: 0.8
                                                                }}
                                                                onClick={() => navigate(`/building/${row?.id}`)}
                                                            >
                                                                {t('Detail')}
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
                                                                    setSelectedCompany(row.id);
                                                                }}
                                                            >
                                                                {t('Delete')}
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                {buildings?.length <= 0 && <EmptyRows />}
                            </TableContainer>
                        </Paper>
                    )}
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
            )}
        </>
    );
};

export default BuildingList;
