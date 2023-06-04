import Link from "next/link";
import { Button, Nav, Container, Navbar } from "react-bootstrap";
import HCMUTELogo from "./HCMUTELogo";

export default function GuestHeader() {

    return (
        <div id="header" className="header sticky-top shadow bg-base-0 z-1025">
            <Container>
                <Navbar
                    expand="lg"
                    className="px-0 py-3"
                >
                    <Navbar.Brand className="p-0">
                        <Link href="/">
                            <HCMUTELogo />
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle
                        aria-controls="basic-navbar-nav"
                        className="border-0 p-0"
                    />
                    <Navbar.Collapse
                        id="basic-navbar-nav"
                    >
                        <Nav className="pt-2 p-lg-0 ml-auto">
                            <Nav.Item>
                                <Link href="/login" className="btn btn-outline-primary">
                                    ĐĂNG NHẬP
                                </Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        </div>
    );
}