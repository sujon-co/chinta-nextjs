import { model, models, Schema } from 'mongoose';
import { INews } from 'server/interface';

const newsSchema = new Schema<INews>(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const News = models.News || model<INews>('News', newsSchema);
export default News;
