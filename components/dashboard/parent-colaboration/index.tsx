'use client'

import Card from "@components/card";
import React from "react";
import { FaUsers } from "react-icons/fa6";
import Avatar from 'react-avatar'
import InputText from "@components/inputext";
import { BsAirplane, BsBookFill, BsCalendar2, BsCameraVideo, BsClipboard2Fill } from "react-icons/bs";
import ProgressBar from '@ramonak/react-progress-bar';
import { FaChartSimple } from 'react-icons/fa6'

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
                <div className="grid grid-cols-4 gap-3">
                    <Card className="w-full transition-all transform hover:-translate-y-1 duration-200 flex flex-col justify-center h-25 bg-white border-l-4 border-l-blue-500">
                        <div className="flex space-x-5 items-center">
                            <div className="w-11 h-11 bg-blue-200 rounded-full flex justify-center items-center">
                                <FaUsers size={30} className="fill-blue-500" />
                            </div>
                            <div>
                                <span className="block text-gray-600 font-semibold">Pesan Hari Ini</span>
                                <h1 className="text-2xl font-bold">10</h1>
                            </div>
                        </div>
                    </Card>
                    <Card className="w-full transition-all transform hover:-translate-y-1 duration-200 flex flex-col justify-center h-25 bg-white border-l-4 border-l-green-500">
                        <div className="flex space-x-5 items-center">
                            <div className="w-11 h-11 bg-green-200 rounded-full flex justify-center items-center">
                                <FaUsers size={30} className="fill-green-500" />
                            </div>
                            <div>
                                <span className="block text-gray-600 font-semibold">Pertemuan Terjadwal</span>
                                <h1 className="text-2xl font-bold">8</h1>
                            </div>
                        </div>
                    </Card>
                    <Card className="w-full transition-all transform hover:-translate-y-1 duration-200 flex flex-col justify-center h-25 bg-white border-l-4 border-l-orange-500">
                        <div className="flex space-x-5 items-center">
                            <div className="w-11 h-11 bg-orange-200 rounded-full flex justify-center items-center">
                                <FaUsers size={30} className="fill-orange-500" />
                            </div>
                            <div>
                                <span className="block text-gray-600 font-semibold">Perlu Tidak Lanjut</span>
                                <h1 className="text-2xl font-bold">5</h1>
                            </div>
                        </div>
                    </Card>
                    <Card className="w-full transition-all transform hover:-translate-y-1 duration-200 flex flex-col justify-center h-25 bg-white border-l-4 border-l-purple-500">
                        <div className="flex space-x-5 items-center">
                            <div className="w-11 h-11 bg-purple-200 rounded-full flex justify-center items-center">
                                <FaUsers size={30} className="fill-purple-500" />
                            </div>
                            <div>
                                <span className="block text-gray-600 font-semibold">Rating Kepuasan</span>
                                <h1 className="text-2xl font-bold">4.8</h1>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <Card
                        className="w-full bg-white min-h-[15rem]"
                        footerTemplate={footerPusatPesan}>
                        <div className="px-3 py-2">
                            <h1 className="text-2xl text-gray-600 my-3 font-semibold">Pusat Pesan</h1>
                            <div className="grid grid-cols-1 gap-3">
                                <div className="w-full transition-all cursor-pointer transform hover:-translate-y-1 duration-200 px-4 py-4 min-h-[5rem] bg-blue-50 rounded-lg">
                                    <div className="flex justify-between items-start">
                                        <div className="flex gap-3">
                                            <Avatar name="Ibu Budi" size="40" className="text-lg bg-blue-200 w-10 h-10 flex justify-center items-center text-blue-500 rounded-full" unstyled={true} round />
                                            <div>
                                                <h1 className="text-lg font-semibold">Ibu Budi (Orang tua Ahmad)</h1>
                                                <span className="block mt-1">Bagaimana perkembangan Ahmad dalam matematika?</span>
                                                <span className="block mt-2 text-xs text-blue-400">Balas</span>
                                            </div>
                                        </div>
                                        <span className="text-xs text-gray-500">10.30</span>
                                    </div>
                                </div>
                                <div className="w-full transition-all cursor-pointer transform hover:-translate-y-1 duration-200 px-4 py-4 min-h-[7rem] bg-green-50 rounded-lg">
                                    <div className="flex justify-between items-start">
                                        <div className="flex gap-3">
                                            <Avatar name="Pask Ahmad" size="40" className="text-lg bg-green-200 w-10 h-10 flex justify-center items-center text-green-500 rounded-full" unstyled={true} round />
                                            <div>
                                                <h1 className="text-lg font-semibold">Pak Ahmad (Orang tua Sari)</h1>
                                                <span className="block mt-1">Terima kasih atas bimbingannya. Sari sudah mulai rajin belajar.</span>
                                                <span className="block mt-2 text-xs text-green-400">Balas</span>
                                            </div>
                                        </div>
                                        <span className="text-xs text-gray-500">10.30</span>
                                    </div>
                                </div>
                                <div className="w-full transition-all cursor-pointer transform hover:-translate-y-1 duration-200 px-4 py-4 min-h-[7rem] bg-orange-50 rounded-lg">
                                    <div className="flex justify-between items-start">
                                        <div className="flex gap-3">
                                            <Avatar name="Ibu Ani" size="40" className="text-lg bg-orange-200 w-10 h-10 flex justify-center items-center text-orange-500 rounded-full" unstyled={true} round />
                                            <div>
                                                <h1 className="text-lg font-semibold">Ibu Ani (Orang tua Dika)</h1>
                                                <span className="block mt-1">Mohon jadwal konsultasi untuk membahas pilihan jurusan kuliah.</span>
                                                <span className="block mt-2 text-xs text-orange-400">Balas</span>
                                            </div>
                                        </div>
                                        <span className="text-xs text-gray-500">10.30</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                    <Card className="w-full bg-white min-h-[15rem]">
                        <div className="px-3 py-2">
                            <h1 className="text-2xl text-gray-600 my-3 font-semibold">Keterlibatan Orang Tua</h1>
                            <div className="grid grid-cols-1 gap-3">
                                <div className="border border-gray-300 px-4 py-4 rounded-lg w-full min-h-[6rem]">
                                    <div className="flex justify-between items-center">
                                        <h1 className="text-lg mb-1 text-gray-500 font-semibold">Tingkat Pastisipasi</h1>
                                        <span className="text-md font-semibold text-green-500">85%</span>
                                    </div>
                                    <ProgressBar
                                        height="12px"
                                        bgColor="oklch(72.3% 0.219 149.579)"
                                        completed={85}
                                        maxCompleted={100}
                                    />
                                    <span className="text-xs">Orang tua aktif berkomunikasi</span>
                                </div>
                                <div className="border border-gray-300 px-4 py-4 rounded-lg w-full min-h-[6rem]">
                                    <div className="flex justify-between items-center">
                                        <h1 className="text-lg mb-1 text-gray-500 font-semibold">Response Rate</h1>
                                        <span className="text-md font-semibold text-blue-500">92%</span>
                                    </div>
                                    <ProgressBar
                                        height="12px"
                                        bgColor="oklch(62.3% 0.214 259.815)"
                                        completed={92}
                                        maxCompleted={100}
                                    />
                                    <span className="text-xs">Tingkat Respon Pesan</span>
                                </div>
                                <div className="border border-gray-300 px-4 py-4 rounded-lg w-full min-h-[6rem]">
                                    <div className="flex justify-between items-center">
                                        <h1 className="text-lg mb-1 text-gray-500 font-semibold">Kerhadiran Pertemuan</h1>
                                        <span className="text-md font-semibold text-purple-500">75%</span>
                                    </div>
                                    <ProgressBar
                                        height="12px"
                                        bgColor="oklch(62.7% 0.265 303.9)"
                                        completed={85}
                                        maxCompleted={100}
                                    />
                                    <span className="text-xs">Kehadiran dalam pertemuan</span>
                                </div>

                                <button className="flex justify-center items-center px-3 py-4 w-full text-white font-semibold rounded-lg bg-[linear-gradient(135deg,_#667eea_0%,_#764ba2_100%)]">
                                    <BsCalendar2 size={20} className="mr-4" />
                                    <span>Jadwalkan Pertemuan Orang Tua</span>
                                </button>
                            </div>
                        </div>
                    </Card>
                </div>

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