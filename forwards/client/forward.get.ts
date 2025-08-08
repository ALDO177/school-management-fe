import axios from "axios"
import { cookies } from "next/headers";


export const forwardGetApi = async(path: string, params?: Record<string, string>) => {
    try{    
        const getData = await axios.get(`/api/${path}`, { params, timeout: 300000 });
        return getData?.data;

    }catch(err: any){
        return err?.response?.data
    }
}