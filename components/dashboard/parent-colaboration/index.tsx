'use client'

import Card from "@components/card";
import React from "react";
import Avatar from 'react-avatar'
import InputText from "@components/inputext";
import { BsAirplane, BsCalendar2, BsCameraVideo, BsClipboard2Fill } from "react-icons/bs";
import ProgressBar from '@ramonak/react-progress-bar';
import { FaChartSimple } from 'react-icons/fa6'
import CountAggregation from "./components/count-aggregation";
import MessageParent from "./components/message-parent";

const ParentCollaboration: React.FC = () => {

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
            <div className="grid grid-cols-1 gap-4">
                <div>
                    <h1 className="text-3xl font-semibold my-3">Kolaborasi Orang Tua</h1>
                    <p className="text-gray-600 text-lg">Platform komunikasi dan koordinasi dengan orang tua siswa</p>
                </div>
                
                <CountAggregation/>
                <MessageParent/>
                
                <Card className="w-full bg-white min-h-[15rem]">
                    <div className="px-3 py-2">
                        <h1 className="text-2xl text-gray-600 my-3 font-semibold">Keterlibatan Orang Tua</h1>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="w-full flex flex-col space-y-2 items-center justify-center border border-slate-200 min-h-[10rem] rounded-lg p-3">
                                <div className="px-4 py-4 flex justify-center items-center rounded-full bg-blue-200">
                                    <BsCameraVideo size={30} className="fill-blue-500" />
                                </div>
                                <h1 className="font-semibold text-lg">Video Conference</h1>
                                <span className="text-gray-500 text-sm">Konsultasi online dengan orang tua</span>
                                <button className="px-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold">
                                    Mulai
                                </button>
                            </div>
                            <div className="w-full flex flex-col space-y-2 items-center justify-center border border-slate-200 min-h-[10rem] rounded-lg p-3">
                                <div className="px-4 py-4 flex justify-center items-center rounded-full bg-green-200">
                                    <BsClipboard2Fill size={30} className="fill-green-500" />
                                </div>
                                <h1 className="font-semibold text-lg">Laporan Progress</h1>
                                <span className="text-gray-500 text-sm">Kirim laporan perkembangan siswa</span>
                                <button className="px-3 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold">
                                    Mulai
                                </button>
                            </div>
                            <div className="w-full flex flex-col space-y-2 items-center justify-center border border-slate-200 min-h-[10rem] rounded-lg p-3">
                                <div className="px-4 py-4 flex justify-center items-center rounded-full bg-purple-200">
                                    <FaChartSimple size={30} className="fill-purple-500" />
                                </div>
                                <h1 className="font-semibold text-lg">Survey Kepuasan</h1>
                                <span className="text-gray-500 text-sm">Evaluasi layanan pendampingan</span>
                                <button className="px-3 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-semibold">
                                    Mulai
                                </button>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </React.Fragment>
    )
};

export default ParentCollaboration;