import handler from 'server/middlewares/handler';
import upload from 'server/middlewares/upload';

export const config = {
    api: {
        bodyParser: false,
    },
};

handler.use(upload.single('file'));

const uploadHandler = handler.post((req, res) => {
    //@ts-ignore
    console.log('file', req.file);
    console.log('body', req.body);

    res.status(200).send('file upload done');
});

export default uploadHandler;
