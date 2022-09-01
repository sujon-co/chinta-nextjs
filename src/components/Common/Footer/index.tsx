import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="container footer-section">
            <div className="d-flex align-content-center justify-content-between">
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
                <div className="line-height-27">
                    Copyright © {new Date().getFullYear()} Chinta Sthapatya. All
                    Rights Reserved
                </div>
            </div>
        </footer>
    );
};

export default Footer;
