import { forwardApiDelete } from "@forwards/server/forward.post";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params } : { params:  Promise<{ id: number }>}){

    const { id } = await params;

    try{
        const result = await forwardApiDelete(`user-management/${id}`, null);
        return NextResponse.json(result);

    }catch(err: any){
        console.log(err)
        return NextResponse.json({ ...err?.response?.data }, { status: 400 });
    }
}