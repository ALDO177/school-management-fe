"use client"

import React from "react";
import SesiSchedule from "./components/component.sesi.schedule";
import WeekSchedule from "./components/component.week.schedule";

const MentoringSchedule: React.FC = () => {
    return (
        <React.Fragment>
            <div className="grid grid-cols-1 gap-5">
                <div>
                    <h1 className="text-3xl font-semibold my-3">Jadwal Pendampingan</h1>
                    <p className="text-gray-600 text-lg">Senin & Jumat Pagi (07:00-08:00) | Jumat Sore (14:00-16:00)</p>
                </div>
                <SesiSchedule/>
                <WeekSchedule/>
            </div>
        </React.Fragment>
    )
};

export default MentoringSchedule;