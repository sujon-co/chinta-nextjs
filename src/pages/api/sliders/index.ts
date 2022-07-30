import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import connectDB from 'server/database';
import authenticated from 'server/middlewares/authenticated';
import Slider from 'server/models/Slider';

const uploadHandler = nextConnect<NextApiRequest, NextApiResponse>({
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
            const sliders = await Slider.find().sort({ createdAt: -1 });

            return res.status(200).json({
                success: true,
                data: sliders,
                message: 'Sliders fetched successfully.',
            });
        } catch (error) {
            next(error);
        }
    })
    .post(async (req, res, next) => {
        try {
            const { body } = req;

            const slider = await Slider.create(body);
            return res.status(200).json({
                success: true,
                data: slider,
                message: 'Slider uploaded successfully.',
            });
        } catch (error) {
            next(error);
        }
    });
export default connectDB(authenticated(uploadHandler));
