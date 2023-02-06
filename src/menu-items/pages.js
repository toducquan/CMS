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
            title: 'Toà nhà',
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
            title: 'Phòng KTX',
            type: 'item',
            url: '/room',
            icon: icons.GroupOutlined,
            breadcrumbs: true,
            children: [
                {
                    id: 'room-detail',
                    title: 'Chi tiết phỏng',
                    type: 'item-child',
                    url: '/room/:id',
                    breadcrumbs: true
                }
            ]
        },

        {
            id: 'user',
            title: 'Người dùng',
            type: 'collapse',
            url: '/user',
            icon: icons.UserOutlined,
            children: [
                {
                    id: 'building-manager-list',
                    title: 'Quản lý toà nhà',
                    type: 'item',
                    url: '/user/building-manager-list',
                    breadcrumbs: true,
                    children: [
                        {
                            id: 'building-manager-detail',
                            title: 'Thông tin chi tiết',
                            type: 'item-child',
                            url: '/user/building-manager-list/:id',
                            breadcrumbs: true
                        }
                    ]
                },
                {
                    id: 'room-manager-list',
                    title: 'Quản lí phòng ktx',
                    type: 'item',
                    url: '/user/room-manager-list',
                    breadcrumbs: true,
                    children: [
                        {
                            id: 'room-manager-detail',
                            title: 'Thông tin chi tiết',
                            type: 'item-child',
                            url: '/user/room-manager-list/:id',
                            breadcrumbs: true
                        }
                    ]
                },
                {
                    id: 'student-list',
                    title: 'Sinh viên',
                    type: 'item',
                    url: '/user/student-list',
                    breadcrumbs: true,
                    children: [
                        {
                            id: 'student-detail',
                            title: 'Thông tin chi tiết',
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
            title: 'Các khoản phí',
            type: 'collapse',
            url: '/fee',
            icon: icons.FileDoneOutlined,
            children: [
                {
                    id: 'water-fee',
                    title: 'Tiền nước',
                    type: 'item',
                    url: '/fee/water',
                    breadcrumbs: true,
                    children: [
                        {
                            id: 'water-fee-detail',
                            title: 'Chi tiết khoản thu',
                            type: 'item-child',
                            url: '/fee/water/:id',
                            breadcrumbs: true
                        }
                    ]
                },
                {
                    id: 'electric-fee',
                    title: 'Tiền điện',
                    type: 'item',
                    url: '/fee/electric',
                    breadcrumbs: true,
                    children: [
                        {
                            id: 'electric-fee-detail',
                            title: 'Chi tiết khoản thu',
                            type: 'item-child',
                            url: '/fee/electric/:id',
                            breadcrumbs: true
                        }
                    ]
                },
                {
                    id: 'internet-fee',
                    title: 'Tiền mạng',
                    type: 'item',
                    url: '/fee/internet',
                    breadcrumbs: true,
                    children: [
                        {
                            id: 'internet-fee-detail',
                            title: 'Chi tiết khoản thu',
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
            title: 'Tiền thuê phòng',
            type: 'item',
            url: '/rent',
            icon: icons.TransactionOutlined,
            breadcrumbs: true,
            children: [
                {
                    id: 'rent-detail',
                    title: 'Chi tiết khoản thu',
                    type: 'item-child',
                    url: '/rent/:id',
                    breadcrumbs: true
                }
            ]
        },
        {
            id: 'swap-room',
            title: 'Danh sách đổi phòng',
            type: 'item',
            url: '/swap-room',
            icon: icons.RetweetOutlined,
            breadcrumbs: true
        },
        {
            id: 'aspiration',
            title: 'Danh sách nguyện vọng',
            type: 'item',
            url: '/aspiration',
            icon: icons.IdcardOutlined,
            breadcrumbs: true
        }
    ]
};

export default pages;
