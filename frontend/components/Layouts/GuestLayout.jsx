import GuestHeader from "./Shared/GuestHeader";
import Footer from "./Shared/Footer";

export default function GuestLayout({ children }) {
    
    return (
        <>
            <GuestHeader />
            <div className="d-flex flex-column flex-fill">
                {children}
                <Footer />
            </div>
        </>
    );
}