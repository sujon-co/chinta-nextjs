import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import connectDB from 'server/database';
import Shop from 'server/models/Shop';

const shopHandler = nextConnect<NextApiRequest, NextApiResponse>({
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
            const shops = await Shop.find({});

            res.status(200).json({
                success: true,
                data: shops,
                message: 'Shops fetched successfully.',
            });
        } catch (error) {
            next(error);
        }
    })
    .post(async (req, res, next) => {
        try {
            const { body } = req;

            const shop = await Shop.create(body);

            res.status(200).json({
                success: true,
                data: shop,
                message: 'Shop Item uploaded successfully.',
            });
        } catch (error) {
            next(error);
        }
    });
export default connectDB(shopHandler);
