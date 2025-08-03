import { NextRequest, NextResponse } from "next/server";
import { compare } from 'bcrypt'
import { AppDataSource } from "@lib/db";
import User from "@entity/Users";
import { instancesResponse } from "@lib/instance.responses";
import jwt from 'jsonwebtoken';

export async function POST(_req: NextRequest){
    try{

        const { username, password } = await _req.json();

        if(!AppDataSource.isInitialized){
            await  AppDataSource.initialize();
        }

        const userRepo = AppDataSource.getRepository(User);
        const JWT_SECRET = process.env.JWT_SECRET!;

        const user = await userRepo.findOne({
            where: { username },
            select: ["username", "password" , "role", "name"]
        });

        if(!user || !(await compare(password, user.password))){
            const payloadError = instancesResponse({message: "Unauthorized!", httpCode: 401 });
            return NextResponse.json({...payloadError}, { status: payloadError?.httpCode ?? 401 });
        };

        const token   = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "30days" })
        const payload = instancesResponse({ data: { ...user,  token }, message: "Login Success!"})
        return NextResponse.json({ ...payload });

    }catch(err: any){

        return NextResponse.json({...err}, { status: 400 })
    }
}