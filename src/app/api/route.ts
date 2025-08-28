/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from "next/server";;

export async function GET(__: NextRequest){
    return NextResponse.json({ messages: "Hello World "});
}