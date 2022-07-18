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

const studioUpdateAndDelete = handler
    .patch(async (req, res, next) => {
        try {
            /** @ts-ignore */
            const { body, query, file } = req;
            const { id: _id } = query;

            const photoUrl = file?.filename ? '/uploads/' + file?.filename : body.file;
            const studio = await Studio.findOneAndUpdate({ _id },
                { ...body, photoUrl },
                { new: true, }
            );

            res.status(200).json({
                success: true,
                data: studio,
                message: 'Studio updated successfully.',
            });
        } catch (error) {
            next(error);
        }
    })
    .delete(async (req, res, next) => {
        try {
            const { id: _id } = req.query;
            await Studio.findOneAndDelete({ _id });

            res.status(200).json({
                success: true,
                data: null,
                message: 'Studio deleted successfully.',
            });
        } catch (error) {
            next(error);
        }
    });

export default connectDB(studioUpdateAndDelete);
