/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use server'

import { EntityHomeRoomTeacher } from "@entity/HomeRoomTeacher";
import { getDataSource } from "@lib/db";
import { instancesResponse } from "@lib/instance.responses";
import { NextRequest, NextResponse } from "next/server";

export async function POST(_req: NextRequest) {
    try {

        const body = await _req.json();
        const dataSource = await getDataSource();
        const repo = dataSource.getRepository(EntityHomeRoomTeacher);
        
        const create = repo.create([body]);
        const result = await repo.save(create);

        return NextResponse.json(result, { status: 200 })

    } catch (err: any) {
        return NextResponse.json({ ...err }, { status: 400 });
    }
}

export async function GET(_req: NextRequest) {

    try {
        const dataSource = await getDataSource();
        const repo = dataSource.getRepository(EntityHomeRoomTeacher);
        const find = await repo.find();

        const result = instancesResponse({ data: find })
        return NextResponse.json(result, { status: 200 });

    } catch (err: any) {
        console.log(err);
        return NextResponse.json({ ...err }, { status: 400 });
    }
}