import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const BuildingList = Loadable(lazy(() => import('pages/building/BuildingList')));
const RoomList = Loadable(lazy(() => import('pages/room/RoomList')));
const BuildingDetail = Loadable(lazy(() => import('pages/building/BuildingDetail')));
const RoomDetail = Loadable(lazy(() => import('pages/room/RoomDetail')));
const UserList = Loadable(lazy(() => import('pages/user/UserList')));
const UserDetail = Loadable(lazy(() => import('pages/user/UserDetail')));
const ListRent = Loadable(lazy(() => import('pages/rent/ListRent')));
const RentDetail = Loadable(lazy(() => import('pages/rent/RentDetail')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: '/building',
            element: <BuildingList />
        },
        {
            path: '/building/:id',
            element: <BuildingDetail />
        },
        {
            path: '/room',
            element: <RoomList />
        },
        {
            path: '/room/:id',
            element: <RoomDetail />
        },
        {
            path: '/user/building-manager-list',
            element: <UserList />
        },
        {
            path: '/user/building-manager-list/:id',
            element: <UserDetail />
        },
        {
            path: '/user/room-manager-list',
            element: <UserList />
        },
        {
            path: '/user/room-manager-list/:id',
            element: <UserDetail />
        },
        {
            path: '/user/student-list',
            element: <UserList />
        },
        {
            path: '/user/student-list/:id',
            element: <UserDetail />
        },
        {
            path: '/rent',
            element: <ListRent />
        },
        {
            path: '/rent/:id',
            element: <RentDetail />
        }
    ]
};

export default MainRoutes;
