import Head from "next/head";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/auth";
import { useState } from "react";

// UI Components
import GuestLayout from "@/components/Layouts/GuestLayout";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Label from "@/components/Forms/Label";
import InputText from "@/components/Forms/InputText";
import InputError from "@/components/Forms/InputError";
import Link from "next/link";
import HeadCustom from "@/components/Layouts/Shared/HeadCustom";
import BACKGROUND from "@/assets/images/background.jpg";

const renderHead = () => {
    return (
        <HeadCustom title="Đăng nhập | HCMUTE Swarm Drones Control" description="Đăng nhập | HCMUTE Swarm Drones Control" />
    );
};

export default function Login() {
    const router = useRouter()
    const { login } = useAuth({
        middleware: "guest",
        redirectIfAuthenticated: "/",
    });
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState(null);

    const submitLogin = async (e) => {
        e.preventDefault();

        await login({
            email,
            password,
            remember: remember,
            setErrors,
            setStatus,
        });
    };

    return (
        <>
            {renderHead()}
            <GuestLayout>
                <div className="bg-base-1 d-flex align-items-start align-items-lg-center flex-fill">
                    <Container className="h-100 py-6">
                        <div className="text-center d-block d-lg-none">
                            <h1 className="h2 mb-3 d-inline-block">ĐĂNG NHẬP</h1>
                            <div className="m-auto">
                                <p className="text-muted font-weight-normal font-size-lg mb-0">
                                    Hệ thống điều khiển Swarm Drones của HCMUTE
                                </p>
                            </div>
                        </div>
                        <Row className="h-100 justify-content-center align-items-center mt-5 mt-lg-0">
                            <Col xs={12}>
                                <Card className="border-0 shadow-sm overflow-hidden">
                                    <Row className="no-gutters">
                                        <Col xs={12} lg={5}>
                                            <Card.Body className="p-lg-5">
                                                <Form onSubmit={submitLogin}>
                                                    <Form.Group className="form-group">
                                                        <Label htmlFor="i-email">ĐỊA CHỈ E-MAIL</Label>
                                                        <InputText
                                                            id="i-email"
                                                            name="email"
                                                            type="email"
                                                            placeholder="Nhập địa chỉ e-mail"
                                                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            autoFocus
                                                        />
                                                        <InputError message={errors.email} />
                                                    </Form.Group>
                                                    <Form.Group className="form-group">
                                                        <Label htmlFor="i-password">MẬT KHẨU</Label>
                                                        <InputText
                                                            id="i-password"
                                                            name="password"
                                                            type="password"
                                                            placeholder="Nhập mật khẩu"
                                                            className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                        />
                                                        <InputError message={errors.password} />
                                                    </Form.Group>
                                                    <Form.Group className="form-group row">
                                                        <Col xs={6}>
                                                            <div className="custom-control custom-checkbox">
                                                                <input
                                                                    className="custom-control-input"
                                                                    type="checkbox"
                                                                    name="remember"
                                                                    id="i-remember"
                                                                    checked={remember}
                                                                    onChange={(e) => setRemember(e.target.checked)}
                                                                />
                                                                <Label
                                                                    className="custom-control-label"
                                                                    htmlFor="i-remember"
                                                                >
                                                                    Ghi nhớ đăng nhập
                                                                </Label>
                                                            </div>
                                                        </Col>
                                                        <Col xs={6} className="text-right">
                                                            <Link href="#" className="text-decoration-none">
                                                                Quên mật khẩu?
                                                            </Link>
                                                        </Col>
                                                    </Form.Group>
                                                    <Button className="btn btn-block btn-primary py-2" type="submit">
                                                        ĐĂNG NHẬP
                                                    </Button>
                                                </Form>
                                            </Card.Body>
                                            <Card.Footer className="bg-base-2 border-0">
                                                <div className="text-center text-muted my-2">
                                                    Liên hệ với
                                                    <Link
                                                        href="#"
                                                        className="text-decoration-none"
                                                    >
                                                        {" "}
                                                        quản trị viên
                                                        {" "}
                                                    </Link>
                                                    để được cấp tài khoản.
                                                </div>
                                            </Card.Footer>
                                        </Col>
                                        <Col 
                                            xs={12} lg={7}
                                            className="bg-dark d-none d-lg-flex flex-fill background-size-cover background-position-center"
                                            style={{ 
                                                backgroundImage: `url(${BACKGROUND.src})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                            }}
                                        ></Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </GuestLayout>
        </>
    );
}
