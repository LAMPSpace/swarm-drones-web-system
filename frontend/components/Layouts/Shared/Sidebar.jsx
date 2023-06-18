import { useRouter } from "next/router";
import { useState } from "react";
import { Nav, Collapse } from "react-bootstrap";
import Link from "next/link";

import {
    MdOutlineExpandLess,
    MdOutlineExpandMore,
} from "react-icons/md";

export default function Sidebar({ menuList }) {
    const router = useRouter();
    const [activeKey, setActiveKey] = useState([]);

    const handleSelect = (eventKey) => {
        setActiveKey(prevActiveKey => {
            if (prevActiveKey.includes(eventKey)) {
                return prevActiveKey.filter(key => key !== eventKey);
            } else {
                return [...prevActiveKey, eventKey];
            }
        });
    };
    
    const renderItem = (menu, index) => {
        return (
            <Nav.Item key={index}>
                <Link
                    href={menu.path}
                    className={`nav-link d-flex px-4 ${router.pathname === menu.path ? "active" : ""}`}
                >
                    <span className="sidebar-icon d-flex align-items-center">
                        <menu.icon className="fill-current width-4 height-4 mr-3" />
                    </span>
                    <span className="flex-grow-1 text-truncate">
                        {menu.title}
                    </span>
                </Link>
            </Nav.Item>
        );
    };

    const renderMenu = (menuList) => {
        return menuList.map((menu, index) => {
            if (menu.subMenu) {
                return (
                    <Nav.Item key={index}>
                        <Nav.Link
                            className={`d-flex px-4 ${router.pathname === menu.path ? "active" : ""}`}
                            onClick={() => handleSelect(index)}
                            aria-expanded={activeKey.includes(index)}
                        >
                            <span className="sidebar-icon d-flex align-items-center">
                                <menu.icon className="fill-current width-4 height-4 mr-3" />
                            </span>
                            <span className="flex-grow-1 text-truncate">
                                {menu.title}
                            </span>
                            <span className="d-flex align-items-center ml-auto sidebar-expand">
                                {activeKey.includes(index) ? <MdOutlineExpandLess /> : <MdOutlineExpandMore />}
                            </span>
                        </Nav.Link>
                        <Collapse in={activeKey.includes(index)} className={"sub-menu"}>
                            <div>
                                <Nav className="d-block text-truncate">
                                    {renderMenu(menu.subMenu)}
                                </Nav>
                            </div>
                        </Collapse>
                    </Nav.Item>
                );
            } else {
                return renderItem(menu, index);
            }
        });
    };

    return (
        <Nav className="d-block text-truncate">
            {renderMenu(menuList)}
        </Nav>
    );
}