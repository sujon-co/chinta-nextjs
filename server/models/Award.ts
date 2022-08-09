import { model, models, Schema } from 'mongoose';
import { IAward } from 'server/interface';

const awardSchema = new Schema<IAward>(
    {
        awardName: {
            type: String,
            required: true,
        },
        programName: {
            type: String,
            required: true,
        },
        programUrl: String,
        year: {
            type: Number,
            required: true,
        },
        organizedBy: {
            type: String,
            required: true,
        },
        organizationUrl: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Award = models.Award || model<IAward>('Award', awardSchema);
export default Award;
