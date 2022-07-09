import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
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

adminSchema.pre('save', async function (next) {
    const admin = this;
    if (admin.isModified('password')) {
        admin.password = await bcrypt.hash(admin.password, 11);
    }
    next();
});

adminSchema.methods.getToken = function (value: string) {
    console.log(value);
    return jwt.sign(
        {
            _id: this._id,
            type: this.email,
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn: '1h',
        }
    );
};

const Admin = models.Admin || model<IAdmin>('Admin', adminSchema);
export default Admin;
