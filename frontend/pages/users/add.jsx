import {useRouter} from "next/router";
import {useAuth} from "@/hooks/auth";
import {useEffect, useState} from "react";
import {IS_ADMIN, IS_NORMAL_USER, TOAST_SETTINGS} from "@/components/Constants/common.constant";
import HeadCustom from "@/components/Layouts/Shared/HeadCustom";
import MainLayout from "@/components/Layouts/MainLayout";
import MainBodyWrap from "@/components/Layouts/Shared/MainBodyWrap";
import Loading from "@/components/Layouts/Shared/Loading";
import {ADMIN_MENU_LIST} from "@/components/Constants/menu-list.constant";
import {Button, Card, Form} from "react-bootstrap";
import Label from "@/components/Forms/Label";
import InputText from "@/components/Forms/InputText";
import InputError from "@/components/Forms/InputError";
import {userService} from "@/services/users";
import {toast} from "react-toastify";

const AddUser = () => {
    const router = useRouter()
    const { user } = useAuth({
        middleware: "auth"
    })

    const { add } = userService()

    useEffect(() => {
        if (user) {
            if (user?.is_admin !== IS_ADMIN) {
                router.push('/403')
            }
        }
    }, [router, user])

    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [is_admin, setIsAdmin] = useState(IS_NORMAL_USER)
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState(null)

    const submitHandler = async (e) => {
        e.preventDefault()
        if (password !== passwordConfirmation) {
            setErrors(
                {
                    password_confirmation: ["Mật khẩu xác nhận không khớp"]
                }
            )
            return false
        }

        await add({
            name,
            username,
            email,
            password,
            is_admin,
            setErrors,
            setStatus,
        })
    }

    useEffect(() => {
        if (status) {
            toast.success('Tạo người dùng thành công', TOAST_SETTINGS)
            router.push('/users')
        }
    }, [status])

    const renderIsAuthenticated = (user, sbMenuList) => {
        return (
            <>
                <HeadCustom
                    title="Thêm người dùng | HCMUTE Swarm Drones Control"
                    description="Thêm người dùng | HCMUTE Swarm Drones Control" />
                <MainLayout sbMenuList={sbMenuList} isFrontModule={false}>
                    <MainBodyWrap>
                        <Card className={"border-0 shadow-sm"}>
                            <Card.Header>
                                <div className={"font-weight-medium py-1"}>
                                    THÊM NGƯỜI DÙNG
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
                                            name={"username"}
                                            type={"text"}
                                            placeholder={"Nhập tài khoản"}
                                            value={username}
                                            className={`form-control ${errors.username ? "is-invalid" : ""}`}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required={true}
                                        />
                                        <InputError message={errors.username} />
                                    </Form.Group>
                                    <Form.Group className={"mb-2"}>
                                        <Label htmlFor={"email"}>Địa chỉ Email</Label>
                                        <InputText
                                            id={"email"}
                                            name={"email"}
                                            type={"email"}
                                            placeholder={"Nhập địa chỉ email"}
                                            value={email}
                                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required={true}
                                        />
                                        <InputError message={errors.email} />
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
                                            required={true}
                                        />
                                        <InputError message={errors.password} />
                                    </Form.Group>
                                    <Form.Group className={"mb-2"}>
                                        <Label htmlFor={"passwordConfirmation"}>Xác nhận mật khẩu</Label>
                                        <InputText
                                            id={"i-passwordConfirmation"}
                                            name={"password_confirmation"}
                                            type={"password"}
                                            placeholder={"Nhập lại mật khẩu"}
                                            value={passwordConfirmation}
                                            className={`form-control ${errors.password_confirmation ? "is-invalid" : ""}`}
                                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                                            required={true}
                                        />
                                        <InputError message={errors.password_confirmation} />
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
                                            Thêm
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

export default AddUser