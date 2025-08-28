"use client"

import useGetClass from "@/hooks/useGetClass";
import InputText from "@components/inputext";
import SelectOption from "@components/select";
import { mapSelectOptionToValue } from "@lib/select-options";
import { OptionSelect } from "@types_local/common"
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const options_spesialisasi = [
    {
        label: "Konseling Akademik",
        value: "Konseling Akademik"
    },
    {
        label: "Konseling Karir",
        value: "Konseling Karir"
    },
    {
        label: "Konseling Sosial",
        value: "Konseling Sosial"
    },
    {
        label: "Konseling Pribadi",
        value: "Konseling Pribadi"
    }
];

interface PropFormGuruBK {
    toogleClose: () => void;
    mutate: () => void;
    isEdit?: boolean;
    data?: any;
};

const FormGuruBk: React.FC<PropFormGuruBK> = ({ toogleClose, mutate, isEdit = false, data }) => {

    const [selectedSpesialisasi, setSelectedSpesialisasi] = useState<any>();
    const [selectedClasses, setSelectedClases] = useState<OptionSelect[]>([]);

    const [state, setState] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    const [formState, setFormState] = useState({
        id: isEdit ? data?.id : null,
        fullname: data?.fullname ?? "",
        nip: data?.nip ?? "",
        specialization: data?.specialization ?? "",
        sertification: data?.sertification ?? "",
        no_class_ids: data?.no_class_ids,
        email: data?.email ?? "",
    })

    const { classes, loadingClass } = useGetClass();

    const onChangeFormData = (key: string, value: any) => {
        setFormState((prev) => {
            return {
                ...prev,
                [key]: value
            }
        })
    };

    const onSubmited = async (ev: any) => {

        ev.preventDefault();
        const body = formState;
        
        setLoading(true);

        try {
            if (isEdit) {
                const result = await axios.patch("/api/protected/user-management/guidence-conselor", body);
                setState({ success: true, ...result.data });
                setLoading(false);
                return;
            }

            delete body.id;
            const create = await axios.post("/api/protected/user-management/guidence-conselor", body);
            setState({ success: true, ...create?.data });
            setLoading(false)

        } catch (err: any) {
            console.log(err);
            setLoading(false);
            setState({ error: true, dataErr : { ...err?.response?.data} })
        }
    }

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

        if (state?.error === true) {
            toogleClose();
            toast.error("Terjadi Kesalahan Saat Create Data...", { theme: "colored", autoClose: 3000 })
        }

        if (isEdit) {
            setSelectedSpesialisasi(
                options_spesialisasi.find((data) => data.value.includes(formState?.specialization))
            )
            setSelectedClases(
                data?.data_class?.map((data: any) => ({ label: data.class_name , value: data.id }))
            )
        }
    }, [isEdit, state])

    return (
        <React.Fragment>
            <form onSubmit={onSubmited}>
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <span className="block mb-2">Nama Lengkap</span>
                        <InputText
                            name="fullname"
                            value={formState.fullname}
                            required
                            onChange={(ev) => onChangeFormData("fullname", ev.target.value)}
                            placeholder="Nama Lengkap"
                            className="w-full"
                            sizeMode="md" />
                    </div>
                    <div>
                        <span className="block mb-2">Nip</span>
                        <InputText
                            name="nip"
                            required
                            value={formState.nip}
                            onChange={(ev) => onChangeFormData("nip", ev.target.value)}
                            placeholder="Nip"
                            className="w-full" sizeMode="md" />
                    </div>
                    <div>
                        <span className="block mb-2">Spesialisasi</span>
                        <SelectOption
                            required
                            name="specialization"
                            value={selectedSpesialisasi}
                            placeholder={"Pilih Spesialisasi"}
                            onChange={(val: any) => {
                                setSelectedSpesialisasi(val);
                                onChangeFormData("specialization", val.value)
                            }}
                            options={options_spesialisasi} />
                    </div>

                    <div>
                        <span className="block mb-2">Sertifikasi</span>
                        <InputText
                            required
                            name="sertification"
                            value={formState.sertification}
                            onChange={(ev) => onChangeFormData("sertification", ev.target.value)}
                            placeholder="Sertifikasi"
                            className="w-full"
                            sizeMode="md" />
                    </div>

                    <div>
                        <span className="block mb-2">Kelas Binaan</span>
                        <SelectOption
                            value={selectedClasses}
                            isMulti
                            isLoading={loadingClass}
                            onChange={(val: any) => {
                                setSelectedClases(val);
                                setFormState((prev) => ({ ...prev, no_class_ids: mapSelectOptionToValue(val) }))
                            }}
                            placeholder={"Pilih Kelas Binaan"}
                            required
                            name="no_class_ids"
                            options={classes}
                        />
                    </div>
                    <div>
                        <span className="block mb-2">Email</span>
                        <InputText
                            value={formState.email}
                            onChange={(ev) => onChangeFormData("email", ev.target.value)}
                            name="email"
                            placeholder="Email"
                            required
                            className="w-full"
                            sizeMode="md" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2 my-3">
                    <button
                        disabled={loading}
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
            </form>
        </React.Fragment>
    )
};

export default FormGuruBk