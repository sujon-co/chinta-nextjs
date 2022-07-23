import connectDB from 'server/database';
import handler from 'server/middlewares/handler';
import upload from 'server/middlewares/upload';
import About from 'server/models/About';

export const config = {
    api: {
        bodyParser: false,
    },
};

handler.use(upload.single('file'));

const aboutHandler = handler
    .get(async (req, res, next) => {
        try {
            const about = await About.find({}).sort({ createdAt: -1 });

            res.status(200).json({
                success: true,
                data: about,
                message: 'about fetched successfully.',
            });
        } catch (error) {
            next(error);
        }
    })
    .post(async (req, res, next) => {
        try {
            const { body } = req;
            const about = await About.create({
                ...body,
                // @ts-ignore
                photoUrl: '/uploads/' + req.file?.filename,
            });

            res.status(200).json({
                success: true,
                data: about,
                message: 'About uploaded successfully.',
            });
        } catch (error) {
            next(error);
        }
    })
    .patch(async (req, res, next) => {
        try {
            /* @ts-ignore */
            const { body, file } = req;

            const photoUrl = file?.filename
                ? '/uploads/' + file?.filename
                : body.file;
            const about = await About.findByIdAndUpdate(
                body._id,
                { ...body, photoUrl },
                { new: true }
            );

            res.status(200).json({
                success: true,
                data: about,
                message: 'About updated successfully.',
            });
        } catch (error) {
            next(error);
        }
    });
export default connectDB(aboutHandler);
