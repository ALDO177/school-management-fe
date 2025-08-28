/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use server'
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest) {
    
    try {
        return NextResponse.json({}, { status: 200 });

    } catch (err: any) {
        console.log(err);
        return NextResponse.json({ ...err }, { status: 400 });
    }
}