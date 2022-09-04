import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import connectDB from 'server/database';
import authenticated from 'server/middlewares/authenticated';
import Job from 'server/models/Job';

const jobUpdateHandler = nextConnect<NextApiRequest, NextApiResponse>({
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
    .patch(async (req, res, next) => {
        try {
            const { body, query } = req;
            const { id: _id } = query;
            const job = await Job.findOneAndUpdate(
                { _id },
                { ...body },
                { new: true }
            );

            res.status(200).json({
                success: true,
                data: job,
                message: 'Job Item updated successfully.',
            });
        } catch (error) {
            next(error);
        }
    })
    .delete(async (req, res, next) => {
        try {
            const { id: _id } = req.query;
            const job = await Job.findOneAndDelete({ _id });

            res.status(200).json({
                success: true,
                data: job,
                message: 'Job Item deleted successfully.',
            });
        } catch (error) {
            next(error);
        }
    });

export default connectDB(authenticated(jobUpdateHandler));
