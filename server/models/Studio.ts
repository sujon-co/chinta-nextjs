import { model, models, Schema } from 'mongoose';
import { IStudio } from 'server/interface';

const studioSchema = new Schema<IStudio>(
    {
        name: {
            type: String,
            required: true,
        },
        designation: {
            type: String,
            required: true,
        },
        alt: String,
        photoUrl: {
            type: String,
            required: true,
        },
        socialLink: {
            facebook: String,
            linkedIn: String,
            instagram: String,
        },
    },
    { timestamps: true }
);

const Studio = models.Studio || model<IStudio>('Studio', studioSchema);
export default Studio;
