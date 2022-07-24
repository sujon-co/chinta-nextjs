import jwtDecode from 'jwt-decode';
import { NextRequest, NextResponse } from 'next/server';

interface result {
    think: string;
}

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    let token = req.cookies['auth'];

    if (pathname.includes('/admin/chinta')) {
        if (token === undefined)
            return NextResponse.redirect(new URL('/signin', req.url));
        try {
            const result: result = jwtDecode(token);
            if (result?.think! !== 'love_my_chinta') {
                return NextResponse.redirect(new URL('/signin', req.url));
            }
            return NextResponse.next();
        } catch (err) {
            return NextResponse.redirect(new URL('/signin', req.url));
        }
    }
    return NextResponse.next();
}

export default middleware;
