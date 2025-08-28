// components/Table.tsx
import Spinner from "@components/spiner";
import React from "react";

type Column<T> = {
    key: keyof T;
    label: string;
    render?: (value: any, row: T) => React.ReactNode;
};

type TableProps<T> = {
    columns: Column<T>[];
    data: T[];
    showGridLine?: boolean;
    isLoading?: boolean;
};

export function Table<T extends Record<string, any>>({ columns, data, showGridLine = false, isLoading = false }: TableProps<T>) {
    return (
        <div className="overflow-x-auto w-full  bg-transparent">
            <table
                className={`w-full text-left text-sm text-gray-700 ${showGridLine ? "border-separate border-spacing-0" : ""}`}>
                <thead>
                    <tr className="bg-gray-100 text-gray-700 uppercase text-xs">
                        {columns.map((col) => (
                            <th
                                key={String(col.key)}
                                className={`px-4 py-5 font-medium ${showGridLine ? "border-b border-gray-300" : ""
                                    }`}>
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {
                        isLoading && (
                            <tr>
                                <td
                                    className="py-5"
                                    colSpan={columns.length}
                                    style={{ textAlign: "center" }}>
                                    <div className="flex justify-center flex-col gap-2">
                                        <Spinner/>
                                        <h1>Loading...</h1>
                                    </div>
                                </td>
                            </tr>
                        )
                    }
                    {
                        data.length < 1 && !isLoading && (
                            <tr>
                                <td
                                    className="py-5"
                                    colSpan={columns.length}
                                    style={{ textAlign: "center" }}>
                                    Data Kosong...
                                </td>
                            </tr>
                        )
                    }
                    {
                        data.length > 0 && !isLoading && (
                            <>
                                {data.map((row, idx) => (
                                    <tr
                                        key={idx}
                                        className={`hover:bg-blue-200/20`}>
                                        {columns.map((col) => {
                                            const value = col.key.toString().split('.').reduce((acc, key) => acc?.[key], row);
                                            return (
                                                <td key={String(col.key)} className={`px-4 py-5 ${idx < data.length - 1 && showGridLine ? "border-b border-gray-200" : ""}`}>
                                                    {col.render ? col.render(value as any, row) : value as any}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                ))}
                            </>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}
