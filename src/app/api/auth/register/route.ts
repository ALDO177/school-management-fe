/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from "next/server";
import { instancesResponse } from "@lib/instance.responses";

export async function POST(_req: NextRequest) {
    try {
        return NextResponse.json({});

    } catch (err: any) {

        const payloadError  = instancesResponse({ message: "Error", data: {...err}, httpCode: 400 })
        return NextResponse.json({ ...payloadError }, { status: 400 })
    }
}