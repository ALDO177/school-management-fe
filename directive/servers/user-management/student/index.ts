'use server'

import { forwardPatch, forwardPost } from "@forwards/server/forward.post";

export const actionCreateStudent = async (initialState: any, formData: FormData) => {

    const body = Object.fromEntries(formData.entries());
    try {

        if(body?.id){
            const update = await forwardPatch("protected/user-management/student", body);
            return { success: true, ...body, ...update }
        }

        const createPost = await forwardPost(`protected/user-management/student`, body);
        return { success: true, ...body, ...createPost.data };

    } catch (err:any) {

        console.log(err);
        return { ...body, error: true, ...err?.response?.data }
    }
}