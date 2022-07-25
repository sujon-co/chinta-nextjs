import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import connectDB from 'server/database';
import authenticated from 'server/middlewares/authenticated';
import upload from 'server/middlewares/upload';
import Slider from 'server/models/Slider';

export const config = {
    api: {
        bodyParser: false,
    },
};

const sliderUpdateAndDelete = nextConnect<NextApiRequest, NextApiResponse>({
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
    .use(upload.single('file'))
    .patch(async (req, res, next) => {
        try {
            /** @ts-ignore */
            const { body, query, file } = req;
            // console.log({ body, query, file });
            const { id: _id } = query;

            const photoUrl = file?.filename
                ? '/uploads/' + file?.filename
                : body.file;
            const slider = await Slider.findOneAndUpdate(
                { _id },
                { alt: body.alt, photoUrl },
                { new: true }
            );

            res.status(200).json({
                success: true,
                data: slider,
                message: 'Slider updated successfully.',
            });
        } catch (error) {
            next(error);
        }
    })
    .delete(async (req, res, next) => {
        try {
            const { id: _id } = req.query;
            const slider = await Slider.findOneAndDelete({ _id });

            res.status(200).json({
                success: true,
                data: slider,
                message: 'Slider deleted successfully.',
            });
        } catch (error) {
            next(error);
        }
    });

export default connectDB(authenticated(sliderUpdateAndDelete));
