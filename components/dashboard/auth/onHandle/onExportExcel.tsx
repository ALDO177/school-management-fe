import useGetClass from "@/hooks/useGetClass";
import InputText from "@components/inputext";
import { RefModalHandle } from "@components/modal";
import SelectOption from "@components/select";
import { OptionSelect, UserRole } from "@types_local/common";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver'
import { AnyObject, flattenObject } from "@lib/flaten";

const dataRoles = [
    {
        label: "Siswa",
        value: UserRole.STUDENT
    },
    {
        label: "Guru Wali",
        value: UserRole.HOME_ROOM_ASSIGMENT
    },
    {
        label: "Wali Kelas",
        value: UserRole.HOME_ROOM_TEACHER
    },
    {
        label: "Guru Bk",
        value: UserRole.GUIDENCE_CONSELOR
    }
];

export interface Props {
    refModal: React.RefObject<RefModalHandle | null> | undefined;
}

export const onOpenModalExport = async ({ refModal }: Props) => {

    const ContentModal = () => {

        const [options, setOptions] = useState({ file_name: "", role: "", no_class_id: null });

        const [loading, setLoading] = useState<boolean>(false);

        const onChange = (key: string, value: any) => {
            setOptions((prev) => ({ ...prev, [key]: value }))
        };

        const { classes, loadingClass } = useGetClass()

        const [selectedRole, setSelectedRole] = useState<OptionSelect>();
        const [selectedClass, setSelectedClass] = useState<OptionSelect | null>();

        const exportToExcel = (data: AnyObject[], file_name: string = `export-${new Date().toLocaleTimeString()}`) => {

            // 1. Convert data (array of objects) ke worksheet

            const flatData = data.map((item) => flattenObject(item));
            const worksheet = XLSX.utils.json_to_sheet(flatData);

            // 2. Buat workbook dan append worksheet
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

            // 3. Generate buffer Excel
            const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

            // 4. Simpan file
            const blob = new Blob([excelBuffer], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });

            saveAs(blob, `${file_name}.xlsx`);
        }

        const onExport = async () => {

            setLoading(true);
            try {
                const dataExport = await axios.post("/api/protected/user-management/export-excel", options).then((res) => res.data);
                exportToExcel(dataExport?.data, options.file_name);
                setLoading(false);
                refModal?.current?.close();
            } catch (err: any) {
                setLoading(false);
                toast.error("Terjadi Kesalahan saat melakukan Export!", { autoClose: 2500, type: "error" })
                console.log(err?.responses?.data)
            }
        }

        useEffect(() => {
            if (options.role !== "student") {
                setOptions((prev) => ({ ...prev, no_class_id: null }));
                setSelectedClass(null)
            }
        }, [options.role])

        return (
            <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <span className="block mb-1">Nama File(Optional)</span>
                        <InputText
                            value={options.file_name}
                            onChange={(ev) => onChange("file_name", ev.target.value)}
                            placeholder="Nama File"
                            name="file_name" />
                    </div>
                    <div>
                        <span className="block mb-1">Role</span>
                        <SelectOption
                            value={selectedRole}
                            onChange={(value: any) => {
                                setSelectedRole(value);
                                onChange("role", value.value)
                            }}
                            options={dataRoles}
                            name="role"
                            placeholder={"Role"}
                        />
                    </div>
                </div>
                <div>
                    <span className="block mb-1">Kelas <span className="text-xs">(Kelas akan aktif ketika role yang dipilih adalah siswa)</span></span>
                    <SelectOption
                        isDisabled={!(selectedRole?.value === UserRole.STUDENT)}
                        value={selectedClass}
                        onChange={(value: any) => {
                            setSelectedClass(value);
                            onChange("no_class_id", value.value)
                        }}
                        options={classes}
                        name="no_class_id"
                        placeholder={"Kelas Siswa"}
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={onExport}
                        disabled={loading}
                        className="disabled:bg-blue-500/20 disabled:cursor-not-allowed px-2 py-2 rounded-md min-w-32 bg-blue-500 text-white">
                        Export
                    </button>
                </div>
            </div>
        )
    }

    refModal?.current?.options({
        cardclassName: "bg-white w-[35rem] min-h-[20rem]",
        title: "Export Excel",
        content: <ContentModal />
    });

    refModal?.current?.open();
}