'use client'
import Card from "@components/card";
import StarRating from "@components/rating";
import ProgressBar from "@ramonak/react-progress-bar";
import React from "react";
import { FaTriangleExclamation, FaUsers } from "react-icons/fa6";
import TableMatrixAntarPeran from "./components/table.antar.peran";
import GrafikMonitorTrend from "./components/grafik.monitoring.tren";
import { BsCheck, BsTriangle } from "react-icons/bs";

const CoordinationResultsMatrix: React.FC = () => {
    return (
        <React.Fragment>
            <div className="grid grid-cols-1 gap-4">
                <div>
                    <h1 className="text-3xl font-semibold my-3">Matrik Hasil Koordinasi</h1>
                    <p className="text-gray-600 text-lg">Analisis dan evaluasi hasil koordinasi pendampingan siswa</p>
                </div>
                <div className="grid grid-cols-4 gap-3">
                    <Card className="w-full transition-all transform hover:-translate-y-1 duration-200 flex flex-col justify-center h-30 bg-white border-l-4 border-l-green-500">
                        <div className="flex justify-between space-x-5 items-center">
                            <div>
                                <span className="block text-gray-600 font-semibold">Efektivitas Aktifasi</span>
                                <h1 className="text-2xl font-bold text-green-500">87%</h1>
                            </div>
                            <div className="w-11 h-11 bg-green-200 rounded-full flex justify-center items-center">
                                <FaUsers size={30} className="fill-green-500" />
                            </div>
                        </div>
                        <ProgressBar
                            height="10px"
                            className="mt-3"
                            completed={80}
                            bgColor="oklch(72.3% 0.219 149.579)"
                            maxCompleted={100} />
                    </Card>
                    <Card className="w-full transition-all transform hover:-translate-y-1 duration-200 flex flex-col justify-center h-30 bg-white border-l-4 border-l-blue-500">
                        <div className="flex justify-between space-x-5 items-center">
                            <div>
                                <span className="block text-gray-600 font-semibold">Tingkat Resolasi</span>
                                <h1 className="text-2xl font-bold">92%</h1>
                            </div>
                            <div className="w-11 h-11 bg-blue-200 rounded-full flex justify-center items-center">
                                <FaUsers size={30} className="fill-blue-500" />
                            </div>
                        </div>
                        <ProgressBar
                            height="10px"
                            className="mt-3"
                            completed={92}
                            labelSize="12px"
                            bgColor="oklch(62.3% 0.214 259.815)"
                            maxCompleted={100} />
                    </Card>
                    <Card className="w-full transition-all transform hover:-translate-y-1 duration-200 flex flex-col justify-center h-30 bg-white border-l-4 border-l-orange-500">
                        <div className="flex justify-between space-x-5 items-center">
                            <div>
                                <span className="block text-gray-600 font-semibold">Waktu Respon</span>
                                <h1 className="text-2xl text-orange-500 font-bold">2.3h</h1>
                            </div>
                            <div className="w-11 h-11 bg-orange-200 rounded-full flex justify-center items-center">
                                <FaUsers size={30} className="fill-orange-500" />
                            </div>
                        </div>
                        <span className="text-sm text-gray-500 mt-3">Rata rata waktu respon</span>
                    </Card>
                    <Card className="w-full transition-all transform hover:-translate-y-1 duration-200 flex flex-col justify-center h-30 bg-white border-l-4 border-l-purple-500">
                        <div className="flex justify-between space-x-5 items-center">
                            <div>
                                <span className="block text-gray-600 font-semibold">Kepuasan Siswa</span>
                                <h1 className="text-2xl font-bold text-purple-500">4.6/5</h1>
                            </div>
                            <div className="w-11 h-11 bg-purple-200 rounded-full flex justify-center items-center">
                                <FaUsers size={30} className="fill-purple-500" />
                            </div>
                        </div>
                        <div className="mt-2">
                            <StarRating size={20} rating={4.5} />
                        </div>
                    </Card>
                </div>

                <TableMatrixAntarPeran />
                <GrafikMonitorTrend />

                <Card className="w-full bg-white min-h-[15rem]">
                    <div className="px-3 py-2">
                        <h1 className="text-xl font-semibold text-gray-800 my-3">Rekomendasi Perbaikan</h1>
                        <div className="grid grid-cols-2 max-md:grid-cols-1">
                            <div className="space-y-2">
                                <h1 className="text-green-500 font-medium text-lg mb-2">Kekuatan</h1>
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-500 rounded-full">
                                        <BsCheck size={20} className="fill-white" />
                                    </div>
                                    <span>Koordinasi Guru Wali - Wali Kelas sangat efektif</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-500 rounded-full">
                                        <BsCheck size={20} className="fill-white" />
                                    </div>
                                    <span>Tingkat resolusi masalah tinggi (92%)</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-500 rounded-full">
                                        <BsCheck size={20} className="fill-white" />
                                    </div>
                                    <span>Kepuasan siswa mencapai 4.6/5</span>
                                </div>
                            </div>

                            <div>
                                <div className="space-y-2">
                                    <h1 className="text-orange-500 font-medium text-lg mb-2">Area Perbaikan</h1>
                                    <div className="flex items-center gap-3">
                                        <div className="bg-orange-500 px-1.5 py-1.5 rounded-full">
                                            <FaTriangleExclamation size={10} className="fill-white" />
                                        </div>
                                        <span>Tingkatkan komunikasi Wali Kelas - Guru BK</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="bg-orange-500 px-1.5 py-1.5 rounded-full">
                                            <FaTriangleExclamation size={10} className="fill-white" />
                                        </div>
                                        <span>Percepat waktu respon rata-rata</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="bg-orange-500 px-1.5 py-1.5 rounded-full">
                                            <FaTriangleExclamation size={10} className="fill-white" />
                                        </div>
                                        <span>Perbaiki kualitas komunikasi dengan orang tua</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </React.Fragment>
    )
};

export default CoordinationResultsMatrix;