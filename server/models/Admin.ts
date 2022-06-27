import { model, models, Schema } from 'mongoose';
import { IAdmin } from 'server/interface';

const adminSchema = new Schema<IAdmin>(
    {
        email: {
            type: String,
            trim: true,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Admin = models.Admin || model<IAdmin>('Admin', adminSchema);
export default Admin;
