import LayoutDashboardComponent from "@layouts/layout.dashboard";
import React from "react";

export default async function LayoutDashboard({ children } : { children ?: React.ReactNode }) {
    return(
        <LayoutDashboardComponent>
            { children }
        </LayoutDashboardComponent>
    )
}