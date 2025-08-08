'use client'

import React, { useRef } from "react";
import LayoutSidebar from "./layout.sidebar";
import HeaderDashboard from "@components/headers/header.dashboard";
import Modal, { RefModalHandle } from "@components/modal";
import { DashboardContext } from "../context/dashboard.context";

export interface PropsLayoutDashboard {
    children?: React.ReactNode;
};

const LayoutDashboardComponent: React.FC<PropsLayoutDashboard> = ({ children }) => {

    const refModal = useRef<RefModalHandle | null>(null);

    return (
        <React.Fragment>
            <DashboardContext.Provider value={{ refModal }}>
                <div className="h-screen mx-auto overflow-hidden bg-gray-100">
                    <HeaderDashboard />
                    <div className="flex flex-1">
                        <LayoutSidebar />
                        <main className="flex px-4 py-4 w-full flex-col h-[90svh] overflow-y-scroll disabled-scrool">
                            {children}
                        </main>
                    </div>
                </div>
            </DashboardContext.Provider>
            <Modal ref={refModal}/>
        </React.Fragment>
    )
};

export default LayoutDashboardComponent;