import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'server/helpers/token';
import { config as _config } from 'src/config';


// If the incoming request has the "beta" cookie
// then we'll rewrite the request to /beta
export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    let token = req.cookies.get('chinta_auth_token');


    if (pathname.includes('/admin/chinta')) {
        if (token === undefined)
            return NextResponse.redirect(new URL('/signin', req.url));
        try {
            await verify(token, _config.jwtSecret);
            return NextResponse.next();
        } catch (err) {
            return NextResponse.redirect(new URL('/signin', req.url));
        }
    }
    return NextResponse.next();
}

// Supports both a single value or an array of matches
export const config = {
    matcher: '/admin/chinta/:path*',
};