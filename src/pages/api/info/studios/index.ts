import connectDB from 'server/database';
import handler from 'server/middlewares/handler';
import upload from 'server/middlewares/upload';
import Studio from 'server/models/Studio';

export const config = {
    api: {
        bodyParser: false,
    },
};

handler.use(upload.single('file'));


const studioHandler = handler
    .get(async (req, res, next) => {
        try {
            const studios = await Studio.find({});

            res.status(200).json({
                success: true,
                data: studios,
                message: 'Studio fetched successfully.',
            });
        } catch (error) {
            next(error);
        }
    })
    .post(async (req, res, next) => {
        try {
            // @ts-ignore
            const { body, file } = req;
            const photoUrl = file?.filename ? '/uploads/' + file?.filename : "";

            console.log({ body, file });
            const studio = await Studio.create({
                ...body,
                photoUrl
            });

            res.status(200).json({
                success: true,
                data: studio,
                message: 'Studio uploaded successfully.',
            });
        } catch (error) {
            next(error);
        }
    });
export default connectDB(studioHandler);
