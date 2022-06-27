import { model, models, Schema } from 'mongoose';
import { IAbout } from 'server/interface';

const aboutSchema = new Schema<IAbout>(
    {
        content: {
            type: String,
            required: true,
        },
        photoUrl: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const About = models.About || model<IAbout>('About', aboutSchema);
export default About;
