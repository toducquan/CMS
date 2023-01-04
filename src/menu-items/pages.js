import { DashboardOutlined, HomeOutlined } from '@ant-design/icons';

// icons
const icons = {
    DashboardOutlined,
    HomeOutlined
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
        }
    ]
};

export default pages;
