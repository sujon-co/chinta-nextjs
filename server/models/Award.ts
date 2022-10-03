import { model, models, Schema } from 'mongoose';
import { IAward } from 'server/interface';

const awardSchema = new Schema<IAward>(
    {
        awardName: {
            type: String,
            required: true,
        },
        programName: String,
        programUrl: String,
        year: {
            type: Number,
            required: true,
        },
        organizedBy: String,
        organizationUrl: String,
    },
    { timestamps: true }
);

const Award = models.Award || model<IAward>('Award', awardSchema);
export default Award;
