import React from "react";

export type SidebarProps = {
    id?: string;
    label?: string;
    className?: string;
    icon?: React.ReactNode;
    to?: string;
    template?: (options?: any) => React.ReactNode;
    children?: Array<SidebarProps>;
}