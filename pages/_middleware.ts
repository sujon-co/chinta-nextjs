import { config } from 'config';
import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'server/helpers/token';

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    let token = req.cookies['chinta_auth_token'];

    if (pathname.includes('/admin/chinta')) {
        if (token === undefined)
            return NextResponse.redirect(new URL('/signin', req.url));
        try {
            await verify(token, config.jwtSecret);
            return NextResponse.next();
        } catch (err) {
            return NextResponse.redirect(new URL('/signin', req.url));
        }
    }
    return NextResponse.next();
}

export default middleware;
