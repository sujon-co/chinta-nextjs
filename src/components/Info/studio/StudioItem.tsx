import { NextPage } from 'next';
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import studioImage from '/public/about/about.jpg';

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
                    <a href="#" className="social-icons-item">
                        <FaFacebookF />
                    </a>
                    <a href="#" className="social-icons-item">
                        <FaInstagram />
                    </a>
                    <a href="#" className="social-icons-item">
                        <FaLinkedinIn />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default StudioItem;
