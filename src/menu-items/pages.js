import { DashboardOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';

// icons
const icons = {
    DashboardOutlined,
    HomeOutlined,
    UserOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
    id: 'group-dashboard',
    title: '',
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/',
            icon: icons.DashboardOutlined,
            breadcrumbs: false
        },
        {
            id: 'building',
            title: 'Building',
            type: 'collapse',
            url: '/building',
            icon: icons.HomeOutlined,
            children: [
                {
                    id: 'building-list',
                    title: 'Building List',
                    type: 'item',
                    url: '/building/building-list',
                    breadcrumbs: true,
                    children: [
                        {
                            id: 'building-detail',
                            title: 'Building detail',
                            type: 'item-child',
                            url: '/building/building-list/:id',
                            breadcrumbs: true
                        }
                    ]
                },
                {
                    id: 'room-list',
                    title: 'Room List',
                    type: 'item',
                    url: '/building/room-list',
                    breadcrumbs: true,
                    children: [
                        {
                            id: 'room-detail',
                            title: 'Room detail',
                            type: 'item-child',
                            url: '/building/room-list/:id',
                            breadcrumbs: true
                        }
                    ]
                }
            ]
        },
        {
            id: 'user',
            title: 'User',
            type: 'collapse',
            url: '/user',
            icon: icons.UserOutlined,
            children: [
                {
                    id: 'building-manager-list',
                    title: 'Building Manager List',
                    type: 'item',
                    url: '/user/building-manager-list',
                    breadcrumbs: true,
                    children: [
                        {
                            id: 'building-manager-detail',
                            title: 'Building Manager Detail',
                            type: 'item-child',
                            url: '/user/building-manager-list/:id',
                            breadcrumbs: true
                        }
                    ]
                },
                {
                    id: 'room-manager-list',
                    title: 'Room Manager List',
                    type: 'item',
                    url: '/user/room-manager-list',
                    breadcrumbs: true,
                    children: [
                        {
                            id: 'room-manager-detail',
                            title: 'Room Manager Detail',
                            type: 'item-child',
                            url: '/user/room-manager-list/:id',
                            breadcrumbs: true
                        }
                    ]
                },
                {
                    id: 'student-list',
                    title: 'Student List',
                    type: 'item',
                    url: '/user/student-list',
                    breadcrumbs: true,
                    children: [
                        {
                            id: 'student-detail',
                            title: 'Student Detail',
                            type: 'item-child',
                            url: '/user/student-list/:id',
                            breadcrumbs: true
                        }
                    ]
                }
            ]
        }
    ]
};

export default pages;
