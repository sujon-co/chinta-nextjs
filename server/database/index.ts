import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

const connectDB =
    (handler: any) => async (req: NextApiRequest, res: NextApiResponse) => {
        if (mongoose.connections[0].readyState) {
            return handler(req, res);
        }

        // await mongoose.connect('mongodb://127.0.0.1:27017/chinta-nextjs');
        await mongoose.connect(
            `mongodb+srv://chinta:chinta-2224@cluster0.corjkqr.mongodb.net/chinta-nextjs?retryWrites=true&w=majority`
        ); // kanak

        return handler(req, res);
    };


export default connectDB;
