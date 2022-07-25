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

const studioUpdateAndDelete = nextConnect<NextApiRequest, NextApiResponse>({
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
            const { id: _id } = query;

            const photoUrl = file?.filename
                ? '/uploads/' + file?.filename
                : body.file;
            const studio = await Studio.findOneAndUpdate(
                { _id },
                { ...body, photoUrl },
                { new: true }
            );

            res.status(200).json({
                success: true,
                data: studio,
                message: 'Studio updated successfully.',
            });
        } catch (error) {
            next(error);
        }
    })
    .delete(async (req, res, next) => {
        try {
            const { id: _id } = req.query;
            await Studio.findOneAndDelete({ _id });

            res.status(200).json({
                success: true,
                data: null,
                message: 'Studio deleted successfully.',
            });
        } catch (error) {
            next(error);
        }
    });

export default connectDB(studioUpdateAndDelete);
