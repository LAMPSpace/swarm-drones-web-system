import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "@/hooks/auth";
import Link from "next/link";

// UI Components
import Footer from "./Shared/Footer";
import SidebarWrap from "./Shared/SidebarWrap";
import Sidebar from "./Shared/Sidebar";

export default function MainLayout({ sbMenuList, children }) {
    const router = useRouter();
    const { logout, user } = useAuth({
        middleware: "auth",
    });

    return (
        <>
            <SidebarWrap user={user} logout={logout}>
                <Sidebar menuList={sbMenuList} />
            </SidebarWrap>
            <div className="d-flex flex-column flex-fill content">
                <div className="bg-base-1 flex-fill">
                    {children}
                </div>
                <Footer />
            </div>
        </>
    );
}