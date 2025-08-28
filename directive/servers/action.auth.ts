'use server'

import axios from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const actionLogin = async (initialState: any, formData: FormData) => {

    try {

        const cookie_header = await cookies();
        const body = Object.fromEntries(formData.entries());
        
        const { data } = await axios.post(`${process.env.API_URL_V1}/auth/sign-in`, body);
        const token_access = data?.data?.access_token;

        cookie_header.set("token_access", token_access, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 720, // 30 hari
        });
        return { login: true }

    } catch (err: any) {
        return { error: true, ...err?.response?.data };
    }
}

export const actionLogout = async() => {

    const cookie = await cookies();
    cookie.delete("token_access");
    return redirect('/login');
}