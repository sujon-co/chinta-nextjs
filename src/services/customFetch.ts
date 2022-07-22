import { NextPageContext } from 'next';
import Router from 'next/router';

/**
 *
 * @param url string
 * @param method {'GET' | 'POST' | 'DELETE' | 'PATCH'}
 * @param body any
 * @param ctx NextContextApi
 * @returns
 */

async function customFetch(
    url: string,
    method: 'GET' | 'POST' | 'DELETE' | 'PATCH',
    body: any,
    ctx?: NextPageContext
) {
    const res = await fetch(`http://localhost:3000/api${url}`, {
        method: method,
        body: body,
        headers: {
            cookie: ctx?.req?.headers.cookie || '',
        },
    });
    if (res.status === 401 && !ctx?.req) {
        Router.replace('/signin');
        return {};
    }
    if (res.status === 401 && ctx?.req) {
        ctx.res?.writeHead(302, {
            Location: '/signin',
        });
        ctx.res?.end();
        return {};
    }
    return await res.json();
}
export default customFetch;
