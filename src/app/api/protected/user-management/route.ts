/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use server'

import { NextRequest, NextResponse } from "next/server";

export async function GET(__: NextRequest) {
    try {
        return NextResponse.json({message : "User Management!"});

    } catch (err: any) {
        return NextResponse.json({ ...err }, { status: 400 })
    }
}