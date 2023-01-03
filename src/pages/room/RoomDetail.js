import React, { useEffect, useState } from 'react';
import { Typography, Box, Tab } from '@mui/material';
import { getUserByIdService, getListUsersService } from 'services/userService';
import { useParams, useNavigate } from 'react-router';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import UserInTeam from './UserInTeam';
import { useTranslation } from 'react-i18next';
import UserInfo from './UserInfo';
import UserReport from './UserReport';
import LoadingPage from 'components/LoadingPage';
import { SLUG } from 'contants/auth';

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
    useEffect(() => {
        setTimeout(() => {
            getUserById();
        }, 500);
    }, [isLoading]);
    const getUserById = () => {
        const listUserInCompany = [];
        getListUsersService()
            .then((res) => {
                res.data.data.map((item) => {
                    listUserInCompany.push(item.id);
                });
                if (!listUserInCompany.includes(id)) {
                    navigate(`/company/${slug}/not-found`);
                }
            })
            .catch((err) => {
                console.log('err: ', err);
            });

        getUserByIdService(id)
            .then((res) => {
                setInfoUser(res.data.data);
                setUserInTeam(res.data.data.teams);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log('err: ', err);
                if (err.response.status == 500) {
                    navigate(`/company/${slug}/not-found`);
                    setIsLoading(false);
                }
            });
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
                    {t('page_user.text.title')}
                </Typography>
                <TabContext value={valueTab}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '322px' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label={t('page_user.tab.info_user.name_tab')} value="1" />
                            <Tab label={t('page_user.tab.in_team.name_tab')} value="2" />
                            <Tab label={t('page_user.tab.report.name_tab')} value="3" />
                        </TabList>
                    </Box>
                    {isLoading ? (
                        <LoadingPage />
                    ) : (
                        <>
                            <TabPanel value="1">
                                <UserInfo infoUser={infoUser} getUserById={getUserById} parentCallback={parentCallback} />
                            </TabPanel>
                            <TabPanel value="2">
                                <UserInTeam getUserById={getUserById} userInTeam={userInTeam} idUser={id} parentCallback={parentCallback} />
                            </TabPanel>
                            <TabPanel value="3">
                                <UserReport />
                            </TabPanel>
                        </>
                    )}
                </TabContext>
            </Box>
        </React.Fragment>
    );
};

export default UserDetail;
