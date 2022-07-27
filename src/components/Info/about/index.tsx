import { Types } from 'mongoose';
import Image from 'next/image';
import { FC } from 'react';

export interface AboutWithImage {
    base64: string;
    _id: Types.ObjectId;
    photoUrl: string;
    bio: string;
    alt: string;
    src: string;
    height: number;
    width: number;
    type?: string | undefined;
}

interface Props {
    about: AboutWithImage;
}
const About: FC<Props> = ({ about }) => {
    return (
        <div className="row">
            <div className="col-md-5 col-lg-4">
                <div className="about-img">
                    <Image
                        src={about.src}
                        alt={about.alt}
                        layout="responsive"
                        placeholder="blur"
                        blurDataURL={about.base64}
                        height={about.height}
                        width={about.width}
                    />
                </div>
            </div>
            <div className="col-md-7">
                <div className="d-flex align-items-center justify-content-center h-100 ">
                    <div className="">{about.bio}</div>
                </div>
            </div>
        </div>
    );
};

export default About;
