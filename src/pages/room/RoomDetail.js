import React, { useEffect, useState } from 'react';
import { Typography, Box, Tab } from '@mui/material';
import { useParams, useNavigate } from 'react-router';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useTranslation } from 'react-i18next';
import LoadingPage from 'components/LoadingPage';
import RoomInfor from './component/RoomInfor';
import StudentRoom from './component/StudentRoom';
import { getRoomByIdService, updateRoomByIdService, removeStudentsInRoomService } from 'services/roomService';
import { raiseNotification } from 'store/reducers/notification';
import { useDispatch } from 'react-redux';

/**
 * Des: UI user detail
 * returns
 */
const UserDetail = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
    const [valueTab, setValueTab] = useState('1');
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const [room, setRoom] = useState();
    useEffect(() => {
        setTimeout(() => {
            getRoomById();
        }, 500);
    }, []);
    const getRoomById = () => {
        getRoomByIdService(id).then((res) => {
            setRoom(res.data);
            setIsLoading(false);
        });
    };
    const updateRoomById = (value) => {
        setIsLoading(true);
        setTimeout(() => {
            updateRoomByIdService(id, value).then((res) => {
                getRoomById();
                setIsLoading(false);
                dispatch(raiseNotification({ visible: true, content: 'Update thành công', severity: 'success' }));
            });
        }, [500]);
    };

    const removeStudentsInRoom = (value) => {
        setIsLoading(true);
        setTimeout(() => {
            removeStudentsInRoomService({
                students: value
            }).then((res) => {
                getRoomById();
                setIsLoading(false);
                dispatch(raiseNotification({ visible: true, content: 'Update thất bại', severity: 'success' }));
            });
        }, [500]);
    };

    // Change tab
    const handleChange = (event, newValue) => {
        setValueTab(newValue);
    };

    const parentCallback = (child) => {
        setIsLoading(child);
    };

    return (
        <React.Fragment>
            <Box sx={{ width: '100%', mr: 2 }}>
                <Typography id="modal-modal-title" variant="h4" component="h2" sx={{ mb: 2 }}>
                    {t('Room information')}
                </Typography>
                <TabContext value={valueTab}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '322px' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label={t('Chi tiết')} value="1" />
                            <Tab label={t('Sinh viên')} value="2" />
                        </TabList>
                    </Box>
                    {isLoading ? (
                        <LoadingPage />
                    ) : (
                        <>
                            <TabPanel value="1">
                                <RoomInfor room={room} setRoom={setRoom} updateRoomById={updateRoomById} />
                            </TabPanel>
                            <TabPanel value="2">
                                <StudentRoom studentInRoom={room?.users} removeStudentsInRoom={removeStudentsInRoom} />
                            </TabPanel>
                        </>
                    )}
                </TabContext>
            </Box>
        </React.Fragment>
    );
};

export default UserDetail;
