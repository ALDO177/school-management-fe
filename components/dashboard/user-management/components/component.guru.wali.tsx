'use client'

import { useSwrAxios } from "@/hooks/useSwrAxios";
import Card from "@components/card";
import { toTitleCase } from "@lib/slugh";
import React, { useState } from "react";
import { BsPlus } from "react-icons/bs";
import { FaUsers } from "react-icons/fa6";

const GuruWali: React.FC = () => {

    const [query, setQuery] = useState({
        page: "1",
        limit: "20",
        search: ""
    });

    const { data, isLoading, mutate } = useSwrAxios('/api/protected/user-management/home-room-teacher/get-by-students', query);

    return (
        <React.Fragment>
            <div className="flex justify-between items-center w-full">
                <h1 className="text-lg text-gray-700 my-5 font-semibold">Data Guru Wali</h1>
                <button
                    className="cursor-pointer flex items-center justify-center text-white space-x-2 px-3 py-2 rounded-lg bg-green-500">
                    <span><BsPlus size={22} className="fill-white" /></span>
                    <span className="font-semibold">Tambah Guru Kelas</span>
                </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {
                    data?.data?.items?.map((val: any, idx: number) => (
                        <Card key={idx} className="bg-gray-50 shadow min-h-[12rem]">
                            <div className="px-3 py-3">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 flex justify-center bg-green-500/50 items-center rounded-full">
                                        <FaUsers size={22} className="fill-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-lg font-semibold text-gray-600">
                                            {toTitleCase(val?.fullname)}
                                        </h1>
                                        <span className="text-sm text-gray-500">NIP: {val?.nip}</span>
                                    </div>
                                </div>
                                <ul className="my-2 list-none space-y-2">
                                    <li>Mata Pelajaran : {val?.subjects}</li>
                                    <li>Siswa Bimbingan : {val?.total_students}</li>
                                    <li>Pengalaman : {val?.experience} Tahun</li>
                                </ul>

                                <div className="grid gap-2 grid-cols-2 my-3">
                                    <button className="w-full p-2 rounded-md text-center bg-green-500 text-white">
                                        Edit
                                    </button>
                                    <button className="w-full p-2 rounded-md text-center bg-red-500 text-white">
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        </Card>
                    ))
                }
            </div>
        </React.Fragment>
    )
};

export default GuruWali;