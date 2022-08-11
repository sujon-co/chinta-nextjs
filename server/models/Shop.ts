import { model, models, Schema } from 'mongoose';
import { IShop } from 'server/interface';

const shopSchema = new Schema<IShop>(
    {
        title: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        shortDescription: {
            type: String,
            required: true,
        },
        description: String,
        previousPrice: Number,
        stock: Number,
        images: [String],
    },
    { timestamps: true }
);

const Shop = models.Shop || model<IShop>('Shop', shopSchema);
export default Shop;
