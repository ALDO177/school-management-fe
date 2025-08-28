'use client'

import Card from "@components/card";
import { Table } from "@components/table";
import React from "react";


const data = [
    {
        "kolom": "Frekuensi Komunikasi",
        "col1": "Tinggi",
        "col2": "Tinggi",
        "col3": "Sedang",
        "col4": "Tinggi"
    },
    {
        "kolom": "Kualitas Informasi",
        "col1": "Baik",
        "col2": "Baik",
        "col3": "Baik",
        "col4": "Cukup"
    },
    {
        "kolom": "Tindak Lanjut",
        "col1": "Cepat",
        "col2": "Cepat",
        "col3": "Sedang",
        "col4": "Sedang"
    }
]

const Label = ({ keyData, row }: { keyData: keyof typeof data[0], row: any }) => {

    switch (row[keyData]) {

        case "Cepat":
            return <span className="px-3 py-1 bg-green-200 text-green-700 text-center rounded-full">{row[keyData]}</span>;

        case "Tinggi":
            return <span className="px-3 py-1 bg-green-200 text-green-700 text-center rounded-full">{row[keyData]}</span>;

        case "Baik":
            return <span className="px-3 py-1 bg-green-200 text-green-700 text-center rounded-full">{row[keyData]}</span>;

        default:
            return <span className="px-3 py-1 bg-yellow-200 text-yellow-700 text-center rounded-full">{row[keyData]}</span>;
    }
}

const TableMatrixAntarPeran: React.FC = () => {
    return (
        <React.Fragment>
            <Card className="w-full bg-white min-h-[15rem]">
                <div className="grid grid-cols-1 gap-4 px-3 py-2">
                    <h1 className="text-xl font-semibold text-gray-800">Matrix Kordinasi Antar Peran</h1>

                    <Table
                        columns={[
                            {
                                key: "kolom",
                                label: "Kordinasi",
                            },
                            {
                                key: "col1",
                                label: "Guru Wali ↔ Wali Kelas",
                                render(value, row) {
                                    return <Label keyData={"col1"} row={row} />
                                },
                            },
                            {
                                key: "col2",
                                label: "Guru Wali ↔ Guru BK",
                                render(value, row) {
                                    return <Label keyData={"col2"} row={row} />
                                },
                            },
                            {
                                key: "col3",
                                label: "Wali Kelas ↔ Guru BK",
                                render(value, row) {
                                    return <Label keyData={"col3"} row={row} />
                                },
                            },
                            {
                                key: "col4",
                                label: "Tim ↔ Orang Tua",
                                render(value, row) {
                                    return <Label keyData={"col4"} row={row} />
                                },
                            }
                        ]}
                        showGridLine
                        data={data ?? []}
                    />
                </div>
            </Card>
        </React.Fragment>
    )
};

export default TableMatrixAntarPeran;