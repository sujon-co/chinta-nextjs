import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

const connectDB =
    (handler: any) => async (req: NextApiRequest, res: NextApiResponse) => {
        if (mongoose.connections[0].readyState) {
            return handler(req, res);
        }
        // Use new db connection

        // await mongoose.connect('mongodb://127.0.0.1:27017/chinta-nextjs');
        await mongoose.connect(
            `mongodb+srv://chinta:chinta-1321@cluster0.z5lsi.mongodb.net/chinta-nextjs?retryWrites=true&w=majority`
        );
        return handler(req, res);
    };

export default connectDB;
