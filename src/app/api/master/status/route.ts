import EntityMastesStatus from "@entity/MasterStatusStudent";
import { getDataSource } from "@lib/db";
import { instancesResponse } from "@lib/instance.responses";
import { NextRequest, NextResponse } from "next/server";

export async function POST(_req: NextRequest) {

    try {

        const body = await _req.json();
        const dataSource = await getDataSource();

        const repo = dataSource.getRepository(EntityMastesStatus);
        const create = repo.create(Array.isArray(body) ? body : [body]);

        const result = await repo.save(create);
        const instance = instancesResponse({ data: result });

        return NextResponse.json(instance);

    } catch (err: any) {

        return NextResponse.json({ ...err }, { status: 400 })
    }
}

export async function GET(_req: NextRequest) {

    try {

        const query = _req.nextUrl.searchParams;
        const dataSource = await getDataSource();
        const repo = dataSource.getRepository(EntityMastesStatus);

        const result = await repo.find();

        if (query.get("select") && query.get("select") === "true") {
            const resultSelect = result.map((val) => ({ label: val.status_name.toUpperCase(), value: val.status_name }))
            return NextResponse.json(instancesResponse({ data: resultSelect }));
        }

        return NextResponse.json(instancesResponse({ data: result }));

    } catch (err: any) {
        return NextResponse.json({ ...err }, { status: 400 })
    }
}