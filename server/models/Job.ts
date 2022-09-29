import { model, models, Schema } from 'mongoose';
import { IJob } from 'server/interface';

const jobSchema = new Schema<IJob>(
    {
        title: {
            type: String,
            required: true,
        },
        opportunity: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: String,
    },
    { timestamps: true }
);

const Job = models.Job || model<IJob>('Job', jobSchema);
export default Job;
