
'use client'

import Card from "@components/card";
import WorkflowSteps from "@components/workflow";
import React from "react";
import { BsCheck } from "react-icons/bs";
import { FaUsers } from "react-icons/fa6";
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { useSwrAxios } from "@/hooks/useSwrAxios";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";

const DivisionOfRoles: React.FC = () => {

    const { data, isLoading, error } = useSwrAxios('/api/protected/roles');

    return (
        <React.Fragment>
            <div className="grid grid-cols-1 gap-5">
                <div>
                    <h1 className="text-3xl font-semibold my-3">Pembagian Peran</h1>
                    <p className="text-gray-600 text-lg">Struktur dan tanggung jawab setiap peran dalam sistem pendampingan</p>
                </div>

                {
                    isLoading && (
                        <>
                            <div className="grid grid-cols-3 gap-4">
                                {
                                    Array.from({ length: 3 }).map((__, idx) => (
                                        <div key={idx}>
                                            <Skeleton height={"22rem"} width={"100%"} />
                                        </div>
                                    ))
                                }
                            </div>
                        </>
                    )
                }

                <div className="p-0">
                    <Splide options={{
                        perPage: 3, // tampil 3 item per slide
                        gap: "1rem", // jarak antar slide
                        rewind: true, // balik ke awal setelah habis
                        autoplay: true,
                        interval: 4000,
                        arrows: false,
                        pagination: false
                    }}

                        aria-label="React Splide Example">
                        {
                            data?.data?.map((role: any, idx: number) => (
                                <React.Fragment key={idx}>
                                    <SplideSlide>
                                        <Card
                                            className={`w-full min-h-[22rem] bg-white border-l-4 border-l-sky-500`}
                                        >
                                            <div className="flex flex-col px-2 py-4 h-full">
                                                <div className="flex space-x-3 items-center">
                                                    <div className="rounded-full w-14 h-14 bg-sky-500/20 flex justify-center items-center">
                                                        <FaUsers size={30} className="fill-sky-500" />
                                                    </div>
                                                    <h1 className="text-xl text-gray-700 font-semibold">{role?.roleName}</h1>
                                                </div>
                                                <ul className="list-none mt-2 px-3 py-4 flex-shrink">
                                                    {
                                                        role?.permissions?.slice(0, 4)?.map?.((perm: any, idx: number) => (
                                                            <li className="flex space-x-2 items-center py-2" key={perm?.name}>
                                                                <div className="w-4 h-4 flex justify-center items-center rounded-full bg-sky-500">
                                                                    <BsCheck className="fill-white" size={16} />
                                                                </div>
                                                                <span>{perm?.name} </span>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>

                                                <Link className="w-full" href={`/role-permissions/${role?.id}`}>
                                                    <button
                                                        className="w-full px-3 py-2 rounded-lg text-white bg-sky-500 hover:bg-sky-600">Kelola {role?.roleName}</button>
                                                </Link>
                                            </div>
                                        </Card>
                                    </SplideSlide>
                                </React.Fragment>
                            ))
                        }
                    </Splide>
                </div>

                <Card className="w-full min-h-[22rem] bg-white">
                    <WorkflowSteps />
                </Card>
            </div>
        </React.Fragment>
    )
};

export default DivisionOfRoles;