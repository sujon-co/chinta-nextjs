import jwtDecode from 'jwt-decode';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    let token = req.cookies['auth'];

    if (pathname.includes('/admin/chinta')) {
        if (token === undefined)
            return NextResponse.redirect(new URL('/signin', req.url));
        try {
            jwtDecode(token);
            return NextResponse.next();
        } catch (err) {
            return NextResponse.redirect(new URL('/signin', req.url));
        }
    }
    return NextResponse.next();
}

export default middleware;
