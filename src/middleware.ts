
'use server'

import { instancesResponse } from "../lib/instance.responses";
import { NextRequest, NextResponse } from "next/server";

const route_auth = [
    '/dashboard',
    '/division-of-roles'
];

export async function middleware(request: NextRequest) {

    const token = request.cookies.get('token_access')?.value;
    const pathname = request.nextUrl.pathname;

    const auth_route = route_auth.some((val) => pathname.startsWith(val));

    if (!token && auth_route) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (token && pathname.startsWith("/login")) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    //pathname protected api
    if (pathname.startsWith('/api/protected')) {

        if (token) {
            return NextResponse.next();
        };

        const token_with_header = request.headers.get("Authorization")?.replace("Bearer", "");
        
        if (token_with_header) {
           return NextResponse.next();
        };

        const result = instancesResponse({ httpCode: 401, message: "Unauthorized", error: true, data: null })
        return NextResponse.json(result, { status: 401 })
    }

    return NextResponse.next();
};

export const config = {
    matcher: [
        '/((?!trpc|_next|_vercel|.*\\..*).*)',
        '/api/:path*'
    ],
}