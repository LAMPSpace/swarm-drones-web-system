import { useRouter } from 'next/router';
import { userService } from '@/services/users';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/auth';
import {IS_ADMIN, IS_NORMAL_USER, TOAST_SETTINGS} from '@/components/Constants/common.constant';
import { ADMIN_MENU_LIST } from '@/components/Constants/menu-list.constant';
import { toast } from 'react-toastify';
import Loading from "@/components/Layouts/Shared/Loading";
import HeadCustom from "@/components/Layouts/Shared/HeadCustom";
import MainLayout from "@/components/Layouts/MainLayout";
import MainBodyWrap from "@/components/Layouts/Shared/MainBodyWrap";
import {Button, Card, Form} from "react-bootstrap";
import Label from "@/components/Forms/Label";
import InputText from "@/components/Forms/InputText";
import InputError from "@/components/Forms/InputError";
import Link from "next/link";

const ShowUser = () => {
    const router = useRouter();
    const { id } = router.query;
    const { user } = useAuth({
        middleware: "auth"
    })
    const { find, update } = userService();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState(null);
    const [statusUpdate, setStatusUpdate] = useState(null);
    const [name, setName] = useState("");
    const [password, setPassword] = useState(null);
    const [is_admin, setIsAdmin] = useState(IS_NORMAL_USER);

    useEffect(() => {
        if (user) {
            if (user?.is_admin !== IS_ADMIN) {
                router.push('/403')
            }
        }
    }, [user])

    useEffect(() => {
        if (id && user?.is_admin === IS_ADMIN) {
            find({
                id,
                setUser: setData,
                setError,
                setStatus
            })
        }
    }, [id, user]);

    useEffect(() => {
        if (data) {
            setName(data?.name);
            setIsAdmin(data?.is_admin);
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            router.push("/users").then(r => toast.error("Không tìm thấy người dùng", TOAST_SETTINGS))
        }
    }, [error]);

    useEffect(() => {
        if (statusUpdate) {
            router.push(`/users/${data.id}`).then(r => toast.success("Cập nhật người dùng thành công", TOAST_SETTINGS))
        }
    }, [statusUpdate]);

    const submitHandler = async (e) => {
        e.preventDefault();

        await update({
            id,
            name,
            password,
            is_admin,
            setErrors,
            setStatus: setStatusUpdate
        })
    }

    const renderIsNotAuthenticated = () => {
        return (
            <Loading />
        )
    }

    const renderIsAuthenticated = (user, sbMenuList) => {
        return (
            <>
                <HeadCustom
                    title={`${data?.name} | Chỉnh sửa | HCMUTE Swarm Drones Control`}
                    description={`${data?.name} | Chỉnh sửa | HCMUTE Swarm Drones Control`} />
                <MainLayout sbMenuList={sbMenuList} isFrontModule={false}>
                    <MainBodyWrap>
                        <Card className={"border-0 shadow-sm"}>
                            <Card.Header className={"align-items-center"}>
                                <div className={"row"}>
                                    <div className={"col"}>
                                        <div className={"font-weight-medium py-1"}>
                                            Chỉnh sửa người dùng
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
                                <Form onSubmit={submitHandler}>
                                    <Form.Group className={"mb-2"}>
                                        <Label htmlFor={"name"}>Họ và tên</Label>
                                        <InputText
                                            id={"name"}
                                            name={"name"}
                                            type={"text"}
                                            placeholder={"Nhập họ và tên"}
                                            value={name}
                                            className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                            onChange={(e) => setName(e.target.value)}
                                            required={true}
                                        />
                                        <InputError message={errors.name} />
                                    </Form.Group>
                                    <Form.Group className={"mb-2"}>
                                        <Label htmlFor={"username"}>Tài khoản</Label>
                                        <InputText
                                            id={"username"}
                                            type={"text"}
                                            placeholder={"Nhập tài khoản"}
                                            value={data?.username}
                                            disabled={true}
                                        />
                                    </Form.Group>
                                    <Form.Group className={"mb-2"}>
                                        <Label htmlFor={"email"}>Địa chỉ Email</Label>
                                        <InputText
                                            id={"email"}
                                            type={"email"}
                                            placeholder={"Nhập địa chỉ email"}
                                            value={data?.email}
                                            disabled={true}
                                        />
                                    </Form.Group>
                                    <Form.Group className={"mb-2"}>
                                        <Label htmlFor={"password"}>Mật khẩu</Label>
                                        <InputText
                                            id={"password"}
                                            name={"password"}
                                            type={"password"}
                                            placeholder={"Nhập mật khẩu"}
                                            value={password}
                                            className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <InputError message={errors.password} />
                                    </Form.Group>
                                    <Form.Group className={"mb-3"}>
                                        <Label htmlFor={"is_admin"}>Quyền</Label>
                                        <Form.Select
                                            className={`custom-select ${errors.is_admin ? "is-invalid" : ""}`}
                                            id={"is_admin"}
                                            name={"is_admin"}
                                            value={is_admin}
                                            onChange={(e) => setIsAdmin(e.target.value)}
                                        >
                                            <option value={IS_NORMAL_USER}>Người dùng</option>
                                            <option value={IS_ADMIN}>Quản trị viên</option>
                                        </Form.Select>
                                        <InputError message={errors.is_admin} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Button className={"btn btn-primary"} type={"submit"}>
                                            Chỉnh sửa
                                        </Button>
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
