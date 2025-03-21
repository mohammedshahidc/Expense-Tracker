
import Sidebar from "@/Components/Layouts/sidebar";
import React, { ReactNode } from "react";


interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col ">


            <div className="flex flex-1">

                <Sidebar />

                <main className="flex-1 overflow-auto    ">{children}</main>
            </div>
        </div>
    );
};

export default Layout;
