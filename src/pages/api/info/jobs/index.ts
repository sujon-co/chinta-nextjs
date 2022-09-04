import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import connectDB from 'server/database';
import Job from 'server/models/Job';

const aboutHandler = nextConnect<NextApiRequest, NextApiResponse>({
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
            const jobs = await Job.find({}).sort({ createdAt: -1 });

            res.status(200).json({
                success: true,
                data: jobs,
                message: 'Jobs fetched successfully.',
            });
        } catch (error) {
            next(error);
        }
    })
    .post(async (req, res, next) => {
        try {
            const { body } = req;
            const job = await Job.create(body);

            res.status(200).json({
                success: true,
                data: job,
                message: 'Job uploaded successfully.',
            });
        } catch (error) {
            next(error);
        }
    })
    .patch(async (req, res, next) => {
        try {
            const { body } = req;

            const job = await Job.findByIdAndUpdate(
                body._id,
                { ...body },
                { new: true }
            );

            res.status(200).json({
                success: true,
                data: job,
                message: 'Job updated successfully.',
            });
        } catch (error) {
            next(error);
        }
    });
export default connectDB(aboutHandler);
