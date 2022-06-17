import { NextPage } from 'next';
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import studioImage from '/public/about/about2.jpg';

interface Props {}

const StudioItem: NextPage<Props> = () => {
    return (
        <div className="studio-item">
            <div className="studio-item-image">
                <Image src={studioImage} layout="responsive" alt="" />
            </div>
            <div className="studio-item-content">
                <h6 className="name">Mahmudul Haque Gani</h6>
                <div className="position">Principal Architect</div>
                <div className="social-icons">
                    <div className="social-icons-item">
                        <FaFacebookF />
                    </div>
                    <div className="social-icons-item">
                        <FaInstagram />
                    </div>
                    <div className="social-icons-item">
                        <FaLinkedinIn />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudioItem;
