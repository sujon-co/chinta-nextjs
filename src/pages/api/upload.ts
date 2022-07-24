import handler from 'server/middlewares/handler';
import upload from 'server/middlewares/upload';

export const config = {
    api: {
        bodyParser: false,
    },
};

handler.use(upload.single('file'));

const uploadHandler = handler.post((req, res) => {
    try {
        //@ts-ignore
        const { body, file } = req;

        console.log({ body, file });

        res.status(200).send({
            message: 'File uploaded successfully',
            path: 'http://localhost:3000/uploads/' + file?.filename,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: error,
        });
    }
});

export default uploadHandler;
