'use server'

import { forwardApiPatch, forwardApiPost } from "@forwards/server/forward.post";

export const actionHomeRoomTeacherForm = async(initialState: any, formData: FormData) => {

    const body = Object.fromEntries(formData.entries());

    try{

        if(body?.id){
            const update = await forwardApiPatch(`user-management/home-room-teacher/${body?.id}`, body);
            return { success: true, ...body, ...update }
        }
        const createPost = await forwardApiPost("user-management/home-room-teacher", Array.isArray(body) ? { items: body } : { items: [body]})
        return { success: true, ...body, ...createPost.data };

    }catch(err: any){
        console.log(err)
        return {error: true, message: err?.message, ...body } 
    }
}