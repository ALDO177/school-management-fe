import { useSwrAxios } from "@/hooks/useSwrAxios";
import InputText from "@components/inputext";
import { Table } from "@components/table";
import { DashboardContext } from "@context/dashboard.context";
import React, { useContext, useState } from "react";
import { BsPencil, BsPlus, BsTrash2 } from "react-icons/bs";
import FormWaliKelas from "./form.guru.walikelas";
import { FaTriangleExclamation } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-toastify";
import { Pagination } from "@components/pagination";

const GuruWaliKelas: React.FC = () => {

    const { refModal } = useContext(DashboardContext);

    const [query, setQuery] = useState({
        page: "1",
        limit: "10",
        search: ""
    });

    const { data, isLoading, mutate } = useSwrAxios('/api/protected/user-management/home-room-teacher/get-by-students', query);

    const onModalOpen = async () => {
        refModal?.current?.options({
            cardclassName: "w-[35rem] max-md:w-full bg-white",
            title: `Tambah Wali Kelas`,
            content: <FormWaliKelas toogleClose={refModal?.current.close} mutate={mutate} />
        });
        refModal?.current?.open();
    };

    const onModalEdit = async (row: any) => {

        refModal?.current?.options({
            cardclassName: "w-[35rem] max-md:w-full bg-white",
            title: `Tambah Wali Kelas`,
            content: (
                <FormWaliKelas
                    isEdit
                    data={row}
                    toogleClose={refModal?.current.close}
                    mutate={mutate}
                />
            )
        });
        refModal?.current?.open();
    };

    const onDelete = async (id: number) => {
        refModal?.current?.close();
        const handlePromise = axios.delete('/api/protected/user-management/home-room-teacher', { data: [{ id }], timeout: 300000 }).then((res) => res.data);
        await toast.promise(
            handlePromise,
            {
                pending: 'Hapus data Sedang Loading',
                success: 'Hapus Data Berhasil 👌',
                error: 'Hapus Data Gagal 🤯'
            }
        );
        mutate();
    };

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
    };

    const onPageChange = (page: number) => {
        setQuery((prev) => ({ ...prev, page: String(page)}))
    }

    return (
        <React.Fragment>
            <div className="flex justify-between items-center w-full">
                <h1 className="text-lg text-gray-700 my-5 font-semibold">Data Guru Wali Kelas</h1>
                <div className="flex items-center space-x-3">
                    <InputText
                        sizeMode="sm"
                        placeholder="Cari Nip Atau Nama"
                        className="w-full"
                        onChange={(ev) => setQuery((prev) => ({ ...prev, search: ev.target.value }))} />
                    <button
                        onClick={onModalOpen}
                        className="cursor-pointer w-full py-3 flex items-center justify-center text-white space-x-2 px-3 rounded-lg bg-green-500">
                        <span><BsPlus size={22} className="fill-white" /></span>
                        <span className="font-semibold">Tambah Wali Kelas</span>
                    </button>
                </div>
            </div>

            <Table
                columns={[
                    {
                        key: "fullname",
                        label: "Name",
                    },
                    {
                        key: "nip",
                        label: "Nip"
                    },
                    {
                        key: "classRoom.class_name",
                        label: "Kelas"
                    },
                    {
                        key: "total_student",
                        label: "Jumlah Siswa",
                        render(value, row) {
                            return (
                                <div> {value} Siswa </div>
                            )
                        }
                    },
                    {
                        key: "subjects",
                        label: "Mata Pelajaran"
                    },
                    {
                        key: "",
                        label: "Aksi",
                        render(value, row) {
                            return (
                                <div className="flex space-x-3 items-center">
                                    <button onClick={() => onModalDelete(row)} className="cursor-pointer p-2 bg-red-500 hover:bg-red-600 rounded-md">
                                        <BsTrash2 size={18} className="fill-white" />
                                    </button>
                                    <button onClick={() => onModalEdit(row)} className="cursor-pointer p-2 bg-blue-500 hover:bg-blue-600 rounded-md">
                                        <BsPencil size={18} className="fill-white" />
                                    </button>
                                </div>
                            )
                        },
                    }
                ]}
                data={data?.data?.items ?? []}
                showGridLine={true}
                isLoading={isLoading} />

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

export default GuruWaliKelas