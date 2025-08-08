'use server'

import { EntitySessionToken } from '@entity/SessionToken';
import { getDataSource } from '@lib/db'
import { instancesResponse } from '@lib/instance.responses';
import { NextRequest, NextResponse } from 'next/server'

export async function POST(_req: NextRequest) {
    try {

        const { token } = await _req.json();

        if (!token) {
            return NextResponse.json(
                instancesResponse({ httpCode: 401, message: "Unauthorized", error: true })
                , { status: 401 });
        }

        const dataSource = await getDataSource();
        const repoSessionToken = dataSource.getRepository(EntitySessionToken);
        const getSessionToken = await repoSessionToken.findOne({
            where: {
                session_token: token
            }
        });

        if (!getSessionToken) return NextResponse.json(
            instancesResponse({ httpCode: 401, message: "Unauthorized", error: true })
            , { status: 401 });

        return NextResponse.json(
            instancesResponse({ data: getSessionToken }), { status: 200 })

    } catch (err: any) {
        return NextResponse.json({ ...err }, { status: 401 })
    }
}