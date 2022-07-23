import connectDB from 'server/database';
import authenticated from 'server/middlewares/authenticated';
import handler from 'server/middlewares/handler';
import upload from 'server/middlewares/upload';
import Slider from 'server/models/Slider';

export const config = {
    api: {
        bodyParser: false,
    },
};

handler.use(upload.single('file'));

const uploadHandler = handler
    .get(async (req, res, next) => {
        try {
            const sliders = await Slider.find().sort({ createdAt: -1 });

            res.status(200).json({
                success: true,
                data: sliders,
                message: 'Sliders fetched successfully.',
            });
        } catch (error) {
            next(error);
        }
    })
    .post(async (req, res, next) => {
        try {
            // @ts-ignore
            const { body, file } = req;
            const photoUrl = file?.filename ? '/uploads/' + file?.filename : '';

            const slider = await Slider.create({
                alt: body.alt,
                photoUrl: photoUrl,
            });
            return res.status(200).json({
                success: true,
                data: slider,
                message: 'Slider uploaded successfully.',
            });
        } catch (error) {
            next(error);
        }
    });
export default connectDB(authenticated(uploadHandler));
