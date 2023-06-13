import { useState } from "react";
import Link from "next/link";
import MainHeader from "./MainHeader";
import { Image } from "react-bootstrap";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { MdLogout, MdAdminPanelSettings, MdHome } from "react-icons/md";
import HCMUTELogo from "./HCMUTELogo";
import { IS_ADMIN} from "@/components/Constants/common.constant";

export default function SidebarWrap({ children, user, isFrontModule, logout }) {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <>
            <MainHeader
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
            />
            <nav
                className={`slide-menu shadow bg-base-0 navbar navbar-light p-0 d-flex flex-column z-1030 ${ showSidebar ? "active" : "" }`}
                id="sidebar"
            >
                <div className="sidebar-section flex-grow-1 d-flex flex-column w-100">
                    <div className="pl-4 py-3 d-flex align-items-center">
                        <Link href={"/"} className="navbar-brand p-0">
                            <HCMUTELogo />
                        </Link>
                    </div>
                    <div className="d-flex align-items-center">
                        <div className="py-3 pl-4 pr-0 font-weight-medium text-muted text-uppercase flex-grow-1">
                            BẢNG ĐIỀU KHIỂN
                        </div>
                        {user.is_admin === IS_ADMIN && (
                            <div className="px-4 py-2">
                                {isFrontModule ? (
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip id="tooltip-direct">Bảng điều khiển</Tooltip>}
                                    >
                                        <Link href={"/dashboard"}>
                                            <span className="d-flex align-items-center">
                                                <MdAdminPanelSettings className="width-4 height-4 fill-current" />
                                            </span>
                                        </Link>
                                    </OverlayTrigger>
                                ) : (
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip id="tooltip-direct">Trang chủ</Tooltip>}
                                    >
                                        <Link href={"/"}>
                                            <span className="d-flex align-items-center">
                                                <MdHome className="width-4 height-4 fill-current"/>
                                            </span>
                                        </Link>
                                    </OverlayTrigger>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="sidebar-section flex-grow-1 overflow-auto sidebar">
                        {children}
                    </div>
                    <div className="sidebar sidebar-footer w-100">
                        <div className="py-3 pl-4 pr-0 d-flex aligns-items-center">
                            <Link
                                href={"#"}
                                className="d-flex align-items-center overflow-hidden text-secondary text-decoration-none flex-grow-1"
                            >
                                <Image
                                    src={"https://ui-avatars.com/api/?background=0D8ABC&color=fff"}
                                    className="flex-shrink-0 rounded-circle width-10 height-10 mr-3"
                                    alt="Ảnh đại diện"
                                />
                                <div className="d-flex flex-column text-truncate">
                                    <div className="font-weight-medium text-dark text-truncate">
                                        {user.name}
                                    </div>

                                    <div className="small font-weight-medium">Quản trị viên</div>
                                </div>
                            </Link>
                            <OverlayTrigger
                                placement="top"
                                overlay={
                                    <Tooltip id="tooltip-top">
                                        Đăng xuất
                                    </Tooltip>
                                }
                            >
                                <Link
                                    href={"#"}
                                    className="py-2 px-4 d-flex flex-shrink-0 align-items-center text-secondary"
                                    onClick={logout}
                                >
                                    <MdLogout className="fill-current width-4 height-4" />
                                </Link>
                            </OverlayTrigger>
                                
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}