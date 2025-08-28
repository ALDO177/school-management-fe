'use client'

import Card from "@components/card"
import ProgressBar from "@ramonak/react-progress-bar";
import React from "react";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from 'recharts'

const data_chart = [
    {
        name: "Jan",
        value: 40
    },
    {
        name: "Feb",
        value: 50
    },
    {
        name: "Mar",
        value: 60
    },
    {
        name: "Apr",
        value: 70
    },
    {
        name: "Mei",
        value: 80
    },
    {
        name: "Jun",
        value: 90
    }
];

const GrafikMonitorTrend: React.FC = () => {

    const GTag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
        <g>{children}</g>
    );

    const BarRound = (props: any) => {

        const { x, y, width, height, value, background } = props;

        return (
            <React.Fragment>
                <GTag>
                    <g>
                        <rect
                            x={x}
                            y={y}
                            width={width}
                            height={height}
                            rx={5}
                            ry={5}
                            fill={"oklch(62.3% 0.214 259.815)"} />
                        <text
                            x={x + width / 2}
                            y={y - 7}
                            fill={background}
                            fontSize={14}
                            fontWeight={"bold"}
                            textAnchor="middle"
                            dominantBaseline="middle">
                            {String(value)}
                        </text>
                    </g>
                </GTag>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <div className="grid grid-cols-2 gap-3">
                <Card className="w-full bg-white min-h-[15rem]">
                    <h1 className="mb-3 text-xl font-semibold">Trend Koordinasi Bulanan</h1>
                    <ResponsiveContainer width={"100%"} height={250}>
                        <BarChart
                            data={data_chart}
                            barSize={35}
                            margin={{ top: 10, right: 0, left: 0, bottom: 5 }}>
                            <Tooltip />
                            <XAxis
                                fontSize={10}
                                fontWeight={"bold"}
                                name="name"
                                strokeWidth={1.5}
                                stroke="oklch(62.3% 0.214 259.815)"
                                dataKey={"name"} />
                            <CartesianGrid strokeWidth={0.4} strokeDasharray={"2 2"} />
                            <Bar
                                shape={(props: any) => <BarRound {...props} background={"oklch(62.3% 0.214 259.815)"} />}
                                dataKey={"value"}
                                fill="oklch(62.3% 0.214 259.815)"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
                <Card className="w-full bg-white min-h-[15rem]">
                    <h1 className="mb-3 text-xl font-semibold">Distribusi Kasus</h1>
                    <div className="grid grid-cols-1 gap-5">
                        <div className="flex justify-between items-center">
                            <span>Akademik</span>
                            <ProgressBar
                                completed={45}
                                width="200px"
                                labelSize="12px"
                                bgColor="oklch(62.3% 0.214 259.815)"
                                height="12px"
                                isLabelVisible={false}
                                maxCompleted={100} />
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Prilaku</span>
                            <ProgressBar
                                completed={30}
                                width="200px"
                                labelSize="12px"
                                bgColor="oklch(70.5% 0.213 47.604)"
                                height="12px"
                                isLabelVisible={false}
                                maxCompleted={100} />
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Sosial</span>
                            <ProgressBar
                                completed={15}
                                width="200px"
                                labelSize="12px"
                                bgColor="oklch(72.3% 0.219 149.579)"
                                height="12px"
                                isLabelVisible={false}
                                maxCompleted={100} />
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Karir</span>
                            <ProgressBar
                                completed={10}
                                width="200px"
                                labelSize="12px"
                                isLabelVisible={false}
                                bgColor="oklch(62.7% 0.265 303.9)"
                                height="12px"
                                maxCompleted={100} />
                        </div>
                    </div>
                </Card>
            </div>

        </React.Fragment>
    )
};

export default GrafikMonitorTrend;