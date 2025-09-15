'use client'

import { useSwrAxios } from "@/hooks/useSwrAxios";
import Card from "@components/card";
import React from "react";
import { FaUsers } from "react-icons/fa6";
import Skeleton from "react-loading-skeleton";

const CountAggregation: React.FC = () => {

    const { data, isLoading } = useSwrAxios("/api/protected/parent-collaboration/count-aggregation", {});

    return (
        <React.Fragment>
            <div className="grid grid-cols-4 gap-3">
                <Card className="w-full transition-all transform hover:-translate-y-1 duration-200 flex flex-col justify-center h-25 bg-white border-l-4 border-l-blue-500">
                    <div className="flex space-x-5 items-center">
                        <div className="w-11 h-11 bg-blue-200 rounded-full flex justify-center items-center">
                            <FaUsers size={30} className="fill-blue-500" />
                        </div>
                        <div>
                            <span className="block text-gray-600 font-semibold">Pesan Hari Ini</span>
                            {
                                isLoading && (
                                    <Skeleton
                                        width={"100%"}
                                        height={'22px'} />
                                )
                            }
                            {
                                !isLoading && (
                                    <h1 className="text-2xl font-bold">{data?.data?.count_message_today}</h1>
                                )
                            }
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
                            {
                                isLoading && (
                                    <Skeleton
                                        width={"100%"}
                                        height={'22px'} />
                                )
                            }
                            {
                                !isLoading && (
                                    <h1 className="text-2xl font-bold">{data?.data?.count_meeting_today}</h1>
                                )
                            }
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
                            {
                                isLoading && (
                                    <Skeleton
                                        width={"100%"}
                                        height={'22px'} />
                                )
                            }
                            {
                                !isLoading && (
                                    <h1 className="text-2xl font-bold">{data?.data?.count_need_not_continue}</h1>
                                )
                            }
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
                            {
                                isLoading && (
                                    <Skeleton
                                        width={"100%"}
                                        height={'22px'} />
                                )
                            }
                            {
                                !isLoading && (
                                    <h1 className="text-2xl font-bold">{Math.round(data?.data?.avg_rating * 10) / 10}</h1>
                                )
                            }
                        </div>
                    </div>
                </Card>
            </div>
        </React.Fragment>
    )
}

export default CountAggregation;