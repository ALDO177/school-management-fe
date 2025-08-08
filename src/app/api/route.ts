/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from "next/server";
import { AppDataSource } from "../../../lib/db";

export async function GET(__: NextRequest){

    if(!AppDataSource.isInitialized){
        await AppDataSource.initialize();
    }

    return NextResponse.json({ messages: "Hello World "});
}