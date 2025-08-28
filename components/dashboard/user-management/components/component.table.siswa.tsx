'use client'

import { Pagination } from "@components/pagination";
import { Table } from "@components/table";
import React, { useContext, useState } from "react";
import { BsPencil, BsPlus, BsTrash2 } from "react-icons/bs";
import { DashboardContext } from "../../../../context/dashboard.context";
import FormSiswa from "./form.add.siswa";
import { useSwrAxios } from "@/hooks/useSwrAxios";
import InputText from "@components/inputext";
import { toTitleCase } from "@lib/slugh";
import { FaTriangleExclamation } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-toastify";

const TableSiswa: React.FC = () => {

    const { refModal } = useContext(DashboardContext);
    const [query, setQuery] = useState({
        page: "1",
        limit: "5",
        search: ""
    });

    const { data, isLoading, mutate } = useSwrAxios('/api/protected/user-management/student', query);

    const onModalOpen = () => {
        refModal?.current?.options({
            cardclassName: "w-[35rem] max-md:w-full bg-white",
            title: "Tambah Data Siswa",
            content: <FormSiswa mutate={mutate} toogleClose={refModal.current.close} />
        });
        refModal?.current?.open();
    };

    const onModaEdit = async (row: any) => {
         refModal?.current?.options({
            cardclassName: "w-[35rem] max-md:w-full bg-white",
            title: `Edit Data Siswa ${row?.nama}`,
            content:(
                <FormSiswa 
                    mutate={mutate} 
                    isEdit
                    data={row}
                    toogleClose={refModal.current.close} />
            )
        });
        refModal?.current?.open();
    }

    const StatusStudent: React.FC<{ status: string }> = ({ status }) => {
        switch (status.toLowerCase()) {
            case "aktif":
                return (
                    <div className="text-center font-semibold text-white px-2 py-1 max-w-20 rounded-full bg-green-400">
                        {toTitleCase(status)}
                    </div>
                )

            case "tidak aktif":
                return (
                    <div className="text-center font-semibold text-white px-2 py-1 max-w-max rounded-full bg-red-500">
                        { toTitleCase(status) }
                    </div>
                )

            case "perlu perhatian":
                return (
                    <div className="text-center font-semibold text-white px-2 py-1 max-w-max rounded-full bg-orange-500">
                        { toTitleCase(status) }
                    </div>
                )

            default:
                return (
                    <div className="px-3 p-2 rounded-lg bg-red-500/30">
                        { toTitleCase(status) }
                    </div>
                )
        }
    }

    const onPageChange = async (page: number) => {
        setQuery((prev) => ({ ...prev, page: String(page) }));
    };

    const onDelete = async (id: number) => {

        refModal?.current?.close();
        const handleDelete = axios.delete("/api/protected/user-management/student", { timeout: 300000, data: [{ id }] }).then((res) => res.data);
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

    const onDeleteModal = async (row: any) => {
        refModal?.current?.options({
            cardclassName: "bg-white w-[30rem]",
            title: `Hapus Data Siswa ${row?.student_name}`,
            content: (
                <>
                    <div className={"flex items-center space-x-3 w-full"}>
                        <FaTriangleExclamation className="fill-orange-400" size={30} />
                        <h1 className="text-gray-500"> Apa ada yakin ingin Ingin Menghapus Siswa ini ?</h1>
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
    };

    return (
        <React.Fragment>
            <div className="flex justify-between items-center w-full">
                <h1 className="text-lg text-gray-700 my-5 font-semibold">Data Siswa</h1>
                <div className="flex items-center space-x-3">

                    <InputText
                        sizeMode="sm"
                        placeholder="Cari Nama atau Nisn"
                        className="w-full"
                        onChange={(ev) => setQuery((prev) => ({ ...prev, search: ev.target.value }))} />
                    <button
                        onClick={onModalOpen}
                        className="cursor-pointer flex w-full items-center justify-center text-white space-x-2 px-3 py-3 rounded-lg bg-blue-500">
                        <span><BsPlus size={22} className="fill-white" /></span>
                        <span className="font-semibold">Tambah Siswa</span>
                    </button>
                </div>
            </div>

            <Table

                columns={[
                    { key: "nama", label: "Name" },
                    { key: "nisn", label: "Nisn" },
                    { key: "classRoom.class_name", label: "Kelas" },
                    { key: "home_room_teacher.fullname", label: "Guru Wali" },
                    {
                        key: "status", label: "Status", render(value, row) {
                            return <StatusStudent status={value} />
                        },
                    },
                    {
                        key: "",
                        label: "Aksi",
                        render(value, row) {
                            return (
                                <div className="flex space-x-3 items-center">
                                    <button onClick={() => onDeleteModal(row)} className="cursor-pointer p-2 bg-red-500 hover:bg-red-600 rounded-md">
                                        <BsTrash2 size={18} className="fill-white" />
                                    </button>

                                    <button onClick={() => onModaEdit(row)} className="cursor-pointer p-2 bg-blue-500 hover:bg-blue-600 rounded-md">
                                        <BsPencil size={18} className="fill-white" />
                                    </button>
                                </div>
                            )
                        },
                    }
                ]}
                isLoading={isLoading}
                data={data?.items ?? []}
                showGridLine={true}
            />

            <div className="flex justify-between items-center mt-4 border-t border-t-gray-200 py-2">
                <div className="text-gray-500 text-md">Show Total {data?.data?.total_count}</div>
                <Pagination
                    currentPage={Number(query.page)}
                    totalPages={data?.total_pages}
                    onPageChange={onPageChange}
                    maxPageButtons={4}
                />
            </div>
        </React.Fragment>
    )
};

export default TableSiswa;