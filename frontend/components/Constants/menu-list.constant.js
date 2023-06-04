import { 
    RiHomeSmileLine,
    RiGpsFill,
} from "react-icons/ri";

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