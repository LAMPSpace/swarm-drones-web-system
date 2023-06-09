import {useRouter} from "next/router";
import {useAuth} from "@/hooks/auth";
import {useEffect} from "react";
import {IS_ADMIN, IS_CONNECTED} from "@/components/Constants/common.constant";
import HeadCustom from "@/components/Layouts/Shared/HeadCustom";
import MainLayout from "@/components/Layouts/MainLayout";
import MainBodyWrap from "@/components/Layouts/Shared/MainBodyWrap";
import Loading from "@/components/Layouts/Shared/Loading";
import DataTable from "@/components/Generals/DataTable/DataTable";
import {USER_MENU_LIST} from "@/components/Constants/menu-list.constant";
import {
    RiRemoteControlFill
} from "react-icons/ri";
import {
    BsFillTrashFill
} from "react-icons/bs";
import Link from "next/link";

const SwarmList = () => {
    const router = useRouter()
    const { user } = useAuth({
        middleware: "auth"
    })

    useEffect(() => {
        if (user) {
            if (user?.is_admin !== IS_ADMIN) {
                router.push('/403')
            }
        }
    }, [user])

    const columns = [
        {
            id: "name",
            label: "Tên đội",
        },
        {
            id: "owner_name",
            label: "Chủ sở hữu",
        },
        {
            id: "ip_address",
            label: "Địa chỉ IP",
        },
        {
            id: "port",
            label: "Cổng kết nối",
            align: "center"
        }
    ]

    const actions = [
        {
            type: "view",
            label: "Điều khiển",
            icon: <RiRemoteControlFill />,
            className: "btn btn-primary mr-2 w-sm-100",
            onClick: (data) => {
                router.push(`/swarms/${data.id}`)
            }
        },
        {
            type: "delete",
            label: "Xóa",
            className: "btn btn-danger",
            icon: <BsFillTrashFill />,
            onClick: (data) => {
                console.log(data)
            }
        }
    ]

    const renderButtonAdd = () => {
        return (
            <Link
                className={"btn btn-primary"}
                href={"/swarms/add"}
            >
                THÊM ĐỘI
            </Link>
        )
    }

    const renderIsAuthenticated = (user, sbMenuList) => {
        return (
            <>
                <HeadCustom
                    title="Danh sách Swarm | HCMUTE Swarm Drones Control"
                    description="Danh sách Swarm | HCMUTE Swarm Drones Control" />
                <MainLayout sbMenuList={sbMenuList} isFrontModule={true}>
                    <MainBodyWrap>
                        <DataTable
                            title="DANH SÁCH SWARM"
                            fetchUrl={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/swarms`}
                            columns={columns}
                            actions={actions}
                            subHeader={renderButtonAdd()}
                        />
                    </MainBodyWrap>
                </MainLayout>
            </>
        )
    }

    const renderIsNotAuthenticated = () => {
        return (
            <Loading />
        )
    }

    return (
        <>
            {(user) ? renderIsAuthenticated(user, USER_MENU_LIST) : renderIsNotAuthenticated()}
        </>
    )
}

export default SwarmList