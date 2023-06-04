import Link from "next/link";
import { RiArrowRightSLine } from "react-icons/ri";

export default function CardRelatedLink({ icon, title, link }) {
    return (
        <div className="card border-0 h-100 shadow-sm">
            <div className="card-body d-flex align-items-center text-truncate">
                <div className="d-flex position-relative text-success width-8 height-8 align-items-center justify-content-center flex-shrink-0">
                    <div className="position-absolute bg-success opacity-10 top-0 right-0 bottom-0 left-0 border-radius-lg"></div>
                    {icon}
                </div>
                <Link href={link} className="text-dark font-weight-medium stretched-link text-decoration-none text-truncate mx-3">
                    {title}
                </Link>
                <div className="text-muted d-flex align-items-center text-truncate ml-auto">
                    <RiArrowRightSLine className="flex-shrink-0 width-3 height-3 fill-current mx-2 fs-4" />
                </div>
            </div>
        </div>
    );
}