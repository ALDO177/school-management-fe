
'use client'

import { useSwrAxios } from "@/hooks/useSwrAxios";
import Card from "@components/card";
import InputText from "@components/inputext";
import ProgressBar from "@ramonak/react-progress-bar";
import React from "react";
import Avatar from "react-avatar";
import { BsAirplane, BsCalendar2 } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";


const MessageParent: React.FC = () => {


    const { data, isLoading } = useSwrAxios("/api/protected/parent-collaboration/message-parent");

    const { data: parentialInvolvement, isLoading: loadingInvolvement } = useSwrAxios("/api/protected/parent-collaboration/parental-involvement");

    const footerPusatPesan = () => {
        return (
            <div className="flex gap-3">
                <div className="flex-1">
                    <InputText placeholder="Tulis Pesan..." className="w-full" sizeMode="sm" />
                </div>
                <button className="px-3 py-2 bg-blue-500 rounded-lg">
                    <BsAirplane className="fill-white" size={20} />
                </button>
            </div>
        )
    }

    return (
        <React.Fragment>
            <div className="grid grid-cols-2 gap-3 items-start">
                <Card
                    className="w-full bg-white min-h-[15rem]"
                    footerTemplate={footerPusatPesan}>
                    <div className="px-3 py-2">
                        <h1 className="text-2xl text-gray-600 my-3 font-semibold">Pusat Pesan</h1>
                        {
                            isLoading && (
                                <>
                                    {
                                        Array.from({ length: 5 }).map((__, idx) => (
                                            <React.Fragment key={idx}>
                                                <Skeleton
                                                    width={"100%"}
                                                    height={"6rem"}
                                                    className="rounded-lg mb-2" />
                                            </React.Fragment>
                                        ))
                                    }
                                </>
                            )
                        }
                        <div className="grid grid-cols-1 gap-3">
                            {
                                !isLoading && data?.data?.map((msg: any, idx: number) => (
                                    <div key={idx} className="w-full transition-all cursor-pointer transform hover:-translate-y-1 duration-200 px-4 py-4 min-h-[5rem] bg-blue-50 rounded-lg">
                                        <div className="flex justify-between items-start">
                                            <div className="flex gap-3">
                                                <Avatar name={msg?.parent?.name} size="40" className="text-lg bg-blue-200 w-10 h-10 flex justify-center items-center text-blue-500 rounded-full" unstyled={true} round />
                                                <div>
                                                    <h1 className="text-lg font-semibold">{msg?.parent?.relation} {msg?.parent?.name} (Orang tua {msg?.parent?.student?.nama})</h1>
                                                    <span className="block mt-1">Bagaimana perkembangan Ahmad dalam matematika?</span>
                                                    <span className="block mt-2 text-xs text-blue-400">Balas</span>
                                                </div>
                                            </div>
                                            <span className="text-xs text-gray-500">10.30</span>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </Card>
                <Card className="w-full bg-white min-h-[15rem]">
                    <div className="px-3 py-2">
                        <h1 className="text-2xl text-gray-600 my-3 font-semibold">Keterlibatan Orang Tua</h1>
                        <div className="grid grid-cols-1 gap-3">
                            {
                                loadingInvolvement && (
                                    <>
                                        {
                                            Array.from({ length: 3 }).map((__, idx) => (
                                                <React.Fragment key={idx}>
                                                    <Skeleton
                                                        width={"100%"}
                                                        height={"6rem"}
                                                        className="rounded-lg mb-2" />
                                                </React.Fragment>
                                            ))
                                        }
                                    </>
                                )
                            }
                            {
                                !loadingInvolvement && (
                                    <>
                                        <div className="border border-gray-300 px-4 py-4 rounded-lg w-full min-h-[6rem]">
                                            <div className="flex justify-between items-center">
                                                <h1 className="text-lg mb-1 text-gray-500 font-semibold">Tingkat Pastisipasi</h1>
                                                <span className="text-md font-semibold text-green-500">{parentialInvolvement?.data?.participation_rate}%</span>
                                            </div>
                                            <ProgressBar
                                                height="12px"
                                                bgColor="oklch(72.3% 0.219 149.579)"
                                                completed={parentialInvolvement?.data?.participation_rate}
                                                maxCompleted={100}
                                            />
                                            <span className="text-xs">Orang tua aktif berkomunikasi</span>
                                        </div>
                                        <div className="border border-gray-300 px-4 py-4 rounded-lg w-full min-h-[6rem]">
                                            <div className="flex justify-between items-center">
                                                <h1 className="text-lg mb-1 text-gray-500 font-semibold">Response Rate</h1>
                                                <span className="text-md font-semibold text-blue-500">{parentialInvolvement?.data?.response_presentase}%</span>
                                            </div>
                                            <ProgressBar
                                                height="12px"
                                                bgColor="oklch(62.3% 0.214 259.815)"
                                                completed={parentialInvolvement?.data?.response_presentase}
                                                maxCompleted={100}
                                            />
                                            <span className="text-xs">Tingkat Respon Pesan</span>
                                        </div>
                                        <div className="border border-gray-300 px-4 py-4 rounded-lg w-full min-h-[6rem]">
                                            <div className="flex justify-between items-center">
                                                <h1 className="text-lg mb-1 text-gray-500 font-semibold">Kerhadiran Pertemuan</h1>
                                                <span className="text-md font-semibold text-purple-500">{parentialInvolvement?.data?.meeting_attendance_rate}%</span>
                                            </div>
                                            <ProgressBar
                                                height="12px"
                                                bgColor="oklch(62.7% 0.265 303.9)"
                                                completed={parentialInvolvement?.data?.meeting_attendance_rate}
                                                maxCompleted={100}
                                            />
                                            <span className="text-xs">Kehadiran dalam pertemuan</span>
                                        </div>
                                    </>
                                )
                            }

                            {
                                loadingInvolvement && (
                                    <Skeleton
                                        width={"100%"}
                                        height={"3rem"}
                                        className="rounded-lg mb-2" />
                                )
                            }
                            {
                                !loadingInvolvement && (
                                    <button className="flex justify-center items-center px-3 py-4 w-full text-white font-semibold rounded-lg bg-[linear-gradient(135deg,_#667eea_0%,_#764ba2_100%)]">
                                        <BsCalendar2 size={20} className="mr-4" />
                                        <span>Jadwalkan Pertemuan Orang Tua</span>
                                    </button>
                                )
                            }
                        </div>
                    </div>
                </Card>
            </div>
        </React.Fragment>
    )
};

export default MessageParent;