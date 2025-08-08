'use server'

import { EntityHomeRoomTeacher } from "@entity/HomeRoomTeacher";
import { EntityStudent } from "@entity/Students";
import { getDataSource } from "@lib/db";
import { instancesResponse } from "@lib/instance.responses";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {

        const body = await req.json();
        const dataSource = await getDataSource();
        const repo = dataSource.getRepository(EntityStudent);
        const create = repo.create(Array.isArray(body) ? body : [body]);

        const saved = await repo.save(create);

        const result = instancesResponse({ data: saved });
        return NextResponse.json(result, { status: 200 });

    } catch (err: any) {
        return NextResponse.json({ ...err }, { status: 400 })
    }
}

export async function DELETE(req: NextRequest) {

    try {

        const body = await req.json();
        const dataSource = await getDataSource();
        const repo = dataSource.getRepository(EntityStudent);

        const removed = await repo.remove(Array.isArray(body) ? body : [body]);
        const result = instancesResponse({ data: { removed } });
        return NextResponse.json(result);


    } catch (err: any) {
        return NextResponse.json({ ...err }, { status: 400 });
    }
}

export async function GET(req: NextRequest) {
    try {

        const urlSeacrhParam = req.nextUrl.searchParams;

        const page = Number(urlSeacrhParam.get("page") ?? "1");
        const limit = Number(urlSeacrhParam.get("limit") ?? "1");
        const skip = (page - 1) * limit;

        const search = urlSeacrhParam.get("search") ?? "";

        const dataSource = await getDataSource();
        const repo = dataSource.getRepository(EntityStudent);
        const find = repo
            .createQueryBuilder("students")
            .leftJoin(
                EntityHomeRoomTeacher,
                "home_room_teachers",
                "home_room_teachers.id = students.id"
            )
            .select([
                "students.id as id",
                "students.nama as student_name",
                "students.nisn as nisn",
                "students.no_class as no_class",
                "students.address as address",
                "students.phone_number as phone_number",
                "students.status as status",
                "home_room_teachers.fullname as fullname_teacher",
                "home_room_teachers.id as home_room_teacher_id",
                "home_room_teachers.subjects as subjects",
                "students.created_at as created_at",
                "students.updated_at as updated_at"
            ])
            .orderBy("students.id", "DESC")
            .offset(skip)
            .limit(limit)

        if (search.trim() !== '') {
            find
                .where("LOWER(students.nama) LIKE :search", { search: `%${search.toLowerCase()}%` })
                .orWhere("LOWER(students.nisn) LIKE :search", { search: `%${search.toLocaleLowerCase()}%` })
        }

        const total_count = await repo.createQueryBuilder("students").getCount();

        const result = instancesResponse(
            {
                data: {
                    page,
                    limit,
                    total_count,
                    total_pages: Math.ceil(total_count / limit),
                    items: await find.getRawMany()
                }
            }
        );

        return NextResponse.json(result, { status: 200 });

    } catch (err: any) {
        console.log(err);
        return NextResponse.json({ ...err }, { status: 400 })
    }
}

export async function PATCH(req: NextRequest) {

    try {

        const body = await req.json();
        const dataSource = await getDataSource();
        const repo = dataSource.getRepository(EntityStudent);

        const result = await repo.update({ id: Number(body?.id) }, body);

        const instance = instancesResponse({data: result });

        return NextResponse.json(instance)

    } catch (err: any) {

        return NextResponse.json({ ...err }, { status: 400 });
    }
}