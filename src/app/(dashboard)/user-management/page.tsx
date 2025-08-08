import UserManagement from "@components/dashboard/user-management";
import { Metadata } from "next";
import React from "react";

export const metadata : Metadata = {
    title: "User Management"
}

export default async function Page() {
    return(
        <React.Fragment>
            <div id="page-user-management" className="slide-up duration-300"> 
                <UserManagement/>
            </div>
        </React.Fragment>
    )
}