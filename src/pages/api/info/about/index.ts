import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import connectDB from 'server/database';
import About from 'server/models/About';

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
            const about = await About.find({}).sort({ createdAt: -1 });

            res.status(200).json({
                success: true,
                data: about,
                message: 'about fetched successfully.',
            });
        } catch (error) {
            next(error);
        }
    })
    .post(async (req, res, next) => {
        try {
            const { body } = req;
            const about = await About.create(body);

            res.status(200).json({
                success: true,
                data: about,
                message: 'About uploaded successfully.',
            });
        } catch (error) {
            next(error);
        }
    })
    .patch(async (req, res, next) => {
        try {
            const { body } = req;

            const about = await About.findByIdAndUpdate(
                body._id,
                { ...body },
                { new: true }
            );

            res.status(200).json({
                success: true,
                data: about,
                message: 'About updated successfully.',
            });
        } catch (error) {
            next(error);
        }
    });
export default connectDB(aboutHandler);
