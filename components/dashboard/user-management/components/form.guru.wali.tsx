'use client'

import InputText from "@components/inputext";
import { actionHomeRoomAssigment } from "@directive/servers/user-management/guru_wali";
import React, { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

interface PropFormGuruWali {
    toogleClose: () => void;
    mutate: () => void;
    isEdit?: boolean;
    data?: any;
};

const FormGuruWali: React.FC<PropFormGuruWali> = ({ toogleClose, mutate, isEdit, data }) => {

    const [state, formAction, pending] = useActionState(actionHomeRoomAssigment, {
        fullname: data?.fullname ?? "",
        nip: data?.nip ?? "",
        subjects: data?.subjects ?? "",
        experience: data?.experience ?? "",
        email: data?.email ?? ""
    });

    useEffect(() => {
        if (state?.success == true) {

            toogleClose();
            toast.success(`${isEdit ? "Edit" : "Tambah"} Data Wali Berhasil`, {
                autoClose: 3000,
                theme: "colored"
            });
            mutate();
        }

        if (state?.error == true) {
            toogleClose();
            toast.error(`Terjadi Kesalahan saat ${isEdit ? "Edit" : "Tambah"} Data`, {
                autoClose: 3000,
                theme: 'colored'
            })
        }
    }, [state])

    return (
        <React.Fragment>
            <form action={formAction}>
                <div className="grid grid-cols-1 gap-4">
                    {
                        isEdit && data?.id && (
                            <InputText
                                type="hidden"
                                name="id"
                                defaultValue={data?.id} />
                        )
                    }
                    <div>
                        <span className="mb-2 block">Nama Lengkap</span>
                        <InputText
                            sizeMode="md"
                            className="w-full"
                            name="fullname"
                            defaultValue={state?.fullname}
                            required
                            placeholder="Masukan Nama Lengkap" />
                    </div>
                    <div>
                        <span className="mb-2 block">Nip</span>
                        <InputText
                            sizeMode="md"
                            required
                            name="nip"
                            defaultValue={state?.nip}
                            className="w-full"
                            placeholder="Nama Lengkap" />
                    </div>
                    <div>
                        <span className="mb-2 block">Mata Pelajaran</span>
                        <InputText
                            sizeMode="md"
                            required
                            name="subjects"
                            defaultValue={state?.subjects}
                            className="w-full"
                            placeholder="Mata Pelajaran" />
                    </div>

                    <div>
                        <span className="mb-2 block">Pengalaman(Tahun)</span>
                        <InputText
                            sizeMode="md"
                            required
                            type="number"
                            min={0}
                            defaultValue={state?.experience}
                            name="experience"
                            className="w-full"
                            placeholder="Pengalaman" />
                    </div>
                    <div>
                        <span className="mb-2 block">Email</span>
                        <InputText
                            sizeMode="md"
                            required
                            type="email"
                            name="email"
                            defaultValue={state?.email}
                            className="w-full"
                            placeholder="Email" />
                    </div>
                    <div className="grid grid-cols-2 gap-2 my-3">
                        <button
                            disabled={pending}
                            type="submit"
                            className="cursor-pointer disabled:cursor-not-allowed disabled:bg-blue-500/50 w-full px-2 py-3 text-white font-semibold text-center bg-blue-500 hover:bg-blue-600 rounded-md shadow">
                            Simpan
                        </button>
                        <button
                            type="button"
                            onClick={() => toogleClose()}
                            className="cursor-pointer w-full px-2 py-3 font-semibold text-center bg-gray-300 hover:bg-gray-400 rounded-md shadow">
                            Batalkan
                        </button>
                    </div>
                </div>
            </form>
        </React.Fragment>
    )
}

export default FormGuruWali;