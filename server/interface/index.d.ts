import { AxiosError } from 'axios';
import { Types } from 'mongoose';

interface IAdmin {
    _id: Types.ObjectId;
    email: string;
    password: string;
}
interface IAbout {
    _id: Types.ObjectId;
    photoUrl: string;
    content: string;
}

interface IStudio {
    _id: Types.ObjectId;
    name: string;
    designation: string;
    photoUrl: string;
    socialLink: {
        facebook: string;
        instagram: string;
        linkedIn: string;
    };
}

interface ISlider {
    _id: Types.ObjectId;
    photoUrl: string;
    alt: string;
}

type ResponseError = AxiosError & {
    response: { data: { message: string } };
};
