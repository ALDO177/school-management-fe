import { forwardApiPatch, forwardApiPost, forwardPatch, forwardPost } from "@forwards/server/forward.post";

export const actionHomeRoomAssigment = async(initialState: any, formData: FormData) => {

    const body = Object.fromEntries(formData.entries());

    try{
        if(body?.id){   
            const update = await forwardApiPatch(`user-management/home-room-assigment/${body?.id}`, body);
            return { success: true, ...body , ...update };
        }

        const createdPost = await forwardApiPost(`user-management/home-room-assigment`, Array.isArray(body) ? { items: body} : { items: [body]});
        return { success: true, ...body, ...createdPost };

    }catch(err : any){
        console.log(err)
        return { error: true, ...body }
    }
}