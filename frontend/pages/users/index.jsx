import {useRouter} from "next/router";
import {useAuth} from "@/hooks/auth";
import {useEffect} from "react";
import {IS_ADMIN} from "@/components/Constants/common.constant";
import HeadCustom from "@/components/Layouts/Shared/HeadCustom";
import MainLayout from "@/components/Layouts/MainLayout";
import MainBodyWrap from "@/components/Layouts/Shared/MainBodyWrap";
import Loading from "@/components/Layouts/Shared/Loading";
import DataTable from "@/components/Generals/DataTable/DataTable";
import {ADMIN_MENU_LIST} from "@/components/Constants/menu-list.constant";

const UserList = () => {
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
            label: "Họ và tên",
        },
        {
            id: "username",
            label: "Tên đăng nhập",
        },
        {
            id: "email",
            label: "Email",
        },
        {
            id: "is_admin",
            label: "Quyền",
            render: (data) => {
                return data.is_admin === IS_ADMIN ? "Admin" : "Người dùng"
            }
        }
    ]

    const actions = [
        {
            type: "view",
            label: "Xem",
            className: "btn btn-primary mr-2",
            onClick: (data) => {
                router.push(`/users/${data.id}`)
            }
        },
        {
            type: "edit",
            label: "Sửa",
            className: "btn btn-secondary mr-2",
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
                    title="Danh sách người dùng | HCMUTE Swarm Drones Control"
                    description="Danh sách người dùng | HCMUTE Swarm Drones Control" />
                <MainLayout sbMenuList={sbMenuList} isFrontModule={false}>
                    <MainBodyWrap>
                        <DataTable
                            title="DANH SÁCH NGƯỜI DÙNG"
                            fetchUrl={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`}
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
            {(user && user?.is_admin === IS_ADMIN) ? renderIsAuthenticated(user, ADMIN_MENU_LIST) : renderIsNotAuthenticated()}
        </>
    )
}

export default UserList