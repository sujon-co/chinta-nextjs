import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import connectDB from 'server/database';
import authenticated from 'server/middlewares/authenticated';
import News from 'server/models/News';

const newsHandler = nextConnect<NextApiRequest, NextApiResponse>({
    onError: (err, req, res, next) => {
        if (err.message) {
            res.status(err.status || 500).json({
                status: false,
                data: null,
                message: err.message,
            });
        } else {
            res.status(500).json({
                success: false,
                data: null,
                message: 'There was an error',
            });
        }
    },
    onNoMatch: (req, res) => {
        res.status(405).json({
            success: false,
            data: null,
            message: `Method ${req.method} Not Allowed! `,
        });
    },
}).get(async (req, res, next) => {
    try {
        const news = await News.find({});

        res.status(200).json({
            success: true,
            data: news,
            message: 'News fetched successfully.',
        });
    } catch (error) {
        next(error);
    }
});
export default connectDB(authenticated(newsHandler));
