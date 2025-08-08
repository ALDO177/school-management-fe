import Card from "@components/card";
import WorkflowSteps from "@components/workflow";
import React from "react";
import { BsCheck } from "react-icons/bs";
import { FaUsers } from "react-icons/fa6";

const DivisionOfRoles: React.FC = () => {
    return (
        <React.Fragment>
            <div className="grid grid-cols-1 gap-5">
                <div>
                    <h1 className="text-3xl font-semibold my-3">Pembagian Peran</h1>
                    <p className="text-gray-600 text-lg">Struktur dan tanggung jawab setiap peran dalam sistem pendampingan</p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                    <Card className="w-full min-h-[22rem] bg-white border-l-4 border-l-green-500">
                        <div className="px-2 py-4">
                            <div className="flex space-x-3 items-center">
                                <div className="rounded-full w-14 h-14 bg-green-500/20 flex justify-center items-center">
                                    <FaUsers size={30} className="fill-green-500" />
                                </div>
                                <h1 className="text-xl text-gray-500">Guru Wali</h1>
                            </div>
                            <ul className="list-none mt-2 px-3 py-4">
                                <li className="flex space-x-2 items-center py-2">
                                    <div className="w-4 h-4 flex justify-center items-center rounded-full bg-green-500">
                                        <BsCheck className="fill-white" size={16} />
                                    </div>
                                    <span>Membimbing siswa dalam pembelajaran</span>
                                </li>
                                <li className="flex space-x-2 items-center py-2">
                                    <div className="w-4 h-4 flex justify-center items-center rounded-full bg-green-500">
                                        <BsCheck className="fill-white" size={16} />
                                    </div>
                                    <span>Membimbing siswa dalam pembelajaran</span>
                                </li>
                                <li className="flex space-x-2 items-center py-2">
                                    <div className="w-4 h-4 flex justify-center items-center rounded-full bg-green-500">
                                        <BsCheck className="fill-white" size={16} />
                                    </div>
                                    <span>Membimbing siswa dalam pembelajaran</span>
                                </li>
                                <li className="flex space-x-2 items-center py-2">
                                    <div className="w-4 h-4 flex justify-center items-center rounded-full bg-green-500">
                                        <BsCheck className="fill-white" size={16} />
                                    </div>
                                    <span>Membimbing siswa dalam pembelajaran</span>
                                </li>
                            </ul>
                            <button className="w-full px-3 py-2 rounded-lg text-white bg-green-500 hover:bg-green-600">Kelola</button>
                        </div>
                    </Card>
                    <Card className="w-full min-h-[20rem] bg-white border-l-4 border-l-orange-400">
                        <div className="px-2 py-4">
                            <div className="flex space-x-3 items-center">
                                <div className="rounded-full w-14 h-14 bg-orange-500/20 flex justify-center items-center">
                                    <FaUsers size={30} className="fill-orange-500" />
                                </div>
                                <h1 className="text-xl text-gray-500">Guru BK</h1>
                            </div>
                             <ul className="list-none mt-2 px-3 py-4">
                                <li className="flex space-x-2 items-center py-2">
                                    <div className="w-4 h-4 flex justify-center items-center rounded-full bg-orange-500">
                                        <BsCheck className="fill-white" size={16} />
                                    </div>
                                    <span>Membimbing siswa dalam pembelajaran</span>
                                </li>
                                <li className="flex space-x-2 items-center py-2">
                                    <div className="w-4 h-4 flex justify-center items-center rounded-full bg-orange-500">
                                        <BsCheck className="fill-white" size={16} />
                                    </div>
                                    <span>Membimbing siswa dalam pembelajaran</span>
                                </li>
                                <li className="flex space-x-2 items-center py-2">
                                    <div className="w-4 h-4 flex justify-center items-center rounded-full bg-orange-500">
                                        <BsCheck className="fill-white" size={16} />
                                    </div>
                                    <span>Membimbing siswa dalam pembelajaran</span>
                                </li>
                                <li className="flex space-x-2 items-center py-2">
                                    <div className="w-4 h-4 flex justify-center items-center rounded-full bg-orange-500">
                                        <BsCheck className="fill-white" size={16} />
                                    </div>
                                    <span>Membimbing siswa dalam pembelajaran</span>
                                </li>
                            </ul>
                            <button className="w-full px-3 py-2 rounded-lg text-white bg-orange-500 hover:bg-orange-600">Kelola Guru BK</button>
                        </div>
                    </Card>
                    <Card className="w-full min-h-[20rem] bg-white border-l-4 border-l-blue-500">
                        <div className="px-2 py-4">
                            <div className="flex space-x-3 items-center">
                                <div className="rounded-full w-14 h-14 bg-blue-500/20 flex justify-center items-center">
                                    <FaUsers size={30} className="fill-blue-500" />
                                </div>
                                <h1 className="text-xl text-gray-500">Guru Kelas</h1>
                            </div>
                             <ul className="list-none mt-2 px-3 py-4">
                                <li className="flex space-x-2 items-center py-2">
                                    <div className="w-4 h-4 flex justify-center items-center rounded-full bg-blue-500">
                                        <BsCheck className="fill-white" size={16} />
                                    </div>
                                    <span>Membimbing siswa dalam pembelajaran</span>
                                </li>
                                <li className="flex space-x-2 items-center py-2">
                                    <div className="w-4 h-4 flex justify-center items-center rounded-full bg-blue-500">
                                        <BsCheck className="fill-white" size={16} />
                                    </div>
                                    <span>Membimbing siswa dalam pembelajaran</span>
                                </li>
                                <li className="flex space-x-2 items-center py-2">
                                    <div className="w-4 h-4 flex justify-center items-center rounded-full bg-blue-500">
                                        <BsCheck className="fill-white" size={16} />
                                    </div>
                                    <span>Membimbing siswa dalam pembelajaran</span>
                                </li>
                                <li className="flex space-x-2 items-center py-2">
                                    <div className="w-4 h-4 flex justify-center items-center rounded-full bg-blue-500">
                                        <BsCheck className="fill-white" size={16} />
                                    </div>
                                    <span>Membimbing siswa dalam pembelajaran</span>
                                </li>
                            </ul>
                            <button className="w-full px-3 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600">Kelola Guru Wali Kelas</button>
                        </div>
                    </Card>
                </div>
                
                <Card className="w-full min-h-[22rem] bg-white">
                    <WorkflowSteps/>
                </Card>
            </div>
        </React.Fragment>
    )
};

export default DivisionOfRoles;