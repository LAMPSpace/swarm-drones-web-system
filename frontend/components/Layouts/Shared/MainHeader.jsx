import { Container, Navbar } from 'react-bootstrap';
import Link from 'next/link';
import HCMUTELogo from './HCMUTELogo';

export default function MainHeader({
    showSidebar,
    setShowSidebar,
}) {
    return (
        <div id="header" className="header sticky-top shadow bg-base-0 z-1025 d-lg-none">
            <Container fluid>
                <Navbar
                    className="px-0 py-3"
                    expand="lg"
                >
                    <Link href="/" className="navbar-brand p-0">
                        <HCMUTELogo />
                    </Link>
                    <Navbar.Toggle
                        aria-controls="slide-menu-toggle"
                        className="slide-menu-toggle border-0 p-0"
                        onClick={() => setShowSidebar(!showSidebar)}
                    />
                </Navbar>
                
            </Container>
        </div>
    );
}