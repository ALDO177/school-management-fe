'use client'

import { useSwrAxios } from "@/hooks/useSwrAxios";
import Card from "@components/card";
import React, { useState } from "react";
import { FaClock, FaUsers } from "react-icons/fa6";
import Skeleton from "react-loading-skeleton";

const DashboardComponent: React.FC = () => {

    const date = new Date();
    const today = date.getDay() + 1

    const [query, __] = useState({
        dayId: today
    })

    const { data, isLoading } = useSwrAxios("/api/protected/stats");
    const { data: dataToday, isLoading: isLoadingToday } = useSwrAxios('/api/protected/today-schedule', query);

    return (
        <div className="grid grid-cols-1 gap-5">
            <div>
                <h1 className="text-3xl font-semibold my-3">Dashboad</h1>
                <p className="text-gray-600 text-lg">Selamat datang di Sistem Manajemen Pendampingan Murid</p>
            </div>
            <div className="grid grid-cols-4 gap-3">
                {
                    isLoading && (
                        <>
                            {
                                Array.from({ length: 4 }).map((__, idx) => (
                                    <React.Fragment key={idx}>
                                        <Skeleton width={"100%"} height={"100px"} />
                                    </React.Fragment>
                                ))
                            }
                        </>
                    )
                }
                {
                    !isLoading && (
                        <>
                            <Card className="w-full transition-all transform hover:-translate-y-1 duration-200 flex flex-col justify-center h-25 bg-white border-l-4 border-l-blue-500">
                                <div className="flex space-x-5 items-center">
                                    <div className="w-11 h-11 bg-blue-200 rounded-full flex justify-center items-center">
                                        <FaUsers size={30} className="fill-blue-500" />
                                    </div>
                                    <div>
                                        <span className="block text-gray-600 font-semibold">Total Siswa</span>
                                        <h1 className="text-2xl font-bold">{data?.data?.total_student}</h1>
                                    </div>
                                </div>
                            </Card>
                            <Card className="w-full transition-all transform hover:-translate-y-1 duration-200 flex flex-col justify-center h-25 bg-white border-l-4 border-l-green-500">
                                <div className="flex space-x-5 items-center">
                                    <div className="w-11 h-11 bg-green-200 rounded-full flex justify-center items-center">
                                        <FaUsers size={30} className="fill-green-500" />
                                    </div>
                                    <div>
                                        <span className="block text-gray-600 font-semibold">Total Wali</span>
                                        <h1 className="text-2xl font-bold">{data?.data?.total_wali}</h1>
                                    </div>
                                </div>
                            </Card>
                            <Card className="w-full transition-all transform hover:-translate-y-1 duration-200 flex flex-col justify-center h-25 bg-white border-l-4 border-l-orange-500">
                                <div className="flex space-x-5 items-center">
                                    <div className="w-11 h-11 bg-orange-200 rounded-full flex justify-center items-center">
                                        <FaUsers size={30} className="fill-orange-500" />
                                    </div>
                                    <div>
                                        <span className="block text-gray-600 font-semibold">Guru Bk</span>
                                        <h1 className="text-2xl font-bold">{data?.data?.total_guidence}</h1>
                                    </div>
                                </div>
                            </Card>
                            <Card className="w-full transition-all transform hover:-translate-y-1 duration-200 flex flex-col justify-center h-25 bg-white border-l-4 border-l-purple-500">
                                <div className="flex space-x-5 items-center">
                                    <div className="w-11 h-11 bg-purple-200 rounded-full flex justify-center items-center">
                                        <FaUsers size={30} className="fill-purple-500" />
                                    </div>
                                    <div>
                                        <span className="block text-gray-600 font-semibold">Sesi Minggu Ini</span>
                                        <h1 className="text-2xl font-bold">{data?.data?.total_sesi_schedule}</h1>
                                    </div>
                                </div>
                            </Card>
                        </>
                    )
                }
            </div>

            <div className="grid grid-cols-2 gap-3">
                <Card className="w-full min-h-60 bg-white">
                    <div className="py-5 px-4">
                        <h1 className="text-xl font-semibold text-gray-600 mb-2">Jadwal Hari ini</h1>
                        {
                            dataToday?.data?.map((sch: any, idx: number) => (
                                <div key={idx} className="w-full rounded-lg px-3 pt-2 bg-blue-50 min-h-17 mb-2">
                                    <div className="flex space-x-3 items-center">
                                        <FaClock size={22} className="fill-blue-500" />
                                        <div>
                                            <span className="block font-semibold">{sch?.activity?.name} {sch?.session?.name}</span>
                                            <span>{sch?.start_time} - { sch?.end_time } | Kelas X-XII</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </Card>
                <Card className="w-full min-h-60 bg-white">
                    <div className="py-5 px-4">
                        <h1 className="text-xl font-semibold text-gray-600 mb-2">Aktifitas Terbaru</h1>
                        <div className="flex items-center space-x-4">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <div className="pt-2">
                                <span className="block">Data siswa baru ditambahkan</span>
                                <span className="text-xs text-gray-600">2 Jam Lalu</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                            <div className="pt-2">
                                <span className="block">Laporan koordinasi diselesaikan</span>
                                <span className="text-xs text-gray-600">4 Jam Lalu</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="w-2 h-2 rounded-full bg-orange-500" />
                            <div className="pt-2">
                                <span className="block">Jadwal pendampingan diperbarui</span>
                                <span className="text-xs text-gray-600">1 Hari Lalu</span>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
};

export default DashboardComponent;