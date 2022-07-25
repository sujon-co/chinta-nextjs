import { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    console.log({ middleware: 'connected' });
    const { pathname } = req.nextUrl;
    // let token = req.cookies['auth'];
    let token = req.cookies.get('auth');

    console.log({ token });

    // if (pathname.includes('/admin/chinta')) {
    //     if (token === undefined)
    //         return NextResponse.redirect(new URL('/signin', req.url));
    //     try {
    //         const result: result = jwtDecode(token);
    //         if (result?.think! !== 'love_my_chinta') {
    //             return NextResponse.redirect(new URL('/signin', req.url));
    //         }
    //         return NextResponse.next();
    //     } catch (err) {
    //         return NextResponse.redirect(new URL('/signin', req.url));
    //     }
    // }
    // return NextResponse.next();
}
