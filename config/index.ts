export const config = {
    jwtSecret: process.env.JWT_SECRET || '',
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || '',
};
