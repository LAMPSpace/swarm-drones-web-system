import { useRouter } from 'next/router'
import { useEffect } from "react";
import { useAuth } from '@/hooks/auth';
import { IS_ADMIN} from "@/components/Constants/common.constant";
import Loading from "@/components/Layouts/Shared/Loading";
import { ADMIN_MENU_LIST } from "@/components/Constants/menu-list.constant";
import HeadCustom from "@/components/Layouts/Shared/HeadCustom";
import MainLayout from "@/components/Layouts/MainLayout";
import MainBodyWrap from "@/components/Layouts/Shared/MainBodyWrap";

const Dashboard = () => {
    const router = useRouter()
    const { user } = useAuth({
        middleware: "auth"
    })

    useEffect(() => {
        if (user?.is_admin !== IS_ADMIN) {
            router.push('/403')
        }
    }, [user])

    const renderIsAuthenticated = (user, sbMenuList) => {
        return (
            <>
                <HeadCustom title="Bảng điều khiển | HCMUTE Swarm Drones Control" description="Bảng điều khiển | HCMUTE Swarm Drones Control" />
                <MainLayout sbMenuList={sbMenuList} isFrontModule={false}>
                    <MainBodyWrap>
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

export default Dashboard