import { FC, Fragment, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Modal from 'react-modal';
import { scrollHandler } from 'src/utils';
import Footer from '../Common/Footer';

interface Props {

}


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};


Modal.setAppElement('#__next');

const HomePageContact: FC<Props> = () => {
    const [showInput, setShowInput] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <Fragment>
            <div className="footer-wrapper">
                <div className="container contact-container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="wrapper">
                                <div className="type-writer-box">
                                    <textarea spellCheck="false" autoCorrect='false' autoComplete='false' onWheel={scrollHandler} />
                                    <button className='send-btn' onClick={openModal}>
                                        &#9654;
                                    </button>
                                </div>
                                {/* <div className="drop-message-wrapper">
                                    <div
                                        className="tagline"
                                        style={{ display: showInput ? 'none' : 'block', }}
                                        onClick={() => setShowInput(true)}
                                    >
                                        <p>DROP US A LINE</p>
                                    </div>
                                </div> */}
                                <br />
                                <h6> We would love to hear from you so don&lsquo;t hesitate to say hi! </h6>

                                <div className="mb-2">
                                    <div className="">+8801970785096</div>
                                    <div>info@chintaarchitects.com</div>
                                </div>
                                <p> CHINTA STHAPATYA, Level-5, House-25/2, Road No-15 (new) 28 (old) <br /> Dhaka 1205, Bangladesh </p>
                            </div>
                            <ul className="social-link w-50">
                                <li>
                                    <a href="#" target="_blank" rel="noopener noreferrer">
                                        Twitter
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.linkedin.com/in/kanakmahmud/" target="_blank" rel="noopener noreferrer" >
                                        LinkedIn
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.instagram.com/chintaarchitects/" target="_blank" rel="noopener noreferrer" >
                                        Instagram
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.facebook.com/chintasthapatya" target="_blank" rel="noopener noreferrer" >
                                        Facebook
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-6">
                            <div className="gmap_canvas">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    id="gmap_canvas"
                                    src="https://maps.google.com/maps?q=Chinta,%20CHINTA%20STHAPATYA,%20Level-5&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                    frameBorder="0"
                                    scrolling="no"
                                />
                            </div>
                        </div>
                    </div>

                </div>
                <div className="pb-4">
                    <Footer />
                </div>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="text-danger close-btn" onClick={closeModal} >
                    <FaTimes />
                </div>
                <div className="popup-inner">

                    <form className="user-form">
                        <div className="input-group">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                            />
                            {/* <span className="error pt-1">This is a error message</span> */}
                        </div>
                        <div className="input-group">
                            <input
                                type="text"
                                name="company"
                                placeholder="Company Name"
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="text"
                                name="subject"
                                placeholder="Subject"
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="text"
                                name="email"
                                placeholder="Email Address"
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="text"
                                name="contact"
                                placeholder="Contact Number(Optional)"
                            />
                        </div>
                        <div className="text-end">
                            <button className='send-btn'>
                                &#9654;
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>

        </Fragment>
    );
};

export default HomePageContact;
