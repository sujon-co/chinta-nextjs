import fs from 'fs';
import path from 'path';

const removeFile = (file: string) => {
    console.log({ Yes: 'worked' });
    console.log({
        currentPath: `${__dirname}`,
        path: path.join(__dirname, `../../../../public/uploads/${file}`),
    });

    if (fs.existsSync(path.join(__dirname, `../../public/uploads/${file}`))) {
        console.log({ Yes: 'worked' });
        console.log({
            path: path.join(__dirname, `../../public/uploads/${file}`),
        });

        // fs.unlink(
        //     path.join(__dirname, `../../public/uploads/${file}`),
        //     (err: any) => {
        //         if (err) console.log({ message: 'file not deleted' });
        //         console.log('This file has been removed successfully.');
        //     }
        // );
    }
};

export default removeFile;
