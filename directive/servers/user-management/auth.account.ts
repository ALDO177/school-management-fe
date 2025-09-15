'use server'

import { forwardApiPatch } from "@forwards/server/forward.post";

export const actionResetupdateAccount = async(initialState: any, formData: FormData) => {

    const body = Object.fromEntries(formData.entries());
    const id   = Number(body?.id);

    delete body?.id;

    try{
        const result = await forwardApiPatch(`user-management/${id}`, body);
        return { success: true, ...result };

    }catch(err: any){

        console.log(err);
        return { error: true, ...err };
    }
}