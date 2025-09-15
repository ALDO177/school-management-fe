
'use client'

import Card from "@components/card";
import Checkbox from "@components/checkbox";
import { forwardGetApiClient, forwardPostApiClient } from "@forwards/client/forward";
import React, { useCallback, useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { toast } from "react-toastify";

import { useRouter } from 'next/navigation'
import Skeleton from "react-loading-skeleton";

interface Props {
    data: any
}

interface Form {
    permission_ids: Array<number>;
}

const RolePermissions: React.FC<Props> = ({ data }) => {

    const [loading, setLoading] = useState<boolean>(true);
    const [permission, setPermission] = useState<Array<any>>();
    const [errors, setErrors] = useState(null);

    const router = useRouter();

    const permissions_ids = data?.permissions?.map((val: any) => val.id);

    const [form, setForm] = useState<Form>({
        permission_ids: permissions_ids
    })

    const getDataPermissions = useCallback(async () => {
        const result = await forwardGetApiClient('protected/permission');
        setPermission(result?.data);
    }, []);


    useEffect(() => {
        setLoading(true)
        getDataPermissions().then(() => setLoading(false));
    }, []);

    const onChangeForm = (id: number, action: boolean) => {

        setForm((prev) => {
            if (action) {
                return { ...prev, permission_ids: [...prev.permission_ids, id] }
            }
            //removed
            const filterUpdateAfterRemove = prev.permission_ids.filter((num) => num != id);
            return { ...prev, permission_ids: filterUpdateAfterRemove }
        })
    };

    const onChangeSubmited = async () => {
        try {
            const id = data?.id;
            const body = form;
            await forwardPostApiClient(`protected/roles/role-permissions/${id}`, body);
            toast.success("update role permision berhasil...", { autoClose: 2500 })
            window.location.reload()

        } catch (err: any) {
            toast.error("Terjadi kesalahan saat update role permission", { autoClose: 2500, theme: "colored" });
            setErrors(err?.response?.data)
        }
    };

    const headarTemplate = () => {
        return (
            <div className="px-6 py-6">
                <button className="cursor-pointer" onClick={() => router.back()}>
                    <FaChevronLeft size={22} className="fill-slate-500" />
                </button>
                <h1 className="text-2xl text-gray-500 text-center mt-3">Role Permission {data?.roleName}</h1>
            </div>
        )
    }

    return (
        <React.Fragment>
            <div className="grid grid-cols-1">
                <div className="flex justify-center">
                    <Card
                        headerTemplate={headarTemplate}
                        className="bg-white w-[50rem] min-h-[20rem]">

                        <div className="flex justify-center w-full">
                            {
                                loading && (
                                    <>
                                        <div className="grid grid-cols-1 gap-4">
                                            {
                                                Array.from({ length: 5 }).map((__, idx) => (
                                                    <div key={idx}>
                                                        <Skeleton className="bg-red-500" height={"3rem"} width={"100%"} />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </>
                                )
                            }
                            <ul className="flex flex-col gap-4 justify-center px-2 py-2 list-none divide-y-2">
                                {
                                    !loading && permission?.map((data: any, idx) => (
                                        <li key={idx} className="px-4 py-3 hover:bg-gray-100 flex justify-between items-center border border-slate-300 rounded-lg w-[30rem] min-h-[4rem]">
                                            <div className="mr-5">
                                                <h1>{data?.name}</h1>
                                            </div>
                                            <div>
                                                <Checkbox
                                                    label={form.permission_ids?.includes(data?.id) ? "Aktif" : "Tidak Aktif"}
                                                    checked={form.permission_ids?.includes(data?.id)}
                                                    onChange={(chk) => onChangeForm(data?.id, chk)}
                                                />
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="flex justify-center my-4">
                            <button
                                onClick={onChangeSubmited}
                                className="px-3 py-3 bg-sky-500 rounded-lg text-white text-lg">Update Permission</button>
                        </div>
                    </Card>
                </div>
            </div>
        </React.Fragment>
    )
};

export default RolePermissions;