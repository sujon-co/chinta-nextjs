import bcrypt from 'bcryptjs';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import connectDB from 'server/database';
import handler from 'server/middlewares/handler';
import Admin from 'server/models/Admin';

const adminLogin = handler.post(async (req, res, next) => {
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
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: passwordRemember ? '1h' : '1d',
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
        console.log(err);
    }
});

export default connectDB(adminLogin);
