import { AxiosError } from 'axios';
import { Types } from 'mongoose';

interface IProject {
    _id: Types.ObjectId | string;
    name: string;
    type: 'residential' | 'commercial' | 'publicSpace' | 'urbanism' | 'interior';
    status: 'idea' | 'inProgress' | 'underConstruction' | 'completed';
    principalArchitect: string;
    designTeam: string;
    engineer: string;
    taskConstructionFirm: string;
    photograph: string;
    year: number;
    description: string;
    topImage: string;
    portraitImage: string;
    images: string[];
    gallery: string[];
    landscape?: string;
    size?: string;
    map: {
        getLocation: {
            lat: string | number;
            lng: string | number;
        };
        locationName: string;
        zoomLevel: number;
        streetButton: string;
        showMaker: boolean;
    };
    updatedAt?: any;
}

interface IAdmin {
    _id: Types.ObjectId;
    email: string;
    password: string;
}

interface IStudio {
    _id: Types.ObjectId;
    name: string;
    designation: string;
    photoUrl: string;
    alt: string;
    position: number;
    socialLink: {
        instagram: string;
        linkedIn: string;
    };
}

interface ISlider {
    _id: Types.ObjectId;
    photoUrl: string;
    alt: string;
    updatedAt?: any;
}
interface IAbout {
    _id: Types.ObjectId;
    photoUrl: string;
    bio: string;
    alt: string;
}
interface IAward {
    _id: Types.ObjectId;
    awardName: string;
    programName: string;
    programUrl: string;
    year: number;
    organizedBy: string;
    organizationUrl: string;
}
interface IShop {
    _id: Types.ObjectId;
    title: string;
    url?: string;
    shortDescription: string;
    description?: string;
    previousPrice?: number;
    currentPrice: number;
    stock: number;
    images: [string];
}
interface INews {
    _id: Types.ObjectId | string;
    title: string;
    description: string;
    image: string;
    url: string;
    createdAt?: any;
}

interface IJob {
    _id: Types.ObjectId | string;
    title: string;
    requirements: string;
    description: string;
    image: string;
}

interface IContact {
    _id: Types.ObjectId | string;
    phone: string;
    email: string;
    address: string;
}
type ResponseError = AxiosError & {
    response: { data: { message: string; }; };
};

interface APIResponse<T> {
    success: boolean;
    data: T;
    message: string;
}
