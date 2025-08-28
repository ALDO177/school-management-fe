'use client'

import { useSwrAxios } from "@/hooks/useSwrAxios";
import Card from "@components/card";
import { toTitleCase } from "@lib/slugh";
import React, { useContext, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { FaTriangleExclamation, FaUsers } from "react-icons/fa6";
import { DashboardContext } from "@context/dashboard.context";
import Skeleton from "react-loading-skeleton";
import FormGuruWali from "./form.guru.wali";
import { Pagination } from "@components/pagination";
import axios from "axios";
import { toast } from "react-toastify";
import InputText from "@components/inputext";

const GuruWali: React.FC = () => {

    const { refModal } = useContext(DashboardContext);

    const [query, setQuery] = useState({
        page: "1",
        limit: "10",
        search: ""
    });

    const { data, isLoading, mutate } = useSwrAxios('/api/protected/user-management/home-room-assigment', query);

    const onModalOpen = () => {

        refModal?.current?.options({
            cardclassName: "w-[35rem] max-md:w-full bg-white",
            title: "Tambah Guru Kelas",
            content: (
                <FormGuruWali
                    toogleClose={refModal?.current.close}
                    mutate={mutate} />
            )
        });
        refModal?.current?.open();
    };

    const onModalEdit = (data: any) => {
        refModal?.current?.options({
            cardclassName: "w-[35rem] max-md:w-full bg-white",
            title: "Edit Guru Kelas",
            content: (
                <FormGuruWali
                    data={data}
                    isEdit
                    toogleClose={refModal?.current.close}
                    mutate={mutate} />
            )
        });
        refModal?.current?.open();
    };

    const onDelete = async (id: number) => {

        refModal?.current?.close();

        const handleDelete = axios.delete('/api/protected/user-management/home-room-assigment', {
            data: [{ id }],
            timeout: 300000
        }).then((res) => res.data)

        await toast.promise(
            handleDelete,
            {
                pending: 'Hapus data Sedang Loading',
                success: 'Hapus Data Berhasil 👌',
                error: 'Hapus Data Gagal 🤯'
            }
        );

        mutate();
    }

    const onModalDelete = (row: any) => {
        refModal?.current?.options({
            cardclassName: "bg-white w-[30rem]",
            title: `Hapus Data Wali ${row?.fullname}`,
            content: (
                <>
                    <div className={"flex items-center space-x-3 w-full"}>
                        <FaTriangleExclamation className="fill-orange-400" size={30} />
                        <h1 className="text-gray-500"> Apa ada yakin ingin Ingin Menghapus Wali ini ?</h1>
                    </div>

                    <div className="flex justify-end w-full space-x-3 items-center mt-4">
                        <button
                            onClick={() => { refModal.current?.close() }}
                            className="cursor-pointer text-white p-2 bg-red-500 hover:bg-red-600 rounded-md">
                            Batalkan
                        </button>
                        <button onClick={() => onDelete(row?.id)} className="cursor-pointer p-2 bg-green-500 hover:bg-green-600 text-white rounded-md">
                            Hapus
                        </button>
                    </div>
                </>
            )
        });
        refModal?.current?.open();
    }

    const onPageChange = (page: number) => {
        setQuery((prev) => ({ ...prev, page: String(page) }))
    };

    return (
        <React.Fragment>
            <div className="flex justify-between items-center w-full">
                <h1 className="text-lg text-gray-700 my-5 font-semibold">Data Guru Wali</h1>

                <div className="flex items-center space-x-3">
                    <InputText
                        sizeMode="sm"
                        placeholder="Cari Nip Atau Nama"
                        className="w-full"
                        onChange={(ev) => setQuery((prev) => ({ ...prev, search: ev.target.value }))} />
                    <button
                        onClick={onModalOpen}
                        className="cursor-pointer w-full py-3 flex items-center justify-center text-white space-x-2 px-3 py-2 rounded-lg bg-green-500">
                        <span><BsPlus size={22} className="fill-white" /></span>
                        <span className="font-semibold">Tambah Guru Kelas</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
                {
                    isLoading && (
                        <>
                            {
                                Array.from({ length: 6 }).map((__, idx) => (
                                    <div key={idx}>
                                        <Skeleton height={"13rem"} width={"100%"} />
                                    </div>
                                ))
                            }
                        </>
                    )
                }
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
                                    <li>Siswa Bimbingan : {val?.total_student}</li>
                                    <li>Pengalaman : {val?.experience} Tahun</li>
                                </ul>

                                <div className="grid gap-2 grid-cols-2 my-3">
                                    <button
                                        onClick={() => onModalEdit(val)}
                                        className="w-full p-2 rounded-md text-center cursor-pointer bg-green-500 hover:bg-green-600 text-white">
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => onModalDelete(val)}
                                        className="w-full p-2 rounded-md text-center cursor-pointer bg-red-500 hover:bg-red-600 text-white">
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        </Card>
                    ))
                }
            </div>
            <div className="flex justify-between items-center mt-4 border-t border-t-gray-200 py-2">
                <div className="text-gray-500 text-md">Show Total {data?.data?.total_count}</div>
                <Pagination
                    key={"pagination-teachers"}
                    currentPage={Number(query.page)}
                    totalPages={data?.data?.total_pages}
                    onPageChange={onPageChange}
                    maxPageButtons={4}
                />
            </div>
        </React.Fragment>
    )
};

export default GuruWali;