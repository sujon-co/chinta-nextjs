import connectDB from 'server/database';
import handler from 'server/middlewares/handler';
import validate from 'server/middlewares/validate';
import Admin from 'server/models/Admin';
import { adminValidator } from 'server/validators';

const signup = handler.post(async (req, res, next) => {
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
});

export default connectDB(validate(adminValidator, signup));
