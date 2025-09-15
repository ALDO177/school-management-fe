import { forwardApiPost } from "@forwards/server/forward.post";
import { NextRequest, NextResponse } from "next/server";


export async function POST(_req: NextRequest, { params } : {params: Promise<{id : number}>}) {

    const { id } = await params;
    const body = await _req.json();

    try {
        const result = await forwardApiPost(`role/role-permissions/${id}`, body);
        return NextResponse.json(result);
        
    } catch (err: any) {
        return NextResponse.json({ ...err?.response?.data }, { status: 400 })
    }
}