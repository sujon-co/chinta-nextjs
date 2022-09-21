import { model, models, Schema } from 'mongoose';
import { IContact } from 'server/interface';

const contactSchema = new Schema<IContact>(
    {
        phone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

const Contact = models.Contact || model<IContact>('Contact', contactSchema);
export default Contact;
