import {
    DashboardOutlined,
    HomeOutlined,
    UserOutlined,
    GroupOutlined,
    TransactionOutlined,
    FileDoneOutlined,
    RetweetOutlined,
    IdcardOutlined
} from '@ant-design/icons';

// icons
const icons = {
    DashboardOutlined,
    HomeOutlined,
    UserOutlined,
    GroupOutlined,
    TransactionOutlined,
    FileDoneOutlined,
    RetweetOutlined,
    IdcardOutlined
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
            type: 'item',
            url: '/building',
            icon: icons.HomeOutlined,
            breadcrumbs: true,
            children: [
                {
                    id: 'building-detail',
                    title: 'Building detail',
                    type: 'item-child',
                    url: '/building/:id',
                    breadcrumbs: true
                }
            ]
        },
        {
            id: 'room',
            title: 'Room',
            type: 'item',
            url: '/room',
            icon: icons.GroupOutlined,
            breadcrumbs: true,
            children: [
                {
                    id: 'room-detail',
                    title: 'Room detail',
                    type: 'item-child',
                    url: '/room/:id',
                    breadcrumbs: true
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
        },
        {
            id: 'fee',
            title: 'Fee',
            type: 'collapse',
            url: '/fee',
            icon: icons.FileDoneOutlined,
            children: [
                {
                    id: 'water-fee',
                    title: 'Water Fee',
                    type: 'item',
                    url: '/fee/water',
                    breadcrumbs: true,
                    children: [
                        {
                            id: 'water-fee-detail',
                            title: 'Water Fee Detail',
                            type: 'item-child',
                            url: '/fee/water/:id',
                            breadcrumbs: true
                        }
                    ]
                },
                {
                    id: 'electric-fee',
                    title: 'Electric Fee',
                    type: 'item',
                    url: '/fee/electric',
                    breadcrumbs: true,
                    children: [
                        {
                            id: 'electric-fee-detail',
                            title: 'Electric Fee Detail',
                            type: 'item-child',
                            url: '/fee/electric/:id',
                            breadcrumbs: true
                        }
                    ]
                },
                {
                    id: 'internet-fee',
                    title: 'Internet Fee',
                    type: 'item',
                    url: '/fee/internet',
                    breadcrumbs: true,
                    children: [
                        {
                            id: 'internet-fee-detail',
                            title: 'Internet Fee Detail',
                            type: 'item-child',
                            url: '/fee/internet/:id',
                            breadcrumbs: true
                        }
                    ]
                }
            ]
        },
        {
            id: 'rent',
            title: 'Rent',
            type: 'item',
            url: '/rent',
            icon: icons.TransactionOutlined,
            breadcrumbs: true,
            children: [
                {
                    id: 'rent-detail',
                    title: 'Students in rent',
                    type: 'item-child',
                    url: '/rent/:id',
                    breadcrumbs: true
                }
            ]
        },
        {
            id: 'swap-room',
            title: 'Room swap',
            type: 'item',
            url: '/swap-room',
            icon: icons.RetweetOutlined,
            breadcrumbs: true
        },
        {
            id: 'aspiration',
            title: 'Student aspirations',
            type: 'item',
            url: '/aspiration',
            icon: icons.IdcardOutlined,
            breadcrumbs: true
        }
    ]
};

export default pages;
