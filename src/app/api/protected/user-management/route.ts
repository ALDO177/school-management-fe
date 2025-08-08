/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use server'

import User from "@entity/Users";
import { getDataSource } from "@lib/db";
import { instancesResponse } from "@lib/instance.responses";
import { NextRequest, NextResponse } from "next/server";

export async function GET(__: NextRequest) {

    try {
        const dataSource = await getDataSource();
        const userRepo  = dataSource.getRepository(User);
        const user = await userRepo.find(); 

        const payload = instancesResponse({data: user })
        return NextResponse.json({ ...payload }, { status: payload.httpCode ?? 200 });

    } catch (err: any) {
        console.log(err);
        const payloadError = instancesResponse({data: { ...err } ,httpCode: 400 });
        return NextResponse.json({ ...payloadError }, { status: 400 })
    }
}