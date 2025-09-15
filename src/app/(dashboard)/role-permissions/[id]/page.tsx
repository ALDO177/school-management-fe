import RolePermissions from "@components/dashboard/role-permissions";
import { forwardApiGet } from "@forwards/server/forward.post";
import { unauthorized } from "next/navigation";
import React from "react";

export default async function Page({ params }: { params: Promise<{ id: number }> }) {

    const { id } = await params;

    try {

        const result = await forwardApiGet(`role/role-permissions/${id}`);

        return (
            <React.Fragment>
                <RolePermissions data={result?.data}/>
            </React.Fragment>
        )
    } catch (err) {
        unauthorized()
    }
}