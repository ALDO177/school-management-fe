'use client'

import Card from "@components/card";
import Image from "next/image";
import React, { useActionState, useEffect, useState } from "react"
import { BsEnvelope, BsEye, BsEyeSlash } from 'react-icons/bs';
import { FaLock } from "react-icons/fa6";
import { actionLogin } from "../../directive/servers/action.auth";
import { useRouter } from 'next/navigation';
import { Bounce, toast } from "react-toastify";

export interface PropsAuthLogin {

};

const AuthLogin: React.FC<PropsAuthLogin> = () => {

    const [showPass, setShowPass] = useState<boolean>(false);
    const router = useRouter();

    const [form, setForm] = useState<{ username: string | null, password : string | null}>({
        username: null,
        password: null
    });

    const isButtonSubmited = (form.username && form.username.length > 0 && form.password && form.password.length > 0) as boolean ?? false;

    const headeCard = () => {
        return (
            <h1 className="mt-10 text-2xl text-center font-semibold text-gray-500">LOGIN AKUN</h1>
        )
    };

    const onHandleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        ev.isPropagationStopped();
        const key = ev.target.name;
        setForm((prev) => ({ ...prev, [key]: ev.target.value }))
    };

    const [state, formAction, pending] = useActionState<any, FormData>(actionLogin, null)

    useEffect(() => {
        if(state && state?.login){
            router.replace("/dashboard");
            return;
        };

        if(state && state?.error){
            toast.error("Terjasi Kesalahan Saat Login, Akun Anda belum terdaftar atau email, password anda salah!", {
                position: "top-right",
                autoClose: 3000,
                pauseOnHover: true,
                theme: "colored",
                transition: Bounce
            });
        };

    }, [state])

    return (
        <div className="grid grid-cols-4">
            <div className="col-span-2 bg-[url('/perpus.jpg')] bg-center bg-cover h-screen">
                <div className="flex flex-col justify-center my-5 h-[90svh] items-center">
                    <div className="flex justify-center my-5">
                        <Image
                            className="text-center"
                            src={"/logo-sma.png"}
                            width={140}
                            height={100}
                            alt="logo-SMA" />
                    </div>
                    <div className="w-[35rem]">
                        <div className="w-full backdrop-blur-lg bg-white/10 px-6 py-4 rounded-xl border border-white/20 shadow-lg">
                            <h1 className="text-5xl text-sky-500  text-shadow-2xs text-center uppercase font-semibold">SMA Negeri 2 Samarinda</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-span-2">
                <div className="flex flex-col justify-center h-svh items-center bg-gray-100">
                    <Card
                        headerTemplate={headeCard}
                        bodyClassName="py-8 px-8"
                        className="min-h-[10rem] w-[27rem] bg-white">

                        <form action={formAction}>
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <span className="block mb-2">Username</span>
                                    <div className="inline-block w-full relative">
                                        <span className="absolute top-1/2 left-2 -translate-y-1/2 mr-3">
                                            <BsEnvelope size={18} className="fill-gray-500" />
                                        </span>
                                        <input
                                            placeholder="Username"
                                            value={form.username ?? ""}
                                            type="text"
                                            name="username"
                                            onChange={onHandleChange}
                                            className="pl-9 w-full p-4 rounded-lg focus:outline focus:outline-sky-500 shadow border border-slate-300" />
                                    </div>
                                </div>
                                <div>
                                    <span className="block mb-2">Password</span>
                                    <div className="inline-block relative w-full">

                                        <span className="absolute top-1/2 left-2 -translate-y-1/2 mr-3">
                                            <FaLock size={18} className="fill-gray-500" />
                                        </span>
                                        <input
                                            placeholder="Password"
                                            name="password"
                                            value={form.password ?? ""}
                                            onChange={onHandleChange}
                                            type={showPass ? "text" : "password"}
                                            className="pl-9 w-full invalid:border-pink-500 invalid:text-pink-500 p-4 rounded-lg focus:outline focus:outline-sky-500 active:border-0  shadow border border-slate-300" />

                                        <span className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2" onClick={() => setShowPass((show) => !show)}>
                                            {
                                                showPass ? <BsEye size={18} /> : <BsEyeSlash size={18} />
                                            }
                                        </span>
                                    </div>
                                    <span className="text-xs block float-end my-3">Reset Password!</span>
                                </div>
                                <button
                                    type="submit"
                                    disabled={!isButtonSubmited || pending}
                                    className={`w-full cursor-pointer bg-[linear-gradient(135deg,_#667eea_0%,_#764ba2_100%)] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 focus:shadow-sky-200 text-gray-50 mt-2 rounded-lg p-4`}>
                                     Masuk
                                </button>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    )
};

export default AuthLogin;
