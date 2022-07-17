import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
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

export default upload;
