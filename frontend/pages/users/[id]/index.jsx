import { useRouter } from 'next/router';
import { userService } from '@/services/users';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/auth';
import { IS_ADMIN, TOAST_SETTINGS } from '@/components/Constants/common.constant';
import { ADMIN_MENU_LIST } from '@/components/Constants/menu-list.constant';
import { toast } from 'react-toastify';
import Loading from "@/components/Layouts/Shared/Loading";
import HeadCustom from "@/components/Layouts/Shared/HeadCustom";
import MainLayout from "@/components/Layouts/MainLayout";
import MainBodyWrap from "@/components/Layouts/Shared/MainBodyWrap";
import {Card, Form} from "react-bootstrap";
import Label from "@/components/Forms/Label";
import InputText from "@/components/Forms/InputText";
import Link from "next/link";

const ShowUser = () => {
	const router = useRouter();
	const { id } = router.query;
	const { user } = useAuth({
		middleware: "auth"
	})
	const { find } = userService();
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [status, setStatus] = useState(null);

	useEffect(() => {
		if (user) {
			if (user?.is_admin !== IS_ADMIN) {
				router.push('/403')
			}
		}
	}, [user, router])

	useEffect(() => {
		if (id && user?.is_admin === IS_ADMIN) {
			find({
				id,
				setUser: setData,
				setError,
				setStatus,
			});
		}
	}, [id, user]);

	useEffect(() => {
		if (error) {
			router.push("/users").then(r => toast.error("Không tìm thấy người dùng", TOAST_SETTINGS))

		}
	}, [error, router]);

	const renderIsNotAuthenticated = () => {
        return (
            <Loading />
        )
    }

	const renderIsAuthenticated = (user, sbMenuList) => {
		return (
			<>
				<HeadCustom
					title={`${data?.name} | HCMUTE Swarm Drones Control`}
					description={`${data?.name} | HCMUTE Swarm Drones Control`} />
				<MainLayout sbMenuList={sbMenuList} isFrontModule={false}>
					<MainBodyWrap>
						<Card className={"border-0 shadow-sm"}>
							<Card.Header className={"align-items-center"}>
								<div className={"row"}>
									<div className={"col"}>
										<div className={"font-weight-medium py-1"}>
											Thông tin người dùng
										</div>
									</div>
									<div className={"col-auto"}>
										<Link href={"/users"}>
											<button className={"btn btn-outline-primary btn-sm"}>
												 Quay lại
											</button>
										</Link>
									</div>
								</div>
							</Card.Header>
							<Card.Body>
								<Form>
									<Form.Group className={"mb-2"}>
										<Label htmlFor={"name"}>Họ và tên</Label>
										<InputText
											id={"name"}
											name={"name"}
											type={"text"}
											value={data?.name}
											className={`form-control`}
											disabled={true}
										/>
									</Form.Group>
									<Form.Group className={"mb-2"}>
										<Label htmlFor={"username"}>Tên đăng nhập</Label>
										<InputText
											id={"username"}
											name={"username"}
											type={"text"}
											value={data?.username}
											className={`form-control`}
											disabled={true}
										/>
									</Form.Group>
									<Form.Group className={"mb-2"}>
										<Label htmlFor={"email"}>Email</Label>
										<InputText
											id={"email"}
											name={"email"}
											type={"text"}
											value={data?.email}
											className={`form-control`}
											disabled={true}
										/>
									</Form.Group>
									<Form.Group className={"mb-3"}>
										<Label htmlFor={"phone"}>Quyền hạn</Label>
										<InputText
											id={"is_admin"}
											name={"is_admin"}
											type={"text"}
											value={data?.is_admin === IS_ADMIN ? "Quản trị viên" : "Người dùng"}
											className={`form-control`}
											disabled={true}
										/>
									</Form.Group>
									<Form.Group>
										<Link className={"btn btn-primary"} href={`/users/${data?.id}/edit`}>
											Đi đến trang chỉnh sửa
										</Link>
									</Form.Group>
								</Form>
							</Card.Body>
						</Card>
					</MainBodyWrap>
				</MainLayout>
			</>
		)
	}

    return (
        <>
			{(data && user?.is_admin === IS_ADMIN) ? renderIsAuthenticated(user, ADMIN_MENU_LIST) : renderIsNotAuthenticated()}
        </>
    )
};

export default ShowUser;
