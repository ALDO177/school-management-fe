/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use server'

import { EntityHomeRoomTeacher } from "@entity/HomeRoomTeacher";
import User from "@entity/Users";
import { getDataSource } from "@lib/db";
import { instancesResponse } from "@lib/instance.responses";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest) {
    
    try {
        const dataSource = await getDataSource();
        const repo = dataSource.getRepository(EntityHomeRoomTeacher);
        const query = await repo
            .createQueryBuilder("home_room_teachers")
            .leftJoin(User, "users", "users.home_room_teacher_id = home_room_teachers.id")
            .select([
                'home_room_teachers.id as id',
                "users.id as user_id",
                'users.username AS username',
                'home_room_teachers.fullname as fullname',
                'home_room_teachers.email as email',
                'home_room_teachers.nip as nip',
                'home_room_teachers.subjects as subjects',
                'home_room_teachers.experience as experience', 
                "users.role as role",
                "users.status as status",
                "users.last_login as last_login",
                "users.remember_token as remember_token"
            ])
            .getRawMany()

        const result = instancesResponse({ data: query })
        return NextResponse.json(result, { status: 200 });

    } catch (err: any) {
        console.log(err);
        return NextResponse.json({ ...err }, { status: 400 });
    }
}