/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from "next/server";
import { AppDataSource } from "@lib/db";
import { UserCreateDto } from "@dto/user/create.dto";
import { validateBody } from "@lib/validate.body";
import User from "@entity/Users";
import { instancesResponse } from "@lib/instance.responses";

export async function POST(_req: NextRequest) {
    try {

        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        };

        const body = await _req.json();
        const [data, errors] = await validateBody<any>(UserCreateDto as any, body);

        if (errors.length > 0) {
            return NextResponse.json({ message: 'Validation failed', errors }, { status: 400 });
        }

        const userDb = AppDataSource.getRepository(User);

        const createUser = userDb.create([data]);
        const payloadCreate = await userDb.save(createUser);    

        const payload = instancesResponse({ data: payloadCreate });
        return NextResponse.json({ ...payload }, { status: 200 });

    } catch (err: any) {

        const payloadError  = instancesResponse({ message: "Error", data: {...err}, httpCode: 400 })
        return NextResponse.json({ ...payloadError }, { status: 400 })
    }
}