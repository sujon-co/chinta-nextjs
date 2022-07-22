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

const sliderUpdateAndDelete = handler
    .patch(async (req, res, next) => {
        try {
            /** @ts-ignore */
            const { body, query, file } = req;
            console.log({ body, query, file });
            const { id: _id } = query;

            const photoUrl = file?.filename
                ? '/uploads/' + file?.filename
                : body.file;
            const slider = await Slider.findOneAndUpdate(
                { _id },
                { alt: body.alt, photoUrl },
                { new: true }
            );

            res.status(200).json({
                success: true,
                data: slider,
                message: 'Slider updated successfully.',
            });
        } catch (error) {
            next(error);
        }
    })
    .delete(async (req, res, next) => {
        try {
            const { id: _id } = req.query;
            const slider = await Slider.findOneAndDelete({ _id });

            res.status(200).json({
                success: true,
                data: slider,
                message: 'Slider deleted successfully.',
            });
        } catch (error) {
            next(error);
        }
    });

export default connectDB(authenticated(sliderUpdateAndDelete));
