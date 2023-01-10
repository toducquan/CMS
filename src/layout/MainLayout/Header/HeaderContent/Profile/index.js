import PropTypes from 'prop-types';
import { useRef, useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    ButtonBase,
    CardContent,
    ClickAwayListener,
    Grid,
    IconButton,
    Paper,
    Popper,
    Stack,
    Tab,
    Tabs,
    Typography
} from '@mui/material';
import { useNavigate, useRoutes } from 'react-router-dom';
// project import
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';
import ProfileTab from './ProfileTab';
import SettingTab from './SettingTab';
import { getProfileUserService } from 'services/authService';
// assets
import avatar1 from 'assets/images/users/avatar_default.png';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { removeProfile } from 'store/reducers/profile';
import { raiseProfile } from 'store/reducers/profile';
import { getListBuildingService } from 'services/buildingService';
import { getListRoomService } from 'services/roomService';
import { setBuildingList } from 'store/reducers/building';
import { setRoomList } from 'store/reducers/room';
import { getListUserService } from 'services/userService';
import { setBuildingManager, setFloorManager } from 'store/reducers/manager';

// tab panel wrapper
function TabPanel({ children, value, index, ...other }) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`profile-tabpanel-${index}`} aria-labelledby={`profile-tab-${index}`} {...other}>
            {value === index && children}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `profile-tab-${index}`,
        'aria-controls': `profile-tabpanel-${index}`
    };
}

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

// Des: Profile user
const Profile = () => {
    const theme = useTheme();
    const userToken = localStorage.getItem('TOKEN');
    const path = window.location.pathname.split('/');
    const navigate = useNavigate();
    const anchorRef = useRef(null);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState();

    useEffect(() => {
        if (userToken) {
            getProfileUserService()
                .then((res) => {
                    dispatch(raiseProfile({ profile: res.data }));
                    setUser(res.data);
                })
                .catch((err) => {
                    localStorage.removeItem('TOKEN');
                    navigate('/login');
                });
            getListBuildingService()
                .then((res) => {
                    dispatch(setBuildingList({ building: res.data }));
                })
                .catch((err) => {
                    console.log('err: ', err);
                });
            getListRoomService()
                .then((res) => {
                    dispatch(setRoomList({ room: res.data }));
                })
                .catch((err) => {
                    console.log('err: ', err);
                });
            getListUserService({ role: 'BUILDING_MANAGER' })
                .then((res) => {
                    dispatch(setBuildingManager({ buildingManager: res.data }));
                })
                .catch((err) => {
                    console.log('err: ', err);
                });
            getListUserService({ role: 'FLOOR_MANAGER' })
                .then((res) => {
                    dispatch(setFloorManager({ floorManager: res.data }));
                })
                .catch((err) => {
                    console.log('err: ', err);
                });
        }
        if (!userToken) {
            navigate('/login');
        }
    }, [window.location.pathname]);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('TOKEN');
        dispatch(removeProfile());
        navigate('/login');
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const iconBackColorOpen = 'grey.300';
    const styleTextTooLong = { maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexShrink: 0, ml: 0.75, maxWidth: 400 }}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
                <Avatar alt="profile user" src={avatar1} sx={{ width: 32, height: 32 }} />
                <Typography variant="subtitle1" style={styleTextTooLong}>
                    {user?.name}
                </Typography>
            </Stack>
            <Grid>
                <span style={{ display: 'block', width: '1px', height: '19px', background: '#262626', margin: '11px 10px 0 10px' }}></span>
            </Grid>
            <ButtonBase
                sx={{
                    p: 0.25,
                    bgcolor: open ? iconBackColorOpen : 'transparent',
                    borderRadius: 1,
                    '&:hover': { bgcolor: 'secondary.lighter' }
                }}
                aria-controls={open ? 'profile-grow' : undefined}
                aria-haspopup="true"
                onClick={handleLogout}
            >
                <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
                    <LogoutIcon fontSize="small" style={{ color: '#8c9297', marginBottom: '4px' }} />
                    <Typography variant="subtitle1" style={{ marginLeft: '10px' }}>
                        Logout
                    </Typography>
                </Stack>
            </ButtonBase>

            {/* <ButtonBase
                sx={{
                    p: 0.25,
                    bgcolor: open ? iconBackColorOpen : 'transparent',
                    borderRadius: 1,
                    '&:hover': { bgcolor: 'secondary.lighter' }
                }}
                aria-label="open profile"
                ref={anchorRef}
                aria-controls={open ? 'profile-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
            >
                <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
                    <Avatar alt="profile user" src={avatar1} sx={{ width: 32, height: 32 }} />
                    <Typography variant="subtitle1" style={styleTextTooLong}>
                        {getProfile?.name}
                    </Typography>
                </Stack>
            </ButtonBase>
            <Popper
                placement="bottom-end"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 9]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions type="fade" in={open} {...TransitionProps}>
                        {open && (
                            <Paper
                                sx={{
                                    boxShadow: theme.customShadows.z1,
                                    width: 290,
                                    minWidth: 240,
                                    maxWidth: 290,
                                    [theme.breakpoints.down('md')]: {
                                        maxWidth: 250
                                    }
                                }}
                            >
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MainCard elevation={0} border={false} content={false}>
                                        <CardContent sx={{ px: 2.5, pt: 3 }}>
                                            <Grid container justifyContent="space-between" alignItems="center">
                                                <Grid item>
                                                    <Stack direction="row" spacing={1.25} alignItems="center">
                                                        <Avatar alt="profile user" src={avatar1} sx={{ width: 32, height: 32 }} />
                                                        <Stack>
                                                            <Typography variant="h6" style={{ ...styleTextTooLong, maxWidth: '200px' }}>
                                                                {getProfile?.name}
                                                            </Typography>
                                                            <Typography variant="body2" color="textSecondary">
                                                                UI/UX Designer
                                                            </Typography>
                                                        </Stack>
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                        {open && (
                                            <>
                                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                    <Tabs
                                                        variant="fullWidth"
                                                        value={value}
                                                        onChange={handleChange}
                                                        aria-label="profile tabs"
                                                    >
                                                        <Tab
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                textTransform: 'capitalize'
                                                            }}
                                                            icon={<UserOutlined style={{ marginBottom: 0, marginRight: '10px' }} />}
                                                            label="Profile"
                                                            {...a11yProps(0)}
                                                        />
                                                        <Tab
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                textTransform: 'capitalize'
                                                            }}
                                                            icon={<SettingOutlined style={{ marginBottom: 0, marginRight: '10px' }} />}
                                                            label="Setting"
                                                            {...a11yProps(1)}
                                                        />
                                                    </Tabs>
                                                </Box>
                                                <TabPanel value={value} index={0} dir={theme.direction}>
                                                    <ProfileTab />
                                                </TabPanel>
                                                <TabPanel value={value} index={1} dir={theme.direction}>
                                                    <SettingTab />
                                                </TabPanel>
                                            </>
                                        )}
                                    </MainCard>
                                </ClickAwayListener>
                            </Paper>
                        )}
                    </Transitions>
                )}
            </Popper> */}
        </Box>
    );
};

export default Profile;
