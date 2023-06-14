import { 
    RiHomeSmileLine,
} from "react-icons/ri";
import {
    FaUserFriends,
    FaUserPlus,
    FaMapMarkedAlt
} from "react-icons/fa";
import {
    GiMissileSwarm,
    GiTreasureMap
} from "react-icons/gi";
import {
    TbDrone
} from "react-icons/tb";
import {
    IoAddCircle
} from "react-icons/io5";

export const USER_MENU_LIST = [
    {
        title: 'Trang chủ',
        name: 'home',
        path: '/',
        icon: RiHomeSmileLine
    },
    {
        title: 'Quản lý Swarms',
        name: 'swarms',
        path: '#',
        icon: GiMissileSwarm,
        subMenu: [
            {
                title: 'Danh sách Swarms',
                name: 'swarms-list',
                path: '/swarms',
                icon: GiMissileSwarm
            },
            {
                title: 'Thêm mới Swarm',
                name: 'swarms-add',
                path: '/swarms/add',
                icon: IoAddCircle
            }
        ]
    },
    {
        title: 'Quản lý Drones',
        name: 'drones',
        path: '#',
        icon: TbDrone,
        subMenu: [
            {
                title: 'Danh sách Drones',
                name: 'drones-list',
                path: '/drones',
                icon: TbDrone
            },
            {
                title: 'Thêm mới Drones',
                name: 'drones-add',
                path: '/swarms/add',
                icon: IoAddCircle
            }
        ]
    },
    {
        title: 'Quản lý Missions',
        name: 'missions',
        path: '#',
        icon: GiTreasureMap,
        subMenu: [
            {
                title: 'Danh sách Missions',
                name: 'missions-list',
                path: '/missions',
                icon: GiTreasureMap
            },
            {
                title: 'Thêm mới Missions',
                name: 'missions-add',
                path: '/missions/add',
                icon: IoAddCircle
            }
        ]
    },
    {
        title: 'GPS',
        name: 'gps',
        path: '/gps',
        icon: FaMapMarkedAlt
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
        path: '/users',
        icon: FaUserFriends,
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