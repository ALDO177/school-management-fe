'use client'

import InputText from "@components/inputext";
import InputPassword from "@components/password";
import { actionResetupdateAccount } from "@directive/servers/user-management/auth.account";
import React, { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

interface Props {
    data: any;
    onCloseModal : () => void;
    mutate: () => void | Promise<void>;
}

const FormEdit: React.FC<Props> = ({ data, mutate,onCloseModal }) => {

    const [result, formAction, isLoading] = useActionState<any, FormData>(actionResetupdateAccount, {
        name: data?.name ?? null,
        username: data?.username ?? "",
        new_password: data?.password_raw
    });

    useEffect(() => {   

        if(result?.success){
            onCloseModal();
            toast.success("Update Akun Berhasil", { type: "success", autoClose: 2500 });
            mutate();
        }

        if(result?.error){
            onCloseModal()
            toast.error("Update Akun Gagal!", { type: "error", autoClose: 2500 });
        }

    }, [result])

    return (
        <React.Fragment>
            <form action={formAction}>
                <div className="grid grid-cols-1 gap-4">

                    <InputText 
                        type="hidden" 
                        name="id" 
                        defaultValue={data?.id}/>

                    <div>
                        <span className="block mb-1">Nama Lengkap</span>
                        <InputText
                            defaultValue={result.name}
                            name="name"
                            placeholder="Nama"
                        />
                    </div>
                    <div>
                        <span className="block mb-1">Username</span>
                        <InputText
                            defaultValue={result.username}
                            name="username"
                            placeholder="Username"
                        />
                    </div>
                     <div>
                        <span className="block mb-1">Password</span>
                        <InputPassword 
                            name="new_password"
                            className="px-4 py-4"
                            defaultValue={result.new_password}
                            placeholder="Password"/>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full px-2 py-3 cursor-pointer hover:bg-sky-600 text-white bg-sky-500 rounded-md">
                        Update
                    </button>
                </div>
            </form>
        </React.Fragment>
    )
};

export default FormEdit;