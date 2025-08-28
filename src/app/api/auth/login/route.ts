import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(_req: NextRequest){
    try{
        const { username, password } = await _req.json();
        const { data } = await axios.post(`${process.env.API_URL_V1}/auth/sign-in`);
        return NextResponse.json({});

    }catch(err: any){

        return NextResponse.json({...err}, { status: 400 })
    }
}