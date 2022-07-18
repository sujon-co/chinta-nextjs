interface IStudioWithImagePlaceholder {
    base64: string;
    src: string;
    height: number;
    width: number;
    type?: string | undefined;
    _id: Types.ObjectId;
    name: string;
    designation: string;
    photoUrl: string;
    alt: string;
    socialLink: {
        facebook: string;
        instagram: string;
        linkedIn: string;
    };
}