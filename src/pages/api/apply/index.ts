import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import connectDB from 'server/database';
import Apply from 'server/models/Apply';

const applyHandler = nextConnect<NextApiRequest, NextApiResponse>({
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
            const studios = await Apply.find({}).sort({ position: 1 });

            res.status(200).json({
                success: true,
                data: studios,
                message: 'Applies fetched successfully.',
            });
        } catch (error) {
            next(error);
        }
    })
    .post(async (req, res, next) => {
        try {
            const { body } = req;

            const studio = await Apply.create(body);

            res.status(200).json({
                success: true,
                data: studio,
                message: 'Thanks for Applying!',
            });
        } catch (error) {
            next(error);
        }
    });
export default connectDB(applyHandler);
