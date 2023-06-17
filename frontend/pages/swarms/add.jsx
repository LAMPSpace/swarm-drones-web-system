import {useRouter} from "next/router";
import {useAuth} from "@/hooks/auth";
import {useEffect, useState} from "react";
import {TOAST_SETTINGS} from "@/components/Constants/common.constant";
import HeadCustom from "@/components/Layouts/Shared/HeadCustom";
import MainLayout from "@/components/Layouts/MainLayout";
import MainBodyWrap from "@/components/Layouts/Shared/MainBodyWrap";
import Loading from "@/components/Layouts/Shared/Loading";
import {USER_MENU_LIST} from "@/components/Constants/menu-list.constant";
import {Button, Card, Form} from "react-bootstrap";
import Label from "@/components/Forms/Label";
import InputText from "@/components/Forms/InputText";
import InputError from "@/components/Forms/InputError";
import {swarmService} from "@/services/swarms";
import {toast} from "react-toastify";

const AddSwarm = () => {
    const router = useRouter()
    const { user } = useAuth({
        middleware: "auth"
    })

    const { add } = swarmService()

    const [name, setName] = useState("")
    const [ip_address, setIpAddress] = useState("")
    const [port, setPort] = useState("")
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState(null)

    const submitHandler = async (e) => {
        e.preventDefault()

        await add({
            name,
            ip_address,
            port,
            setErrors,
            setStatus,
        })
    }

    useEffect(() => {
        if (status) {
            router.push('/swarms').then(
                () => {
                    toast.success('Tạo bầy đàn thành công', TOAST_SETTINGS)
                }
            )
        }
    }, [router, status])

    const renderIsAuthenticated = (user, sbMenuList) => {
        return (
            <>
                <HeadCustom
                    title="Thêm Swarm | HCMUTE Swarm Drones Control"
                    description="Thêm Swarm | HCMUTE Swarm Drones Control" />
                <MainLayout sbMenuList={sbMenuList} isFrontModule={true}>
                    <MainBodyWrap>
                        <Card className={"border-0 shadow-sm"}>
                            <Card.Header>
                                <div className={"font-weight-medium py-1"}>
                                    THÊM BẦY ĐÀN
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={submitHandler}>
                                    <Form.Group className={"mb-2"}>
                                        <Label htmlFor={"name"}>TÊN ĐỘI</Label>
                                        <InputText
                                            id={"name"}
                                            name={"name"}
                                            type={"text"}
                                            placeholder={"Nhập tên đội"}
                                            value={name}
                                            className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                            onChange={(e) => setName(e.target.value)}
                                            required={true}
                                        />
                                        <InputError message={errors.name} />
                                    </Form.Group>
                                    <Form.Group className={"mb-2"}>
                                        <Label htmlFor={"ip_address"}>ĐỊA CHỈ IP</Label>
                                        <InputText
                                            id={"ip_address"}
                                            name={"ip_address"}
                                            type={"text"}
                                            placeholder={"Nhập địa chỉ IP"}
                                            value={ip_address}
                                            className={`form-control ${errors.ip_address ? "is-invalid" : ""}`}
                                            onChange={(e) => setIpAddress(e.target.value)}
                                        />
                                        <InputError message={errors.ip_address} />
                                    </Form.Group>
                                    <Form.Group className={"mb-2"}>
                                        <Label htmlFor={"port"}>CỔNG KẾT NỐI</Label>
                                        <InputText
                                            id={"port"}
                                            name={"port"}
                                            type={"text"}
                                            placeholder={"Nhập cổng kết nối"}
                                            value={port}
                                            className={`form-control ${errors.port ? "is-invalid" : ""}`}
                                            onChange={(e) => setPort(e.target.value)}
                                        />
                                        <InputError message={errors.port} />
                                    </Form.Group>
                                    <Form.Group className={"mt-2"}>
                                        <Button className={"btn btn-primary"} type={"submit"}>
                                            Thêm bầy đàn
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
            {(user) ? renderIsAuthenticated(user, USER_MENU_LIST) : renderIsNotAuthenticated()}
        </>
    )
}

export default AddSwarm