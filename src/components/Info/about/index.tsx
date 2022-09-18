import { FC, useEffect, useRef } from 'react';
import { IAbout } from 'server/interface';
import MyImage from 'src/components/Image';

interface Props {
    about: IAbout;
}
const About: FC<Props> = ({ about }) => {
    const bioRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (bioRef.current) {
            bioRef.current.innerHTML = about.bio;
        }
    }, [about.bio]);

    return (
        <div className="row g-4">
            <div className="col-md-5 col-lg-4">
                <div className="about-img">
                    <MyImage
                        src={about.photoUrl}
                        alt={about.alt}
                        layout="responsive"
                        width={400}
                        height={500}
                    />
                </div>
            </div>
            <div className="col-md-7">
                <div className="d-flex align-items-end justify-content-center h-100 ">
                    <div className="" ref={bioRef}></div>
                </div>
            </div>
        </div>
    );
};

export default About;
