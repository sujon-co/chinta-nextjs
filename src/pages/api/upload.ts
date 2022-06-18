import multer from 'multer';
import path from 'path';
import handler from 'server/middlewares/handler';

export const config = {
    api: {
        bodyParser: false,
    },
};

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        console.log(file);
        cd(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const fileName =
            file.originalname
                .replace(fileExt, '')
                .toLowerCase()
                .split(' ')
                .join('-') +
            '-' +
            Date.now();

        cb(null, fileName + fileExt);
    },
});

const upload = multer({
    storage: storage,
});

handler.use(upload.single('file'));

const uploadHandler = handler.post((req, res) => {
    console.log('body', req.body);
    console.log('file', req.file);

    res.status(200).send('file upload done');
});

export default uploadHandler;
