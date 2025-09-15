'use client'

import { useSwrAxios } from "@/hooks/useSwrAxios";
import Badge from "@components/badge";
import Card from "@components/card";
import HiddenPasswordLabel from "@components/hiddepassword";
import InputText from "@components/inputext";
import { Pagination } from "@components/pagination";
import { Table } from "@components/table";
import { DashboardContext } from "@context/dashboard.context";
import { UserRole } from "@types_local/common";
import React, { useContext, useState } from "react";
import { FaFileExcel, FaGear, FaPlus, FaTriangleExclamation } from "react-icons/fa6";
import { onOpenModalExport } from "./onHandle/onExportExcel";
import ButtonDropdown from "@components/splite";
import { forwardDeleteApiClient, forwardPostApiClient } from "@forwards/client/forward";
import { toast } from "react-toastify";
import FormEdit from "./components/form.edit";

const Auth: React.FC = () => {

    const [query, setQuery] = useState({
        page: "1",
        limit: "6",
        search: ""
    });

    const { data, isLoading, mutate } = useSwrAxios('/api/protected/user-management', query);
    const { refModal } = useContext(DashboardContext);
    const [errorApi, setErrorApi] = useState<any>();

    const onPageChange = (page: number) => {
        setQuery((prev) => ({ ...prev, page: String(page) }))
    };

    const roleTmemplate = (value: UserRole) => {
        if (value === UserRole.STUDENT) {
            return (
                <Badge label="Siswa" variant="success" />
            )
        } else if (value === UserRole.HOME_ROOM_ASSIGMENT) {
            return (
                <Badge label=" Wali Guru" variant="primary" />
            )
        } else if (value === UserRole.HOME_ROOM_TEACHER) {
            return (
                <Badge
                    label="Wali Kelas"
                    variant="danger" />
            )
        }
        return (
            <Badge
                label="Admin"
                variant="secondary" />
        )
    }

    const statusTemplate = (value: boolean) => {
        if (!value) {
            return (
                <Badge
                    label="Disabled"
                    variant="danger" />
            )
        }
        return (
            <Badge
                label="Enabled"
                variant="success" />
        )
    };

    const onHandleEdit = async(row: any) => {
       
        refModal?.current?.options({
            cardclassName: "bg-white w-[30rem]",
            title: "Reset Account",
            content: (
                <FormEdit 
                    data={row} 
                    onCloseModal={refModal?.current?.close} 
                    mutate={mutate}/>
            )
        });

        refModal?.current?.open();
    }

    const onHandleStatus = async (data: { user_id: number, status: boolean }) => {
        try {

            const promisesData = forwardPostApiClient('protected/user-management/status', data);
            
            await toast.promise(promisesData, {
                pending: 'Prosess Sedang Berlangsung',
                success: 'Proses Berhasil',
                error: 'Proses Gagal'

            }, { position: "bottom-right", autoClose: 2500 });

            await mutate();

        } catch (err) {
            console.log(err);
            setErrorApi(err);
        }
    };

    const onHandleDelete = async (id: number) => {

        try {
            refModal?.current?.close();
            
            const promisesData = forwardDeleteApiClient(`protected/user-management/${id}`, data);
            await toast.promise(promisesData, {

                pending: 'Prosess Sedang Berlangsung',
                success: 'Hapus Akun Berhasil',
                error: 'Proses Hapus Akun Gagal'

            }, { position: "bottom-right", autoClose: 2500 });

            await mutate();

        } catch (err) {
            console.log(err);
            setErrorApi(err);
            refModal?.current?.close();
        }
    }

    const onOpenDialogDelete = (row: any) => {
        refModal?.current?.options({
            cardclassName: "bg-white w-[30rem]",
            title: "Hapus Akun User",
            content: (
                <div className="flex flex-col space-y-3">
                    <div className={"flex items-center space-x-3 w-full"}>
                        <FaTriangleExclamation className="fill-orange-400" size={30} />
                        <h1 className="text-gray-500">
                            Apa ada yakin ingin Menghapus User <span className="font-semibold">"{row?.name}"</span>
                        </h1>
                    </div>

                    <div className="flex items-center gap-3 justify-end mt-2">
                        <button
                            onClick={() => refModal.current?.close()}
                            className="text-center px-2 rounded-md py-2 text-white bg-red-500 hover:bg-red-600 cursor-pointer">Batalkan</button>
                        <button
                            onClick={() => onHandleDelete(row?.id)}
                            disabled={row?.role === "admin"}
                            className="disabled:bg-green-500/40 disabled:cursor-not-allowed text-center px-2 rounded-md py-2 text-white bg-green-500 hover:bg-green-600 cursor-pointer">Hapus</button>
                    </div>
                </div>
            )
        });

        refModal?.current?.open();
    }


    return (
        <React.Fragment>
            <div className="grid grid-cols-1 gap-4">
                <div>
                    <h1 className="text-3xl font-semibold my-3">Authentication</h1>
                    <p className="text-gray-600 text-lg">User Auth Management Account</p>
                </div>
                <Card className="bg-white w-full py-4">
                    <div className="flex justify-between items-center w-full mb-3">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={async () => await onOpenModalExport({ refModal })}
                                className="cursor-pointer hover:bg-green-600 px-2 py-2 text-white bg-green-500 rounded-lg">
                                <FaFileExcel size={18} className="text-white" />
                            </button>
                            <button
                                className="cursor-pointer hover:bg-green-600 px-2 py-2 text-white bg-green-500 rounded-lg">
                                <FaPlus size={15} className="text-white" />
                            </button>
                        </div>
                        <div className="flex items-center space-x-3">
                            <InputText
                                sizeMode="sm"
                                placeholder="Cari Nip Atau Nama"
                                className="w-full"
                                onChange={(ev) => setQuery((prev) => ({ ...prev, search: ev.target.value }))} />
                        </div>
                    </div>
                    <Table
                        showGridLine
                        isLoading={isLoading}
                        data={data?.data?.items ?? []}
                        columns={[
                            {
                                key: "id",
                                label: "ID"
                            },
                            {
                                key: "name",
                                label: "Name"
                            },
                            {
                                key: "username",
                                label: 'Username'
                            },
                            {
                                key: "password_raw",
                                label: "Password",
                                render: (value, row) => {

                                    if (!value) return <span className="block">Secret</span>
                                    return (
                                        <HiddenPasswordLabel password={value} />
                                    )
                                }
                            },
                            {
                                key: "status",
                                label: "Status",
                                render: statusTemplate
                            },
                            {
                                key: "role",
                                label: "Role",
                                render: roleTmemplate
                            },
                            {
                                key: "last_login",
                                label: "Terakhir Online",
                                render: (value) => {
                                    if (!value)
                                        return <span className="block text-center text-lg">-</span>;

                                    return <span className="block">{value}</span>
                                }
                            },
                            {
                                key: "",
                                label: "Aksi",
                                render(value, row) {
                                    return (
                                        <div className="flex space-x-3 items-center">
                                            <ButtonDropdown
                                                label={<FaGear />}
                                                options={[
                                                    { label: "Edit", onClick: () => onHandleEdit(row) },
                                                    {
                                                        label: `${row?.status ? "Disable User" : "Enable User"}`,
                                                        onClick: () => onHandleStatus({ user_id: row?.id, status: !row?.status })
                                                    },
                                                    {
                                                        label: "Hapus",
                                                        onClick: () => {
                                                            onOpenDialogDelete(row);
                                                        }
                                                    }
                                                ]}
                                            />
                                        </div>
                                    )
                                },
                            }
                        ]}
                    />
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
                </Card>
            </div>
        </React.Fragment>
    )
};

export default Auth;