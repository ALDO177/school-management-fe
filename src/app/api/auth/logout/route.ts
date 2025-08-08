
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(_req: NextRequest) {

    try {
        (await cookies()).delete("token_access");
        return NextResponse.json({ logout: "success" });

    } catch (err: any) {
        return NextResponse.json({ logout: "failed!" }, { status: 200 })
    }
}