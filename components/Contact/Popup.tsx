import { NextPage } from 'next';
import { Dispatch, SetStateAction } from 'react';
import { FaTimes } from 'react-icons/fa';

interface IProps {
    setShowModal: Dispatch<SetStateAction<boolean>>;
}

const Popup: NextPage<IProps> = ({ setShowModal }) => {
    return (
        <div className="popup">
            <div className="popup-inner">
                <div
                    className="text-danger close-btn"
                    onClick={() => setShowModal(false)}
                >
                    <FaTimes />
                </div>
                <form className="user-form">
                    <div className="input-group">
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                        />
                        <span className="error">this is a error message</span>
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
                        <button className=" btn btn-outline-secondary btn-sm py-0 px-1">
                            &#10004;
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Popup;
