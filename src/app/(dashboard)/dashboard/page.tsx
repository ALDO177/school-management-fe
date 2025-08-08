import DashboardComponent from "@components/dashboard";
import React from "react";

export default function PageDashboard() {
    return (
        <React.Fragment>
            <div className="slide-up duration-500">
                <DashboardComponent />
            </div>
        </React.Fragment>
    )
}