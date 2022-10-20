import { NextPage } from 'next';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { RiLinksFill } from 'react-icons/ri';
import { IStudio } from 'server/interface';
import MyImage from 'src/components/Image';

interface Props {
    studio: IStudio;
}

const StudioItem: NextPage<Props> = ({ studio }) => {
    return (
        <div className="studio-item">
            <div className="studio-item-image">
                <MyImage
                    src={studio.photoUrl}
                    alt={studio.alt}
                    layout="responsive"
                    width={200}
                    height={260}
                    preloaderSize="small"
                />
            </div>
            <div className="studio-item-content">
                <h6 className="name"> {studio.name} </h6>
                <div className="position"> {studio.designation} </div>
                <div className="social-icons">
                    {studio?.socialLink.instagram && (
                        <a
                            href={studio?.socialLink.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icons-item"
                        >
                            <FaInstagram />
                        </a>
                    )}
                    {studio?.socialLink.linkedIn && (
                        <a
                            href={studio?.socialLink.linkedIn}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icons-item"
                        >
                            <FaLinkedinIn />
                        </a>
                    )}
                    {studio?.socialLink.website && (
                        <a
                            href={studio?.socialLink.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icons-item"
                        >
                            <RiLinksFill />
                        </a>
                    )}

                </div>
            </div>
        </div>
    );
};

export default StudioItem;
