import { forwardApiGet } from "@forwards/server/forward.post";
import { NextRequest, NextResponse } from "next/server";  

export async function GET(_req: NextRequest){

    try{
       const result  = await forwardApiGet("master/class");
       return NextResponse.json(result);

    }catch(err: any){
         return NextResponse.json({...err}, { status: 400 })
    }
}