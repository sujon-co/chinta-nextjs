import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import connectDB from 'server/database';
import validate from 'server/middlewares/validate';
import Admin from 'server/models/Admin';
import { adminValidator } from 'server/validators';

const signup = nextConnect<NextApiRequest, NextApiResponse>({
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
}).post(async (req, res, next) => {
    const { body } = req;

    try {
        const admin = await Admin.create(body);
        res.status(201).json({
            success: true,
            data: null,
            message: 'Registration successfully.',
        });
    } catch (error) {
        next(error);
    }
}).delete(async (req, res, next) => {
    // delete by email address
    const { email } = req.body;
    try {
        const admin = await Admin.findOneAndDelete({ email });
        res.status(200).json({
            success: true,
            data: null,
            message: 'Admin deleted successfully.',
        });
    } catch (error) {
        next(error);
    }
});


export default connectDB(validate(adminValidator, signup));
