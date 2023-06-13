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
        },
        {
            id: "created_at",
            label: "Ngày tạo",
        }
    ]

    const actions = [
        {
            type: "view",
            onClick: (id) => {
                console.log(id);
            }
        },
        {
            type: "edit",
            onClick: (id) => {
                console.log(id)
            }
        },
        {
            type: "delete",
            onClick: (id) => {
                console.log(id)
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
            {user ? renderIsAuthenticated(user, ADMIN_MENU_LIST) : renderIsNotAuthenticated()}
        </>
    )
}

export default UserList