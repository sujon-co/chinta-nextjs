// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import authenticated from 'server/middlewares/authenticated';

type Data = {
    name: string;
};

function handler2(req: NextApiRequest, res: NextApiResponse<Data>) {
    res.status(200).json({ name: 'John Doe' });
}
export default authenticated(handler2);
