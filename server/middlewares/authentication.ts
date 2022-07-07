import { verify } from 'jsonwebtoken';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const authenticated =
    (fn: NextApiHandler) =>
    async (req: NextApiRequest, res: NextApiResponse) => {
        const { authorization } = req.headers;

        verify(
            authorization!,
            process.env.JWT_SECRET!,
            async (err, decoded) => {
                if (!err && decoded) {
                    return await fn(req, res);
                } else {
                    return res.status(401).json({
                        success: false,
                        data: null,
                        message: 'Sorry you are not authenticated',
                    });
                }
            }
        );
    };

export default authenticated;
