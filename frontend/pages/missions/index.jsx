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
    }, [router, user])

    const columns = [
        {
            id: "name",
            label: "Tên nhiệm vụ",
        },
        {
            id: "swarm_name",
            label: "Tên đội",
        },
        {
            id: "status",
            label: "Trạng thái",
        },
        {
            id: "is_connected",
            label: "Trạng thái",
            align: "center",
            render: (data) => {
                return data.is_connected === IS_CONNECTED? "Đã chạy" : "Chưa chạy"
            }
        }
    ]

    const actions = [
        {
            type: "view",
            label: "Truy cập đội",
            className: "btn btn-primary mr-2 w-sm-100",
            onClick: (data) => {
                router.push(`/swarms/${data.id}`)
            }
        },
        {
            type: "edit",
            label: "Cấu hình",
            className: "btn btn-secondary mr-2 w-sm-100",
            onClick: (data) => {
                router.push(`/users/${data.id}/edit`)
            }
        },
        {
            type: "delete",
            label: "Xóa",
            className: "btn btn-danger",
            onClick: (data) => {
                console.log(data)
            }
        }
    ]

    const renderIsAuthenticated = (user, sbMenuList) => {
        return (
            <>
                <HeadCustom
                    title="Danh sách nhiệm vụ | HCMUTE Swarm Drones Control"
                    description="Danh sách nhiệm vụ | HCMUTE Swarm Drones Control" />
                <MainLayout sbMenuList={sbMenuList} isFrontModule={true}>
                    <MainBodyWrap>
                        <DataTable
                            title="DANH SÁCH NHIỆM VỤ"
                            fetchUrl={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/planner-missions`}
                            columns={columns}
                            actions={actions}
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