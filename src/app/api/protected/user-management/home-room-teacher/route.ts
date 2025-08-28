/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use server'

import { forwardApiDelete, forwardApiPatch, forwardApiPost } from "@forwards/server/forward.post";;
import { NextRequest, NextResponse } from "next/server";

export async function POST(_req: NextRequest) {
    const body = await _req.json();
    try {

        const result = await forwardApiPost("user-management/home-room-teacher", Array.isArray(body) ? { items: body } : { items: [body]})
        return NextResponse.json(result, { status: 200 })

    } catch (err: any) {
        console.log(err);
        return NextResponse.json({ ...err }, { status: 400 });
    }
}

export async function PATCH(_req: NextRequest){

    const body = await _req.json();

    try{
         const result = await forwardApiPatch("user-management/home-room-teacher", body);
         return NextResponse.json(result)

    }catch(err: any){
        console.log(err);
        return NextResponse.json({ ...err }, { status: 400 });
    }
}

export async function DELETE(_req: NextRequest){

    const body = await _req.json();

    try{
        const result = await forwardApiDelete("user-management/home-room-teacher", body);
        return NextResponse.json(result);

    }catch(err: any){
        console.log(err);
        return NextResponse.json({...err}, { status: 400})
    }
}