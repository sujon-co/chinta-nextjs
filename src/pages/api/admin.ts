// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import authenticated from 'server/middlewares/authenticated';
import handler from 'server/middlewares/handler';

type Data = {
    role: string;
};

const adminHandler = handler.post((req, res, next) => {
    res.status(200).json({
        message: 'Welcome to dashboard',
    });
});
export default authenticated(adminHandler);
