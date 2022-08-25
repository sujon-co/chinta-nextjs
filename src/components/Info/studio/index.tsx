import { Types } from 'mongoose';
import { NextPage } from 'next';
import StudioItem from './StudioItem';

export interface StudioItem {
    base64: string;
    _id: Types.ObjectId | string;
    name: string;
    designation: string;
    photoUrl: string;
    alt: string;
    socialLink: {
        instagram: string;
        linkedIn: string;
    };
    src: string;
    height: number;
    width: number;
    type?: string | undefined;
}
interface Props {
    studios: StudioItem[];
}

const Studio: NextPage<Props> = ({ studios }) => {
    return (
        <div className="row g-3 row-cols-2 row-cols-md-3 row-cols-lg-5">
            {studios?.map((studio, index) => (
                <div className="" key={(studio._id, index)}>
                    <StudioItem studio={studio} />
                </div>
            ))}
        </div>
    );
};

export default Studio;
