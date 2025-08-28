import useActivities from "@/hooks/useActivity";
import useDays from "@/hooks/useDays";
import useHomeRoomTeacher from "@/hooks/useHomeRoomTeacher";
import useSessionSchedule from "@/hooks/useSessionSchedule";
import Card from "@components/card";
import InputText from "@components/inputext";
import SelectOption from "@components/select";
import { DashboardContext } from "@context/dashboard.context";
import axios from "axios";
import React, { useContext, useState } from "react";
import { BsPlus } from "react-icons/bs";

interface PropsSchdule {
    data    ?: any;
    onClose ?: () => void;
    mutate  ?: () => void;
};

interface Option {
    label: string | number;
    value: string;
}

interface FormData {
    "day_id": number | null,
    "description": string | null,
    "activity_id": number | null,
    "session_id": number | null,
    "start_time": string | null,
    "end_time": string | null,
    "home_room_assigment_ids": any
}

const ScheduleManagement: React.FC<PropsSchdule> = ({ data, mutate,onClose }) => {

    const { refModal } = useContext(DashboardContext);

    const FormPage = () => {

        const [isLoading, setIsLoading] = useState<boolean>(false);

        const { days, loadingDay } = useDays();
        const [selectedDay, setSelectedDay] = useState();

        const { activities, loadingActivity } = useActivities();
        const [selectedActivity, setSelectedActivity] = useState();

        const { sessions, loadingSession } = useSessionSchedule();
        const [selectedSession, setSelectedSession] = useState();

        const { homeRoomTeacher, loading } = useHomeRoomTeacher();
        const [selectedHomeTeacher, setSelectedHomeTeacher] = useState<Option[]>([]);

        const [form, setForm] = useState<Partial<FormData>>({
            "day_id": null,
            "description": "",
            "activity_id": null,
            "session_id": null,
            "start_time": "",
            "end_time": "",
            "home_room_assigment_ids": null
        });

        const onSubmited = async (ev: React.FormEvent<HTMLFormElement> | any) => {
            ev.preventDefault();
            setIsLoading(true);

            try {
                await axios.post('/api/protected/schedules', form, { timeout: 300000 });
                setIsLoading(false);
                onClose?.();
                mutate?.();
            } catch (err: any) {
                console.log(err)
                setIsLoading(false);
            }
        }

        const onChangeForm = (key: keyof FormData, value: any) => {
            setForm((prevForm) => ({ ...prevForm, [key]: value }))
        }

        return (
            <form onSubmit={onSubmited}>
                <div className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <span className="block mb-2">Jadwal Hari</span>
                            <SelectOption
                                value={selectedDay}
                                name="day_id"
                                onChange={(val: any) => {
                                    setSelectedDay(val);
                                    onChangeForm("day_id", Number(val.value))
                                }}
                                isLoading={loadingDay}
                                options={days}
                                placeholder="Pilih Hari" />
                        </div>
                        <div>
                            <span className="block mb-2">Jadwal Aktifitas</span>
                            <SelectOption
                                value={selectedActivity}
                                name="activity_id"
                                onChange={(val: any) => {
                                    setSelectedActivity(val);
                                    onChangeForm("activity_id", Number(val.value))
                                }}
                                isLoading={loadingActivity}
                                options={activities}
                                placeholder="Pilih Aktifitas" />
                        </div>
                        <div>
                            <span className="block mb-2">Sesi</span>
                            <SelectOption
                                value={selectedSession}
                                name="session_id"
                                onChange={(val: any) => {
                                    setSelectedSession(val);
                                    onChangeForm("session_id", Number(val.value))
                                }}
                                isLoading={loadingSession}
                                options={sessions}
                                placeholder="Pilih Sesi" />
                        </div>
                        <div>
                            <span className="block mb-2">Deskription</span>
                            <InputText
                                placeholder="Description"
                                onChange={(ev) => onChangeForm("description", ev.target.value)}
                                name="description" />
                        </div>
                        <div>
                            <span className="block mb-2">Waktu Dimulai</span>
                            <InputText
                                type="time"
                                name="start_time"
                                onChange={(ev) => onChangeForm("start_time", ev.target.value)}
                                placeholder="Waktu Dimulai" />
                        </div>
                        <div>
                            <span className="block mb-2">Waktu Selesai</span>
                            <InputText
                                type="time"
                                name="end_time"
                                onChange={(ev) => onChangeForm('end_time', ev.target.value)}
                                placeholder="Waktu Selesai" />
                        </div>
                    </div>
                    <div>
                        <span className="block mb-2">Pendamping</span>
                        <SelectOption
                            placeholder="Pilih Pendamping"
                            className="w-full"
                            name="home_room_assigment_ids"
                            isLoading={loading}
                            options={homeRoomTeacher}
                            value={selectedHomeTeacher}
                            onChange={(val: any) => {
                                setSelectedHomeTeacher(val);
                                onChangeForm("home_room_assigment_ids", val.map((data: Option) => data.value))
                            }}
                            isMulti
                        />
                    </div>

                    <div className="flex w-full justify-end">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-4 disabled:cursor-not-allowed disabled:bg-blue-500/40 text-white py-3 w-[12rem] rounded-lg bg-blue-500">
                            Submited
                        </button>
                    </div>
                </div>
            </form>
        )
    }

    const onModalOpen = () => {
        refModal?.current?.options({
            cardclassName: "w-[40rem] max-md:w-full min-h-[30rem] h-auto bg-white",
            title: "Tambah Sesi Schedule",
            content: <FormPage />
        });
        refModal?.current?.open();
    };

    return (
        <Card className="w-full min-h-[12rem] bg-white">

            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold my-3">Management Jadwal</h1>
                <button
                    onClick={onModalOpen}
                    className="flex justify-center items-center gap-1 px-5 py-3 rounded-lg bg-blue-500 hover:bg-blue-600">
                    <BsPlus size={18} className="fill-white" />
                    <span className="text-white">Tambah Sesi</span>
                </button>
            </div>

            <div className="grid grid-cols-3 mt-3 gap-3">
                <div className="px-5 py-6 w-full rounded-lg border border-gray-300">
                    <h1 className="text-xl mb-3 font-semibold text-gray-500">Sesi Aktif Hari ini</h1>
                    <div>
                        <h1 className="text-2xl text-blue-500 font-bold">{data?.total_assigments ?? "0"}</h1>
                        <span className="block text-md text-gray-500">Sesi Pendampingan</span>
                    </div>
                </div>
                <div className="px-5 py-6 w-full rounded-lg border border-gray-300">
                    <h1 className="text-xl mb-3 font-semibold text-gray-500">Guru Bertugas</h1>
                    <div>
                        <h1 className="text-2xl text-green-500 font-bold">{data?.teacher_total_active ?? 0}</h1>
                        <span className="block text-md text-gray-500">Guru Aktif</span>
                    </div>
                </div>
                <div className="px-5 py-6 w-full rounded-lg border border-gray-300">
                    <h1 className="text-xl mb-3 font-semibold text-gray-500">Sesi Aktif Hari ini</h1>
                    <div>
                        <h1 className="text-2xl text-purple-500 font-bold">45</h1>
                        <span className="block text-md text-gray-500">Siswa Minggu Ini</span>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default ScheduleManagement;