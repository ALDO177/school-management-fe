'use client'

import { useSwrAxios } from "@/hooks/useSwrAxios";
import Card from "@components/card";
import React, { useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import ScheduleManagement from "./component.schedule.management";
import { DashboardContext } from "@context/dashboard.context";
import TableGuruPendamping from "./component.table.guru.pendamping";

const WeekSchedule: React.FC = () => {

    const [dataToday, setToday] = useState<Record<string, string | number>>({
        total_assigments: "0",
        teacher_total_active: 0
    });

    const { refModal } = useContext(DashboardContext)

    const date  = new Date();
    const today = date.getDay() + 1 ;

    const { data, isLoading, mutate } = useSwrAxios('/api/protected/days');

    useEffect(() => {
        if(data && !isLoading){
            const todayDataFilter  = data?.data?.find((data: any) => data.id === today);
            const teacher_total_active = todayDataFilter?.schedules?.reduce((acc: any, item: any) => {
                return acc + Number(item?.total_assigments)
            }, 0) ?? "0";

            const sessi_today = todayDataFilter?.schedules?.length ?? 0;
            setToday((prev) => ({ sessi_today, teacher_total_active }))
        }
    }, [data, isLoading]);

    const onModalOpen = async(row: any) => {
        refModal?.current?.options({
            cardclassName: "w-[60%] bg-white min-h-[10rem] h-auto",
            title: "Sessi Pendamping",
            content: (
                <TableGuruPendamping id={row?.id} row={row}/>
            )
        });

        refModal?.current?.open()
    }

    return (
       <React.Fragment>
         <Card className="w-full bg-white">
            <h1 className="text-xl font-semibold my-3">Kalender Mingguan</h1>
            <div className="grid grid-cols-7 gap-2">
                {
                    isLoading && (
                        <>
                            {
                                Array.from({ length: 7 }).map((__, idx) => (
                                    <div key={idx}>
                                        <Skeleton height={"8rem"} width={"100%"} />
                                    </div>
                                ))
                            }
                        </>
                    )
                }
                {
                    data?.data?.map((week: any, idx: number) => (
                        <div key={idx} className="cursor-pointer" onClick={() => onModalOpen(week)}>
                            <h1 className="text-center mb-2 font-semibold text-gray-500">{week?.name}</h1>
                            <div className={`w-full px-3 py-2 h-[8rem] max-h-[8rem] hover:bg-sky-500/20 hover:ring-2 ring-sky-500/40 overflow-y-scroll disabled-scrool rounded-lg ${week?.id === today ? "bg-sky-500/20 ring-2 ring-sky-500/40" : "bg-gray-100"}`}>
                                {
                                    week?.id == 1 || week?.id == 7 ? (
                                        <div className="flex justify-center items-center h-full">
                                            <h1 className="text-xl text-center text-gray-400">LIBUR</h1>
                                        </div>
                                    )
                                        :
                                        (
                                            <div className="w-full h-full">
                                                {
                                                    week?.items?.length < 1 && (
                                                        <div className="flex justify-center items-center h-full">-</div>
                                                    )
                                                }
                                                <ul className="list-none space-y-2">
                                                    {
                                                        week?.schedules?.map((data: any, idx: number) => (
                                                            <li key={idx} className="text-sm text-white text-center w-full px-3 py-2 rounded-md bg-blue-400">
                                                                {data?.start_time} - {data?.end_time}
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                        )
                                }

                            </div>
                        </div>
                    ))
                }
            </div>
        </Card>
         <ScheduleManagement 
            data={dataToday} 
            onClose={refModal?.current?.close} 
            mutate={mutate}/>
       </React.Fragment>
    )
};

export default WeekSchedule;