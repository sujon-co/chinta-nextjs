import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'server/helpers/token';
import { config } from 'src/config';

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    let token = req.cookies.get('chinta_auth_token');

    console.log({ token });
    console.log("middleware.ts: ", pathname);

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
