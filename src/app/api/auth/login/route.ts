/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from "next/server";
import { compare } from 'bcrypt'
import { getDataSource } from "@lib/db";
import User from "@entity/Users";
import { instancesResponse } from "@lib/instance.responses";
import { EntitySessionToken } from "@entity/SessionToken";

export async function POST(_req: NextRequest){
    try{

        const { username, password } = await _req.json();

        const dataSource = await getDataSource();
        const userRepo   = dataSource.getRepository(User);

        const user = await userRepo.findOne({
            where: { username },
            select: ["username", "password" , "role", "name"]
        });

        if(!user || !(await compare(password, user.password))){
            const payloadError = instancesResponse({message: "Unauthorized!", httpCode: 401 });
            return NextResponse.json({...payloadError}, { status: payloadError?.httpCode ?? 401 });
        };

        const bytes = crypto.getRandomValues(new Uint8Array(16));
        const token = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
        
        const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);

        const sessionRepoToken = dataSource.getRepository(EntitySessionToken);
        const createSessionToken = sessionRepoToken.create([
            {
                session_token: token,
                expiresAt,
                user_id: user.id,
                last_user_login: new Date()
            } as any
        ]);

        await sessionRepoToken.save(createSessionToken);
        
        const payload = instancesResponse({ data: { ...user, token, expiresAt }, message: "Login Success!"})
        return NextResponse.json({ ...payload });

    }catch(err: any){

        return NextResponse.json({...err}, { status: 400 })
    }
}