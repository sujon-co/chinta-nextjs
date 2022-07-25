import bcrypt from 'bcryptjs';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import connectDB from 'server/database';
import Admin from 'server/models/Admin';

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

        const token = jwt.sign(
            {
                _id: admin._id,
                type: admin.email,
                think: 'love_my_chinta',
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: passwordRemember ? '2h' : '15d',
            }
        );
        res.setHeader(
            'Set-Cookie',
            cookie.serialize('auth', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 3600,
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
