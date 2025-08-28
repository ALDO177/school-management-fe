'use client'

import Card from "@components/card";
import { Tabs } from "@components/tabs";
import React from "react";
import TableSiswa from "./components/component.table.siswa";
import GuruWali from "./components/component.guru.wali";
import GuruBk from "./components/component.guru.bk";
import GuruWaliKelas from "./components/component.guru.walikelas";

const UserManagement: React.FC = () => {

    return (
        <React.Fragment>
            <div className="grid grid-cols-1 gap-5">
                <div>
                    <h1 className="text-3xl font-semibold my-3">Data Management</h1>
                    <p className="text-gray-600 text-lg">Kelola data guru dan siswa secara terintegrasi</p>
                </div>

                <Card className="w-full bg-white py-4">
                    <Tabs
                        tabs={[
                            { label: "Data Siswa", content: <TableSiswa/> },
                            { label: "Guru Wali", content: <GuruWali/> },
                            { label: "Guru BK", content: <GuruBk/> },
                            { label: "Wali Kelas", content: <GuruWaliKelas/>}
                        ]}
                    />
                </Card>
            </div>
        </React.Fragment>
    )
};

export default UserManagement;