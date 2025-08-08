import { EntityHomeRoomTeacher } from "@entity/HomeRoomTeacher";
import { getDataSource } from "@lib/db";
import { instancesResponse } from "@lib/instance.responses";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    try {

        const urlSeacrhParam = req.nextUrl.searchParams;

        const page = Number(urlSeacrhParam.get("page") ?? "1");
        const limit = Number(urlSeacrhParam.get("limit") ?? "20");
        const skip = (page - 1) * limit;

        const search = urlSeacrhParam.get("search") ?? "";

        const dataSource = await getDataSource();
        const repo = dataSource.getRepository(EntityHomeRoomTeacher);

        const query = repo
            .createQueryBuilder("teacher")
            .leftJoin("students", "student", "student.home_room_teacher_id = teacher.id")
            .select([
                "teacher.id AS id",
                "teacher.email AS email",
                "teacher.fullname AS fullname",
                "teacher.nip AS nip",
                "teacher.subjects AS subjects",
                "teacher.experience AS experience",
                "COUNT(student.id) AS total_students",
                "teacher.updated_at AS updated_at",
                "teacher.created_at AS created_at"
            ])
            .groupBy("teacher.id")
            .addGroupBy("teacher.fullname")
            .offset(skip)
            .limit(limit)

        if (search.trim() !== '') {
            query
                .where("LOWER(teacher.fullname) LIKE :search", { search: `%${search.toLowerCase()}%` })
                .orWhere("LOWER(teacher.nip) LIKE :search", { search: `%${search.toLocaleLowerCase()}%` })
        }

        const total_count = await repo.createQueryBuilder().getCount();

        const instances = instancesResponse({
            data: {
                page,
                limit,
                total_count,
                total_pages: Math.ceil(total_count / limit),
                items: await query.getRawMany()
            }
        });

        return NextResponse.json(instances);

    } catch (err: any) {

        return NextResponse.json({ ...err }, { status: 400 })
    }
}