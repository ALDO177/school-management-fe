import User from "@entity/Users";
import { AppDataSource } from "@lib/db";
import { instancesResponse } from "@lib/instance.responses";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest) {

    try {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }

        const userRepo  = AppDataSource.getRepository(User);
        const user = await userRepo.find(); 

        const payload = instancesResponse({data: user })
        return NextResponse.json({ ...payload }, { status: payload.httpCode ?? 200 });

    } catch (err: any) {
        
        const payloadError = instancesResponse({data: { ...err } ,httpCode: 400 });
        return NextResponse.json({ ...payloadError }, { status: 400 })
    }
}