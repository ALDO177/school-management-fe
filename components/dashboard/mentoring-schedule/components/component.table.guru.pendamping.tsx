import useHomeRoomTeacher from "@/hooks/useHomeRoomTeacher";
import { useSwrAxios } from "@/hooks/useSwrAxios";
import SelectOption from "@components/select";
import { Table } from "@components/table";
import axios from "axios";
import React, { useContext, useState } from "react";
import { BsTrash2 } from "react-icons/bs";
import { toast } from "react-toastify";

interface PropsTableGuru {
    id: number;
    row?: any;
}

interface PropsForm {
    schedule_id?: number | string,
    home_room_assigment_id?: number | string
};

const TableGuruPendamping: React.FC<PropsTableGuru> = ({ id, row }) => {

    const [collapse, setCollapse] = useState<boolean>(false);
    const { data, isLoading, mutate } = useSwrAxios(`/api/protected/days/${id}`);

    const { homeRoomTeacher, loading } = useHomeRoomTeacher();
    const [selectedTime, setSelectedTime] = useState<any>();

    const [selectedTeacher, setSelectedTeacher] = useState();
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

    const [form, setForm] = useState<PropsForm>({
        "schedule_id": 0,
        "home_room_assigment_id": 0
    });

    const onChangeForm = (key: keyof PropsForm, value: any) => {
        setForm((prev) => ({ ...prev, [key]: value }))
    };

    const onSubmited = async () => {
        setLoadingSubmit(true)
        try {
            const body = form;
            await axios.post('/api/protected/schedules/companion', body);
            toast.success("Berhasil Ditambahkan", { theme: "colored", autoClose: 3000 })
            setCollapse(false)
            mutate();
            setLoadingSubmit(false)
        } catch (err: any) {
            toast.error("Terjadi Kesalahan!", { theme: "colored", autoClose: 3000 })
            setLoadingSubmit(false)
        }
    }

    const onDelete = async (row: any) => {

        setLoadingSubmit(true);

        try {
            const body = {
                "schedule_id": row?.schedule_id,
                "home_room_assigment_id": row?.home_room_assigment_id,
            };

            await axios.delete('/api/protected/schedules/companion', { timeout: 300000, data: body });
            toast.success("Berhasil Dihapus", { theme: "colored", autoClose: 3000 })
            setCollapse(false)
            mutate();
            setLoadingSubmit(false)

        } catch (err: any) {
            toast.error("Terjadi Kesalahan!", { theme: "colored", autoClose: 3000 })
            setLoadingSubmit(false)
        }
    }

    return (
        <React.Fragment>
            <div className="my-3 flex justify-between items-center">
                <h1 className={"text-xl text-gray-500"}>Jumlah Guru Pendaming {data?.data?.length ?? "-"}</h1>
                <button 
                    onClick={() => setCollapse((prev) => !prev)} 
                    className="cursor-pointer hover:bg-blue-600 px-4 py-2 bg-blue-500 rounded-lg shadow-md text-white">
                   {
                    collapse ? "Kembali" : " Tambah Pendamping"
                   }
                </button>
            </div>

            {
                collapse && (
                    <div className="grid grid-cols-2 gap-3 justify-center items-center">
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <span className="block mb-2">Pilih Waktu</span>
                                <ul className="flex gap-2">
                                    {row?.schedules?.map((data: any, idx: number) => (
                                        <li key={idx}>
                                            <input
                                                type="checkbox"
                                                required
                                                id={`${data?.start_time}-${idx}`}
                                                checked={selectedTime?.id === data?.id}
                                                onChange={() => {
                                                    setSelectedTime(data);
                                                    onChangeForm("schedule_id", data?.id)
                                                }}
                                                className="peer hidden"
                                            />
                                            <label
                                                htmlFor={`${data?.start_time}-${idx}`}
                                                className="peer-checked:bg-sky-400 transition-all duration-300 peer-checked:text-white rounded-full border border-sky-100 bg-sky-50 px-2 py-1 cursor-pointer">
                                                {data?.start_time} - {data?.end_time}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <span className="block mb-2">
                                    Guru Pendamping
                                </span>
                                <SelectOption
                                    isLoading={loading}
                                    value={selectedTeacher}
                                    required
                                    onChange={(val: any) => {
                                        setSelectedTeacher(val);
                                        onChangeForm("home_room_assigment_id", val.value)
                                    }}
                                    className="min-w-[20rem]"
                                    options={homeRoomTeacher} />
                            </div>
                            <button
                                onClick={onSubmited}
                                disabled={loadingSubmit}
                                className="w-full disabled:cursor-not-allowed disabled:bg-blue-500/20 px-4 py-3 rounded-lg bg-blue-500 text-white font-semibold">
                                Submited
                            </button>
                        </div>
                    </div>
                )
            }

            {
                !collapse && (
                    <Table
                        isLoading={isLoading}
                        columns={[
                            {
                                key: "nip",
                                label: "Nip",
                                render: (val, row) => {

                                    if (!val) return "-"
                                    return val
                                }
                            },
                            {
                                key: "teacher_name",
                                label: "Nama",
                                render: (val, row) => {

                                    if (!val) return "-"
                                    return val
                                }
                            },
                            {
                                key: "subjects",
                                label: "Mata Pelajaran",
                                render: (val, row) => {

                                    if (!val) return "-"
                                    return val
                                }
                            },
                            {
                                key: "start_time",
                                label: "Waktu Mulai",
                                render: (val, row) => {
                                    if (!val) return "-"
                                    return val
                                }
                            },
                            {
                                key: "end_time",
                                label: "Waktu Selesai",
                                render: (val, row) => {

                                    if (!val) return "-"
                                    return val
                                }
                            },
                            {
                                key: "",
                                label: "Aksi",
                                render(value, row) {
                                    return (
                                        <div className="flex space-x-3 items-center">
                                            <button
                                                disabled={loadingSubmit}
                                                onClick={() => onDelete(row)}
                                                className="disabled:bg-red-500/30 cursor-pointer p-2 bg-red-500 hover:bg-red-600 rounded-md">
                                                <BsTrash2 size={18} className="fill-white" />
                                            </button>
                                        </div>
                                    )
                                },
                            }
                        ]}
                        data={data?.data ?? []}
                    />
                )
            }
        </React.Fragment>
    )
};

export default TableGuruPendamping