import { 
    RiHomeSmileLine,
    RiGpsFill,
} from "react-icons/ri";
import {
    FaUsers,
    FaUserFriends,
    FaUserPlus
} from "react-icons/fa";

export const USER_MENU_LIST = [
    {
        title: 'Trang chủ',
        name: 'home',
        path: '/',
        icon: RiHomeSmileLine
    },
    {
        title: 'Quản lý UAVs',
        name: 'uavs',
        path: '#',
        icon: RiGpsFill,
        subMenu: [
            {
                title: 'Danh sách UAVs',
                name: 'uavs-list',
                path: '/uavs',
                icon: RiGpsFill
            },
            {
                title: 'Thêm mới UAVs',
                name: 'uavs-add',
                path: '/uavs/add',
                icon: RiGpsFill
            }
        ]
    },
    {
        title: 'GPS',
        name: 'gps',
        path: '/gps',
        icon: RiGpsFill
    },
];

export const ADMIN_MENU_LIST = [
    {
        title: 'Bảng điều khiển',
        name: 'dashboard',
        path: '/dashboard',
        icon: RiHomeSmileLine
    },
    {
        title: 'Quản lý người dùng',
        name: 'users',
        path: '#',
        icon: FaUsers,
        subMenu: [
            {
                title: 'Danh sách người dùng',
                name: 'users-list',
                path: '/users',
                icon: FaUserFriends
            },
            {
                title: 'Thêm mới người dùng',
                name: 'users-add',
                path: '/users/add',
                icon: FaUserPlus
            }
        ]
    }
];