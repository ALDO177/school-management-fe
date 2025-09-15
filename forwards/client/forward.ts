import axios from "axios"
import { cookies } from "next/headers";

export const forwardGetApiClient = async(path: string, params?: Record<string, string>) => {
    try{    
        const getData = await axios.get(`/api/${path}`, { params, timeout: 300000 })
        return getData?.data;

    }catch(err: any){
        return err?.response?.data
    }
};

export const forwardPostApiClient = async(path: string, body: any, params?: Record<string, string>) => {
    try{    
        const  forward = await axios.post(`/api/${path}`, body, { params, timeout: 300000 })
        return forward;

    }catch(err: any){
        return err?.response?.data
    }
};

export const forwardPatchApiClient = async(path: string, body: any, params?: Record<string, string>) => {
    try{    
        const  forward = await axios.patch(`/api/${path}`, body, { params, timeout: 300000 })
        return forward;

    }catch(err: any){
        throw err?.response?.data
    }
};

export const forwardDeleteApiClient = async(path: string, body?: any, params?: Record<string, string>) => {
    try{    
        const  forward = await axios.delete(`/api/${path}`, { params, timeout: 300000, data: body });
        return forward;

    }catch(err: any){
        throw err?.response?.data
    }
};