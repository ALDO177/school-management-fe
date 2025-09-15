import { forwardApiGet } from "@forwards/server/forward.post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: number }> }) {

    try {
        const { id } = await params;
        const result = await forwardApiGet(`mentoring-schedule/days/get-by-id/${id}`);
        return NextResponse.json(result);

    } catch (err: any) {

        return NextResponse.json({ ...err }, { status: 400 })
    }
}