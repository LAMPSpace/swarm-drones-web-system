import Link from "next/link";
import { Container, Row } from "react-bootstrap";

export default function Footer() {
    return (
        <footer id="footer" className="footer bg-base-0">
            <Container className="py-5">
                <Row>
                    <div className="col-12 col-lg">
                        <ul className="nav p-0 mx-n3 mb-3 mb-lg-0 d-flex flex-column flex-lg-row">
                            <li className="nav-item d-flex">
                                <Link href="#" className="nav-link py-1">
                                    THÔNG TIN ĐỒ ÁN
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="#" className="nav-link py-1">
                                    LIÊN HỆ
                                </Link>
                            </li>
                        </ul>
                    </div>
                </Row>
                <hr />
                <Row>
                    <div className="col-12 col-lg order-2 order-lg-1">
                        <div className="text-muted py-1">© 2023 LAMPSpace</div>
                    </div>
                </Row>
            </Container>
        </footer>
    );
}