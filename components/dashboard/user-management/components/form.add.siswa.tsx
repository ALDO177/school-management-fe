'use client'

import InputText from "@components/inputext"
import SelectOption from "@components/select";
import React, { useActionState, useCallback, useEffect, useState } from "react";;
import { toast } from "react-toastify";
import { actionCreateStudent } from "@directive/servers/user-management/student";
import axios from "axios";

interface PropFormStudent{
    toogleClose : () => void;
    mutate : () => void;    
    isEdit?: boolean;
    data?: any;
}

const FormStudent: React.FC<PropFormStudent> = ({ toogleClose, mutate, isEdit = false, data }) => {

    const [selectClass, setSelectedClass] = useState();
    const [classes, setClasses] = useState<Array<any>>([]);
    const [isLoadingClass, setIsLoadingClass] = useState<boolean>(false);

    const [selecteStatus, setSelectedStatus] = useState();
    const [status, setStatus] = useState<Array<any>>([]);
    const [isLoadingStatus, setIsLoadiStatus] = useState<boolean>(false);

    const cancelSubmited = () => {
        toogleClose();
        toast("Tambah Siswa di batalkan!", {
            type: "error",
            autoClose: 3000
        })
    };

    const [state, formAction, pending] = useActionState<any, FormData>(actionCreateStudent, {
        nama: data?.student_name ?? "",
        nisn: data?.nisn ?? "",
        no_class: data?.no_class ?? "",
        address: data?.address ?? "",
        phone_number: data?.phone_number ?? "",
        status: data?.status ?? ""
    });

    const getDataClass = useCallback(() => {
        axios.get('/api/master/classes', { timeout: 300000 }).then((res) => {
            setClasses(res.data?.data);
            setIsLoadingClass(false);
        });
    }, []);

    const getDataStatus = useCallback(() => {
        axios.get('/api/master/status', { params: { select: "true" }, timeout: 300000 }).then((res) => {
            setStatus(res.data?.data);
            setIsLoadiStatus(false)
        })
    }, [])

    useEffect(() => {
        setIsLoadingClass(true);
        getDataClass();
    }, []);

    useEffect(() => {
        setIsLoadiStatus(true);
        getDataStatus();
    }, [])

    useEffect(() => {

        if (state?.success === true) {
            toogleClose();
            mutate();
            toast(isEdit ? "Update Siswa Berhasil!" : "Tambah Siswa Berhasil!", {
                type: "success",
                autoClose: 3000,
                theme: "colored"
            })
        }

        if(state?.error === true){
            toogleClose();
            toast.error("Terjadi Kesalahan Saat Create Data...", { theme: "colored", autoClose: 3000 })
        }

        if(isEdit){
            setSelectedClass(classes?.find((prev) => prev.value == state?.no_class));
            setSelectedStatus(status?.find((prev) => prev.value == state?.status));
        }

    }, [state, isEdit, classes]);

    
    return (
        <React.Fragment>
            <form action={formAction}>
                <div className="grid grid-cols-1 gap-4">
                    {
                        data?.id && (
                             <InputText 
                                type="hidden" 
                                name="id" 
                                defaultValue={data?.id}/>
                        )
                    }
                    <div>
                        <span className="block mb-2">Nama Lengkap</span>
                        <InputText
                            sizeMode="md"
                            required
                            defaultValue={state.nama}
                            name="nama"
                            className="w-full"
                            placeholder="Nama Siswa" />
                    </div>
                    <div>
                        <span className="block mb-2">Nisn</span>
                        <InputText
                            sizeMode="md"
                            defaultValue={state.nisn}
                            required
                            name="nisn"
                            className="w-full"
                            placeholder="Nama Siswa" />
                    </div>
                    <div>
                        <span className="block mb-2">Kelas</span>
                        <SelectOption
                            value={selectClass}
                            required
                            name="no_class"
                            onChange={(val: any) => setSelectedClass(val)}
                            isLoading={isLoadingClass}
                            placeholder={'Pilih Kelas'}
                            options={classes} />
                    </div>
                    <div>
                        <span className="block mb-2">Alamat</span>
                        <textarea
                            name="address"
                            defaultValue={state.address}
                            className="w-full px-4 py-3 focus:outline-2 focus:outline-blue-500/30 border shadow border-gray-300 rounded-lg"
                            rows={4}
                        />
                    </div>
                    <div>
                        <span className="block mb-2">No Hp Orang Tua</span>
                        <InputText
                            name="phone_number"
                            sizeMode="md"
                            defaultValue={state.phone_number}
                            className="w-full"
                            placeholder="Nomor Hp Orang Tua" />
                    </div>
                    <div>
                        <span className="block mb-2">Pilih Status</span>
                        <SelectOption
                            name="status"
                            isLoading={isLoadingStatus}
                            value={selecteStatus}
                            placeholder={"Pilih Status Siswa"}
                            onChange={(val: any) => setSelectedStatus(val)}
                            options={status} />
                    </div>

                    <div className="grid grid-cols-2 gap-2 my-3">
                        <button
                            type="submit"
                            disabled={pending}
                            className="cursor-pointer disabled:cursor-not-allowed disabled:bg-blue-500/50 w-full px-2 py-3 text-white font-semibold text-center bg-blue-500 hover:bg-blue-600 rounded-md shadow">
                            Simpan
                        </button>
                        <button
                            onClick={cancelSubmited}
                            className="cursor-pointer w-full px-2 py-3 font-semibold text-center bg-gray-300 hover:bg-gray-400 rounded-md shadow">
                            Batalkan
                        </button>
                    </div>
                </div>
            </form>
        </React.Fragment>
    )
}

export default FormStudent;