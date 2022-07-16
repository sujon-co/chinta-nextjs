import { model, models, Schema } from 'mongoose';
import { ISlider } from 'server/interface';

const sliderSchema = new Schema<ISlider>(
    {
        photoUrl: {
            type: String,
            required: true,
        },
        alt: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Slider = models.Slider || model<ISlider>('Slider', sliderSchema);
export default Slider;
