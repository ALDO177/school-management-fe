import { NextResponse } from "next/server";
import { AppDataSource } from "../../../lib/db";

export async function GET(){

    if(!AppDataSource.isInitialized){
        await AppDataSource.initialize();
    }

    return NextResponse.json({ messages: "Hello World "});
}