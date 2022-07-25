import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'server/helpers/token';
import { config } from 'src/config';

const authenticated =
    (fn: NextApiHandler) =>
    async (req: NextApiRequest, res: NextApiResponse) => {
        const token = req.cookies['chinta_auth_token'];
        const { method } = req;

        if (method !== 'GET') {
            try {
                const result = await verify(token!, config.jwtSecret);
                return await fn(req, res);
            } catch (error) {
                return res.status(401).json({
                    success: false,
                    data: null,
                    message: 'Sorry you are not authenticated',
                });
            }
        } else {
            return await fn(req, res);
        }
    };

export default authenticated;
