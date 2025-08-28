import useGetClass from "@/hooks/useGetClass";
import InputText from "@components/inputext";
import SelectOption from "@components/select";
import { actionHomeRoomTeacherForm } from "@directive/servers/user-management/guru_wali_kelas";
import React, { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface PropFormGuruWaliKelas {
    toogleClose: () => void;
    mutate: () => void;
    isEdit?: boolean;
    data?: any;
};

const FormWaliKelas: React.FC<PropFormGuruWaliKelas> = ({ toogleClose, mutate, isEdit = false, data }) => {

    const [selectedClass, setSelectedClass] = useState();
    const { classes, loadingClass } = useGetClass<any>();

    const [state, formAction, pending] = useActionState(actionHomeRoomTeacherForm, {
        fullname: data?.fullname ?? "",
        nip: data?.nip ?? "",
        no_class_id: data?.no_class_id,
        subjects: data?.subjects ?? "",
        experience : data?.experience ?? "",
        email: data?.email ?? ""
    });

    useEffect(() => {

        if (state?.success === true) {
            toogleClose();
            mutate();
            toast(isEdit ? "Update Wali Kelas Berhasil!" : "Tambah Wali Kelas Berhasil!", {
                type: "success",
                autoClose: 3000,
                theme: "colored"
            });
        }

        if (state?.error === true) {
            toogleClose();
            toast.error(`Terjadi Kesalahan, ${state?.message}`, { theme: "colored", autoClose: 3000 })
        }

        if (isEdit) {
            setSelectedClass(
                classes?.find((value) => value.value === state?.no_class_id)
            )
        }

    }, [state, isEdit, classes]);

    const cancelSubmited = () => {
        toogleClose();
        toast("Tambah Wali kelas di batalkan!", {
            type: "error",
            autoClose: 3000
        })
    }

    return (
        <React.Fragment>
            <form action={formAction}>
                <div className="grid grid-cols-1 gap-4">
                    {
                        data?.id && (
                            <InputText type="hidden" name="id" defaultValue={data?.id} />
                        )
                    }
                    <div>
                        <span className="block mb-2">Fullname</span>
                        <InputText
                            name="fullname"
                            sizeMode="md"
                            required
                            placeholder="Fullname"
                            defaultValue={state?.fullname}
                            className="w-full" />
                    </div>
                    <div>
                        <span className="block mb-2">Nip</span>
                        <InputText
                            name="nip"
                            required
                            sizeMode="md"
                            placeholder="Nip"
                            defaultValue={state?.nip}
                            className="w-full" />
                    </div>
                    <div>
                        <span className="block mb-2">Email</span>
                        <InputText
                            required
                            name="email"
                            placeholder="Email"
                            defaultValue={state?.email}
                            sizeMode="md"
                            className="w-full" />
                    </div>
                    <div>
                        <span className="block mb-2">Kelas</span>
                        <SelectOption
                            value={selectedClass}
                            onChange={(val: any) => setSelectedClass(val)}
                            isLoading={loadingClass}
                            placeholder={"Pilih Kelas"}
                            name="no_class_id"
                            required
                            options={classes}
                        />
                    </div>
                    <div>
                        <span className="block mb-2">Mata Pelajaran</span>
                        <InputText
                            name="subjects"
                            sizeMode="md"
                            placeholder="Mata Pelajaran"
                            defaultValue={state?.subjects}
                            className="w-full" />
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

export default FormWaliKelas;