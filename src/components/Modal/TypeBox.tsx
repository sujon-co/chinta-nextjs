import { FC } from 'react';
import { VscClose } from 'react-icons/vsc';
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
    children: any;
}

const TypeModal: FC<IModalProps> = ({ closeModal, modalIsOpen, children }) => {

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
            <div className="user-form" >
                {children}
            </div>
        </div>
    </Modal>;
};

export default TypeModal;
