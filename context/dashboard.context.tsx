import { RefModalHandle } from "@components/modal";
import React from "react";

export interface DashboardContexApp{
    refModal?: React.RefObject<RefModalHandle | null>;
}

export const DashboardContext = React.createContext<DashboardContexApp>({})