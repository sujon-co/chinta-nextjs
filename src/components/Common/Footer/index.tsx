import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="container footer-section">
            <div className="footer">
                <div className="social-icons">
                    <a href="https://www.facebook.com/chintasthapatya/" className="social-icons-item" target="_blank" rel="noopener noreferrer">
                        <FaFacebookF />
                    </a>
                    <a href="https://www.instagram.com/chintaarchitects/" className="social-icons-item" target="_blank" rel="noopener noreferrer">
                        <FaInstagram />
                    </a>
                    <a href="https://www.linkedin.com/in/chintasthapatya" className="social-icons-item" target="_blank" rel="noopener noreferrer">
                        <FaLinkedinIn />
                    </a>
                </div>
                <div className="line-height-25">
                    Copyright © {new Date().getFullYear()} Chinta Sthapatya. All
                    Rights Reserved
                </div>
            </div>
        </footer>
    );
};

export default Footer;
