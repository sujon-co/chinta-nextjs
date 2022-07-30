import { NextPage } from 'next';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import MyImage from 'src/components/Image';
import { StudioItem } from '.';

interface Props {
    studio: StudioItem;
}

const StudioItem: NextPage<Props> = ({ studio }) => {
    return (
        <div className="studio-item">
            <div className="studio-item-image">
                <MyImage
                    src={studio.photoUrl}
                    alt={studio.alt}
                    layout="responsive"
                    placeholder="blur"
                    blurDataURL={studio.base64}
                    height={studio.height}
                    width={studio.width}
                />
            </div>
            <div className="studio-item-content">
                <h6 className="name"> {studio.name} </h6>
                <div className="position"> {studio.designation} </div>
                <div className="social-icons">
                    <a
                        href={studio?.socialLink.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icons-item"
                    >
                        <FaInstagram />
                    </a>
                    <a
                        href={studio?.socialLink.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icons-item"
                    >
                        <FaLinkedinIn />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default StudioItem;
