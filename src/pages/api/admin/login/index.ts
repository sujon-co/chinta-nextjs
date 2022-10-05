import bcrypt from 'bcryptjs';
import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import connectDB from 'server/database';
import { sign } from 'server/helpers/token';
import Admin from 'server/models/Admin';
import { config } from 'src/config';

const adminLogin = nextConnect<NextApiRequest, NextApiResponse>({
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
    try {
        const { email, password, passwordRemember } = req.body;
        const admin = await Admin.findOne({ email }).select('-__v');

        if (!admin) {
            return res.status(400).send({
                success: false,
                data: null,
                message: 'Email Address Not Found!',
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, admin.password);
        if (!isPasswordMatch) {
            return res.status(400).send({ message: 'Password Not Match' });
        }

        const token = await sign(
            { _id: admin._id, email: admin.email },
            config.jwtSecret,
            passwordRemember ? 360 : 24
        );
        res.setHeader(
            'Set-Cookie',
            cookie.serialize('chinta_auth_token', token, {
                httpOnly: true,
                // secure: process.env.NODE_ENV === 'production',
                secure: false,
                sameSite: 'strict',
                maxAge: 3600 * (passwordRemember ? 360 : 24),
                path: '/',
            })
        );

        res.status(200).send({
            success: true,
            data: null,
            message: 'Login Successful',
        });
    } catch (err) {
        next(err);
    }
});

export default connectDB(adminLogin);
