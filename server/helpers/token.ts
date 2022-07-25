import { jwtVerify, SignJWT, type JWTPayload } from 'jose';

export async function sign(
    payload: any,
    secret: string,
    expire: number
): Promise<string> {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60 * 60 * expire; // one hour

    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256', typ: 'JWsignT' })
        .setExpirationTime(exp)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(new TextEncoder().encode(secret));
}

export async function verify(
    token: string,
    secret: string
): Promise<JWTPayload> {
    const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(secret)
    );
    return payload;
}
