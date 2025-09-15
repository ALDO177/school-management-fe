'use server'

import axios from "axios"
import { cookies } from "next/headers";

const APP_URL = process.env.VERCEL_URL || process.env.URL_DOMAIN;

export const forwardLoginPost = async (path: string, body: any, params?: Record<string, string>) => {
    try {
        const post = await axios.post(`${APP_URL}/api/${path}`, body, { params, timeout: 300000 });
        return post.data;

    } catch (err: any) {
        if (err?.response) throw err?.response?.data;
        throw err;
    }
}

export const forwardApiGet = async (path: string, params?: Record<string, string>) => {

    const cookiesData = await cookies();
    const token = cookiesData.get("token_access")?.value ?? "";

    try {
        const post = await axios.get(
            `${process.env.API_URL_V1}/${path}`,
            { params, timeout: 300000, headers: { Authorization: `Bearer ${token}` } });
        return post.data;

    } catch (err: any) {
        if (err?.response) throw err?.response?.data;
        throw err;
    }
}

export const forwardApiPost = async (path: string, body: any, params?: Record<string, string>) => {

    const cookiesData = await cookies();
    const token = cookiesData.get("token_access")?.value ?? "";

    try {
        const { data } = await axios.post(
            `${process.env.API_URL_V1}/${path}`,
            body,
            { params, timeout: 300000, headers: { Authorization: `Bearer ${token}` } });

        return data;

    } catch (err: any) {
        if (err?.response) throw err?.response?.data;

        console.log(err?.response?.data)
        throw err;
    }
}

export const forwardApiDelete = async (path: string, body: any, params?: Record<string, string>) => {

    const cookiesData = await cookies();
    const token = cookiesData.get("token_access")?.value ?? "";

    try {
        const { data } = await axios.delete(
            `${process.env.API_URL_V1}/${path}`,
            {
                params,
                timeout: 300000,
                data: body,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        return data;

    } catch (err: any) {
        if (err?.response) throw err?.response?.data;
        throw err;
    }
}

export const forwardApiPatch = async (path: string, body: any, params?: Record<string, string>) => {

    const cookiesData = await cookies();
    const token = cookiesData.get("token_access")?.value ?? "";

    try {
        const { data } = await axios.patch(
            `${process.env.API_URL_V1}/${path}`,
            body,
            {
                params,
                timeout: 300000,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        return data;

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
            `${APP_URL}/api/${path}`,
            body,
            { params, timeout: 300000, headers: { Authorization: `Bearer ${token}` } });
        return post.data;

    } catch (err: any) {
        if (err?.response) throw err?.response?.data;
        throw err;
    }
}

export const forwardPatch = async (path: string, body: any, params?: Record<string, string>) => {

    const cookiesData = await cookies();
    const token = cookiesData.get("token_access")?.value ?? "";

    try {
        const post = await axios.patch(
            `${APP_URL}/api/${path}`,
            body,
            { params, timeout: 300000, headers: { Authorization: `Bearer ${token}` } });
        return post.data;

    } catch (err: any) {
        if (err?.response) throw err?.response?.data;
        throw err;
    }
}