import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import connectDB from 'server/database';
import upload from 'server/middlewares/upload';
import Studio from 'server/models/Studio';

export const config = {
    api: {
        bodyParser: false,
    },
};

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
    .use(upload.single('file'))
    .get(async (req, res, next) => {
        try {
            const studios = await Studio.find({});

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
            // @ts-ignore
            const { body, file } = req;
            const photoUrl = file?.filename ? '/uploads/' + file?.filename : '';

            // console.log({ body, file });
            const studio = await Studio.create({
                ...body,
                photoUrl,
            });

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
