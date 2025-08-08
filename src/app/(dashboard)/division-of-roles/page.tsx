import DivisionOfRoles from "@components/dashboard/division-of-roles";
import { Metadata } from "next";

export const metadata : Metadata = {
    title: "Pembagian Peran"
};

export default async function Page() {
    return(
        <div id="page-division-of-roles" className="slide-up duration-500">
             <DivisionOfRoles/>
        </div>
    )
}