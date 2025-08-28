'use server'

import { forwardApiPatch, forwardApiPost } from "@forwards/server/forward.post";

export const actionCreateStudent = async (initialState: any, formData: FormData) => {

    const body = Object.fromEntries(formData.entries());
    
    try {
        if(body?.id){

            console.log(body)
            const update = await forwardApiPatch(`user-management/student/${body?.id}`, body);
            return { success: true, ...body, ...update }
        }

        const createPost = await forwardApiPost(`user-management/student`, Array.isArray(body) ? { items: body } : { items: [body]});
        return { success: true, ...body, ...createPost.data };

    } catch (err:any) {

        console.log(err);
        return { ...body, error: true, ...err?.response?.data }
    }
}