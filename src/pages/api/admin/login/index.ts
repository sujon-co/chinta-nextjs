import connectDB from 'server/database';
import handler from 'server/middlewares/handler';
import Admin from 'server/models/Admin';
import bcrypt from 'bcryptjs';

const adminLogin = handler.post(async (req, res, next) => {
    try {
        const { email, password } = req.body;
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

        const token = admin.getToken();
        // res.cookie('admin-token', token, { expiresIn: '1h' });
        // res.setHeader()

        res.status(200).send({
            success: true,
            data: token,
            message: 'Login Successful',
        });
    } catch (err) {
        console.log(err);
    }
});

export default connectDB(adminLogin);
