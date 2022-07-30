export const config = {
    jwtSecret: process.env.NEXT_PUBLIC_JWT_SECRET || '',
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || '',
    imageUploadUrl: process.env.NEXT_PUBLIC_API_IMAGE_UPLOAD_URL || '',
};
