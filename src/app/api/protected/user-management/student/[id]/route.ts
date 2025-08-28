import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params } : { params : Promise<{ id : number }>}) {

    try {
        return NextResponse.json({message: "Student Id!"});

    } catch (err: any) {
        return NextResponse.json({ ...err }, { status: 400 });
    }
}