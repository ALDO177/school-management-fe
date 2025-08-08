'use client'

import Dialog from "@components/dialog";
import Overlay from "@components/overlay";
import axios from "axios";
import { useState } from "react";
import { BsBoxArrowRight, BsGear, BsPerson } from "react-icons/bs";
import { FaGraduationCap, FaTriangleExclamation } from "react-icons/fa6";
import { Bounce, toast } from "react-toastify";

const HeaderDashboard: React.FC = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const labelOverlay = () => {
        return (
            <div className="flex justify-center bg-slate-400 items-center w-10 h-10 rounded-full">
                <BsPerson size={30} />
            </div>
        )
    }

    const accept = async () => {
        try {
            await axios.post('/api/auth/logout', undefined);
            window.location.href = '/login';

        } catch (err) {
            console.log(err);
            toast.error("Logout Gagal...", {
                autoClose: 2000,
                theme: "colored",
                transition: Bounce
            })
        }
    }

    const reject = () => {
        setIsOpen(false);
        toast.error("Logout Di batalkan", {
            autoClose: 2000,
            theme: "colored",
            transition: Bounce
        })
    }
    return (
        <div className="sticky top-0 z-50 w-full flex justify-between px-3 py-3 min-h-[10svh] bg-[linear-gradient(135deg,_#667eea_0%,_#764ba2_100%)]">
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-4 ml-36">
                    <FaGraduationCap size={35} className="fill-white" />
                    <div>
                        <h1 className="text-white text-2xl font-semibold">SMA Negeri 2 Samarinda</h1>
                        <span className="text-white">Sistem Manajemen Pendampingan Murid</span>
                    </div>
                </div>

                <div className="flex items-center space-x-5 text-white">
                    <div>
                        <h1 className="text-lg font-semibold">Admin System</h1>
                        <span className="block text-xs float-end">Online</span>
                    </div>
                    <Overlay
                        label={labelOverlay}
                        panelClassName="bg-red-500">
                        <ul className="list-none divide-y text-gray-600 divide-gray-300 min-w-[8rem]">
                            <li>
                                <ul className="list-none">
                                    <li className="flex space-x-3 items-center px-2 rounded-md py-3 hover:bg-gray-200">
                                        <BsPerson size={20} />
                                        <span>Profile</span>
                                    </li>
                                    <li className="flex space-x-3 items-center rounded-md px-2 py-3 hover:bg-gray-200">
                                        <BsGear size={20} />
                                        <span>Settings</span>
                                    </li>
                                </ul>
                            </li>
                            <li className="cursor-pointer px-2 py-3 rounded-md hover:bg-gray-200 mt-2" onClick={() => setIsOpen(true)}>
                                <div className="flex space-x-3 items-center">
                                    <BsBoxArrowRight size={22} />
                                    <span>Logout</span>
                                </div>
                            </li>
                        </ul>
                    </Overlay>
                </div>
            </div>

            <Dialog
                reject={reject}
                accept={accept}
                open={isOpen}
                onClose={() => setIsOpen(false)}>
                <div className={"flex items-center space-x-3 w-full"}>
                    <FaTriangleExclamation className="fill-orange-400" size={30} />
                    <h1 className="text-gray-500"> Apa ada yakin ingin Keluar dari halaman ini...</h1>
                </div>
            </Dialog>
        </div>
    )
};

export default HeaderDashboard