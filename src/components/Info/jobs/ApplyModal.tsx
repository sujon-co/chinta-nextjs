import { FC } from 'react';
import { FaTimes } from 'react-icons/fa';
import { FiChevronRight } from 'react-icons/fi';
import Modal from 'react-modal';

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
interface IModalProps {
    closeModal: () => void;
    modalIsOpen: boolean;
}

const ApplyModal: FC<IModalProps> = ({ closeModal, modalIsOpen }) => {

    const inputHandler = () => {
        console.log({ name: 'suon' });
    };

    const onSubmitHandler = () => {

    };


    return <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Apply Modal"
    >
        <div className="text-danger close-btn" onClick={closeModal} >
            <FaTimes />
        </div>
        <div className="popup-inner">

            <form className="user-form" onSubmit={onSubmitHandler}>
                <div className="input-group">
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        required
                        onChange={inputHandler}
                    />
                </div>
                <div className="input-group">
                    <input
                        type="text"
                        name="email"
                        placeholder="Email Address"
                        onChange={inputHandler}
                    />
                </div>
                <div className="input-group">
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number (Optional)"
                        onChange={inputHandler}
                    />
                </div>
                <div className="input-group">
                    <input
                        type="text"
                        name="email"
                        placeholder="Email Address"
                        required
                        onChange={inputHandler}
                    />
                </div>
                <div className="input-group">
                    <input
                        type="text"
                        name="position"
                        placeholder="Apply Position"
                        onChange={inputHandler}
                    />
                </div>
                <div className="input-group">
                    <textarea
                        cols={6}
                        name="description"
                        placeholder="Write yourself"
                        onChange={inputHandler}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="" className='mb-2'>  <b>Attach File</b> </label>
                    <input type="file" name="" id="" />
                </div>

                <div className="text-end">
                    <button type='submit' className='send-btn'  >
                        <FiChevronRight />
                    </button>
                </div>
            </form>
        </div>
    </Modal>;
};

export default ApplyModal;
