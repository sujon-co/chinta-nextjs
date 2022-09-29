import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import connectDB from 'server/database';
import Apply from 'server/models/Apply';

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
    .patch(async (req, res, next) => {
        try {
            const { body, query } = req;
            const { id: _id } = query;
            const apply = await Apply.findOneAndUpdate(
                { _id },
                { ...body },
                { new: true }
            );

            res.status(200).json({
                success: true,
                data: apply,
                message: 'Apply updated successfully.',
            });
        } catch (error) {
            next(error);
        }
    })
    .delete(async (req, res, next) => {
        try {
            const { id: _id } = req.query;
            await Apply.findOneAndDelete({ _id });

            res.status(200).json({
                success: true,
                data: null,
                message: 'Apply deleted successfully.',
            });
        } catch (error) {
            next(error);
        }
    });

export default connectDB(studioUpdateAndDelete);
