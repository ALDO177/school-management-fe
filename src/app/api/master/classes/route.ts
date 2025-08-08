import EntityMasterClass from "@entity/MasterClass";
import { getDataSource } from "@lib/db";
import { instancesResponse } from "@lib/instance.responses";
import { NextRequest, NextResponse } from "next/server";

export async function POST(_req: NextRequest){

    try{

        const body = await _req.json();
        const dataSource = await getDataSource();
        const repoMasterClass = dataSource.getRepository(EntityMasterClass);

        const create = repoMasterClass.create(Array.isArray(body) ? body : [body]);
        const result = await repoMasterClass.save(create);

        return NextResponse.json(
            instancesResponse({ data: result })
        )

    }catch(err: any){

        return NextResponse.json({...err}, { status: 400 })
    }
}

export async function GET(_req: NextRequest){

    try{

        const dataSource = await getDataSource();
        const repoMasterClass = dataSource.getRepository(EntityMasterClass);

        const result = await repoMasterClass.find();

        const instance = instancesResponse({ data: result.map((data) => ({ label: data?.class_name, value: data?.class_name?.toLowerCase() })) });
        return NextResponse.json(instance);

    }catch(err: any){
         return NextResponse.json({...err}, { status: 400 })
    }
}