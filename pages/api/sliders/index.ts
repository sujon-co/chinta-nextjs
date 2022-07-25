import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import connectDB from 'server/database';
import removeFile from 'server/helpers/removeFile';
import authenticated from 'server/middlewares/authenticated';
import upload from 'server/middlewares/upload';
import Slider from 'server/models/Slider';

export const config = {
    api: {
        bodyParser: false,
    },
};

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
    .use(upload.single('file'))
    .get(async (req, res, next) => {
        try {
            const sliders = await Slider.find().sort({ createdAt: -1 });

            res.status(200).json({
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
            // @ts-ignore
            const { body, file } = req;
            const photoUrl = file?.filename ? '/uploads/' + file?.filename : '';

            // removeFile(file?.filename);

            const slider = await Slider.create({
                alt: body.alt,
                photoUrl: photoUrl,
            });
            res.status(200).json({
                success: true,
                data: slider,
                message: 'Slider uploaded successfully.',
            });
        } catch (error) {
            // @ts-ignore
            removeFile(req?.file.filename);
            next(error);
        }
    });
export default connectDB(authenticated(uploadHandler));
