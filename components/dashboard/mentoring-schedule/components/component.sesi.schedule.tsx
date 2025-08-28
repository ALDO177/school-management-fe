'use client'

import { useSwrAxios } from "@/hooks/useSwrAxios";
import Card from "@components/card";
import { DashboardContext } from "@context/dashboard.context";
import axios from "axios";
import { useContext } from "react";
import { BsMoonFill, BsSunFill, BsTrash2 } from "react-icons/bs";
import { FaTriangleExclamation } from "react-icons/fa6";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";

const SesiSchedule: React.FC = () => {

    const { data, isLoading } = useSwrAxios('/api/master/sessions');
    const { refModal } = useContext(DashboardContext);

    const onDelete = async (id: number) => {
        try {

            const deleted = axios.delete('/api/protected/schedules', { data: [{ id }], timeout: 300000 });
            await toast.promise(
                deleted,
                {
                    pending: 'Hapus data Sedang Loading',
                    success: 'Hapus Data Berhasil 👌',
                    error: 'Hapus Data Gagal 🤯'
                }
            );
            refModal?.current?.close();
            window.location.reload();

        } catch (err: any) {
            console.log(err);
            refModal?.current?.close();
        }
    }

    const onModalDelete = (row: any) => {

        refModal?.current?.options({
            cardclassName: "bg-white w-[30rem]",
            title: `Hapus Data Wali ${row?.fullname}`,
            content: (
                <>
                    <div className={"flex items-center space-x-3 w-full"}>
                        <FaTriangleExclamation className="fill-orange-400" size={30} />
                        <h1 className="text-gray-500"> Apa ada yakin ingin Ingin Menghapus Sessi Ini ?</h1>
                    </div>
                    <div className="flex justify-end w-full space-x-3 items-center mt-4">
                        <button
                            onClick={() => { refModal.current?.close() }}
                            className="cursor-pointer text-white p-2 bg-red-500 hover:bg-red-600 rounded-md">
                            Batalkan
                        </button>
                        <button onClick={() => onDelete(row?.schedule_id)} className="cursor-pointer p-2 bg-green-500 hover:bg-green-600 text-white rounded-md">
                            Hapus
                        </button>
                    </div>
                </>
            )
        });
        refModal?.current?.open();
    }

    return (
        <div className="grid grid-cols-2 gap-3">
            {
                isLoading && (
                    <>
                        {
                            Array.from({ length: 2 }).map((__, idx) => (
                                <div key={idx}>
                                    <Skeleton height={"13rem"} width={"100%"} />
                                </div>
                            ))
                        }
                    </>
                )
            }
            {
                data?.data?.map((val: any, idx: number) => (
                    <Card className="w-full bg-sky-50 h-[25rem] overflow-y-auto min-h-[15rem]" key={idx}>
                        <div className="px-3 py-3">
                            <div className="flex items-center gap-2">
                                {
                                    val?.session_name?.toLowerCase() === "pagi" ? (
                                        <BsSunFill className="fill-orange-400" size={25} />
                                    )
                                    :
                                    (
                                        <BsMoonFill className="fill-sky-500" size={25} />
                                    )
                                }
                                <h1 className="text-xl font-bold">Sesi {val?.name}</h1>
                            </div>

                            <ul className="list-none mt-3">
                                {
                                    val?.schedules?.map((data: any, idx: number) => (
                                        <li key={idx} className="px-3 py-4 shadow flex justify-between items-center bg-white min-h-[5rem] rounded-lg w-full mb-2">
                                            <div>
                                                <h1 className="font-semibold text-md">{data?.day?.name} {" "} {val?.session_name} </h1>
                                                <span className="block mt-1 text-gray-500">{data?.start_time} - {data?.end_time} WIB</span>
                                            </div>

                                            <div className="flex space-x-3 items-center">
                                                <div className="flex px-3 py-1 text-sky-400 justify-center items-center rounded-full bg-sky-100">
                                                    {data?.status}
                                                </div>
                                                <button 
                                                    onClick={() => onModalDelete(data)} 
                                                    className="px-2 py-2 cursor-pointer hover:bg-red-600 rounded-lg bg-red-500">
                                                    <BsTrash2 size={18} className="fill-white" />
                                                </button>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </Card>
                ))
            }
        </div>
    )
};

export default SesiSchedule;