import { forwardPatch, forwardPost } from "@forwards/server/forward.post";

export const actionCreateGuidenceConselor  = async(initialState: any, formData: FormData) => {

    const body = Object.fromEntries(formData.entries());

    console.log(initialState, body);
    return {}

    try{
        if(body?.id){
            const update = await forwardPatch(`protected/user-management/guidence-conselor`, body);
            return { success: true, ...body, ...update }
        }

        const create = await forwardPost(`protected/user-management/guidence-conselor`, body);
        return { success: true , ...body, ...create };

    }catch(err: any){
        

        return { error: true, ...body }; 
    }
}