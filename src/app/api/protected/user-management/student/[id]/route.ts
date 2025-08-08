import { EntityStudent } from "@entity/Students";
import { getDataSource } from "@lib/db";
import { instancesResponse } from "@lib/instance.responses";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, { params } : { params : Promise<{ id : number }>}) {

    try {

        const { id } = await params;
        
        const dataSource = await getDataSource();
        const repo = dataSource.getRepository(EntityStudent);

        const findById = await repo.findOne({ where: { id }});
        const result = instancesResponse({ data: findById });
        return NextResponse.json(result);

    } catch (err: any) {

        return NextResponse.json({ ...err }, { status: 400 });
    }
}