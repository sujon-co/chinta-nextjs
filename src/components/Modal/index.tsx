import { FC, SyntheticEvent } from 'react';
import { VscChevronRight, VscClose } from 'react-icons/vsc';
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
    mailSubmitHandler: (event: SyntheticEvent) => void;
    inputHandler: (event: any) => void;
    modalIsOpen: boolean;
}

const MailPop: FC<IModalProps> = ({ closeModal, mailSubmitHandler, inputHandler, modalIsOpen }) => {

    return <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
    >
        <div className=" close-btn" onClick={closeModal} >
            <VscClose />
        </div>
        <div className="popup-inner">

            <form className="user-form" onSubmit={mailSubmitHandler}>
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
                        name="company"
                        placeholder="Company Name (Optional)"
                        onChange={inputHandler}
                    />
                </div>
                <div className="input-group">
                    <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
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
                        name="number"
                        placeholder="Contact Number (Optional)"
                        onChange={inputHandler}
                    />
                </div>
                <div className="text-end">
                    <button type='submit' className='send-btn'  >
                        <VscChevronRight />
                    </button>
                </div>
            </form>
        </div>
    </Modal>;
};

export default MailPop;
