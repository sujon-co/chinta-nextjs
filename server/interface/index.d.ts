import { AxiosError } from 'axios';
import { Types } from 'mongoose';

interface IProject {
    name: string;
    type: string;
    status: "idle" | "design"
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
    map: {
        getLocation: {
            lat: string | number,
            lng: string | number
        },
        locationName: string;
        zoomLevel: number,
        streetButton: string;
        showMaker: boolean;
    }
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
    socialLink: {
        instagram: string;
        linkedIn: string;
    };
}

interface ISlider {
    _id: Types.ObjectId;
    photoUrl: string;
    alt: string;
}
interface IAbout {
    _id: Types.ObjectId;
    photoUrl: string;
    bio: string;
    alt: string;
}


type ResponseError = AxiosError & {
    response: { data: { message: string } };
};
