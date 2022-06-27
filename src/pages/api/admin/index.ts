import connectDB from 'server/database';
import handler from 'server/middlewares/handler';
import validate from 'server/middlewares/validate';
import { adminValidator } from 'server/validators';

const admin = handler.post(async (req, res) => {
    res.status(200).json({
        body: req.body,
        method: req.method,
    });
});

export default connectDB(validate(adminValidator, admin));
