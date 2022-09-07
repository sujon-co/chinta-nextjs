import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import connectDB from 'server/database';
import Studio from 'server/models/Studio';

const studioHandler = nextConnect<NextApiRequest, NextApiResponse>({
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
})
    .get(async (req, res, next) => {
        try {
            const studios = await Studio.find({}).sort({ position: 1 });

            res.status(200).json({
                success: true,
                data: studios,
                message: 'Studio fetched successfully.',
            });
        } catch (error) {
            next(error);
        }
    })
    .post(async (req, res, next) => {
        try {
            const { body } = req;

            const studio = await Studio.create(body);

            res.status(200).json({
                success: true,
                data: studio,
                message: 'Studio uploaded successfully.',
            });
        } catch (error) {
            next(error);
        }
    });
export default connectDB(studioHandler);
