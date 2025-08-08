'use server'

import { forwardLoginPost } from '@forwards/server/forward.post';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const actionLogin = async (initialState: any, formData: FormData) => {

    try {

        const cookie_header = await cookies();
        const body = Object.fromEntries(formData.entries());
        const loginAuth = await forwardLoginPost('auth/login', body);

        const token_access = loginAuth?.data?.token;
        cookie_header.set("token_access", token_access, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 720, // 30 hari
        });

        return { login: true }


    } catch (err) {
        return err;
    }
}

export const actionLogout = async() => {

    const cookie = await cookies();
    cookie.delete("token_access");
    return redirect('/login');
}