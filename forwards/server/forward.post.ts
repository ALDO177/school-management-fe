'use server'

import axios from "axios"
import { cookies } from "next/headers";

export const forwardLoginPost = async (path: string, body: any, params?: Record<string, string>) => {
    try {
        const post = await axios.post(`${process.env.URL_DOMAIN}/api/${path}`, body, { params, timeout: 300000 });
        return post.data;

    } catch (err: any) {
        if (err?.response) throw err?.response?.data;
        throw err;
    }
}

export const forwardPost = async (path: string, body: any, params?: Record<string, string>) => {

    const cookiesData = await cookies();
    const token = cookiesData.get("token_access")?.value ?? "";
    
    try {
        const post = await axios.post(
            `${process.env.URL_DOMAIN}/api/${path}`, 
            body, 
            { params , timeout: 300000, headers: { Authorization: `Bearer ${token}`} });
        return post.data;

    } catch (err : any) {
        if (err?.response) throw err?.response?.data;
        throw err;
    }
}

export const forwardPatch = async (path: string, body: any, params?: Record<string, string>) => {

    const cookiesData = await cookies();
    const token = cookiesData.get("token_access")?.value ?? "";
    
    try {
        const post = await axios.patch(
            `${process.env.URL_DOMAIN}/api/${path}`, 
            body, 
            { params , timeout: 300000, headers: { Authorization: `Bearer ${token}`} });
        return post.data;

    } catch (err : any) {
        if (err?.response) throw err?.response?.data;
        throw err;
    }
}