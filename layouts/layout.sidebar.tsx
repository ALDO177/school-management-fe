import SidebarItem from "@components/sidebar/sidebar.item";
import classNames from "classnames";
import { SidebarProps } from "../types/sidebar";
import { FaHome } from "react-icons/fa";
import { FaCalendar, FaChartLine, FaDatabase, FaUsersGear } from "react-icons/fa6";

export interface PropsLayoutSidebar {

};

const itemDataSidebar: Array<SidebarProps> = [
    {
        id: "1",
        label: "Dashboard",
        icon: <FaHome size={18} />,
        to: "/dashboard"
    },
    {
        id: "2",
        label: "Pembagian Peran",
        icon: <FaUsersGear size={18} />,
        to: "/division-of-roles"
    },
    {
        id: "3",
        label: "Data Management",
        icon: <FaDatabase size={18} />,
        to: "/user-management"
    },
     {
        id: "4",
        label: "Jadwal Pendamping",
        icon: <FaCalendar size={18} />,
        to: "/mentoring-schedule"
    },
     {
        id: "5",
        label: "Kolaborasi Orang Tua",
        icon: <FaDatabase size={18} />,
        to: "/parent-collaboration"
    },
     {
        id: "3",
        label: "Matrix Hasil Kordinasi",
        icon: <FaChartLine size={18} />,
        to: "/cordination-result-matrix"
    }
];

const LayoutSidebar: React.FC<PropsLayoutSidebar> = () => {

    const classnames = classNames({
        "w-[18.5rem]": true
    });

    return (
        <aside className={`flex flex-col ${classnames} bg-[linear-gradient(135deg,_#667eea_0%,_#764ba2_100%)] h-[90svh] transition-all duration-200 transform shadow-md border-r border-r-gray-200`}>
            <h1 className="px-4 py-4 text-gray-200 text-lg">Menu Utama</h1>
            <ul className="list-none my-3">
                <SidebarItem
                    data={itemDataSidebar} />
            </ul>
        </aside>
    )
};

export default LayoutSidebar;