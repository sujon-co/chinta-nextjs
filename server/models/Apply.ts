import { model, models, Schema } from 'mongoose';
import { IApply } from 'server/interface';

const applySchema = new Schema<IApply>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        position: {
            type: String,
            required: true,
        },
        file: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

const Apply = models.Apply || model<IApply>('Apply', applySchema);
export default Apply;
