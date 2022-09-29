import { FC } from 'react';
import { FaTimes } from 'react-icons/fa';
import Modal from 'react-modal';
import { IApply } from 'server/interface';
import { config } from 'src/config';

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
    applier: IApply;
}

const ViewApplier: FC<IModalProps> = ({ closeModal, modalIsOpen, applier }) => {


    return <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Apply Modal"
    >

        <div className="text-danger close-btn" onClick={closeModal} >
            <FaTimes />
        </div>
        <div className="popup-inner" style={{ width: '600px' }} >
            <div className="" style={{ width: '600px' }}>
                {/* Show applier details */}
                <p className="text-dark mb-2"> <b>Name:</b> {applier.name}</p>
                <p className="text-dark mb-2"> <b>Email:</b> {applier.email}</p>
                <p className="text-dark mb-2"> <b>Phone:</b> {applier.phone}</p>
                <p className="text-dark mb-2"> <b>Position:</b> {applier.position}</p>
                <p className="text-dark mb-2"> <b>Description: </b> <br />{applier.description}</p>
                <p><a className='btn btn-success btn-sm fs-12 text-decoration-none mt-2' href={config.imageUploadUrl + applier.file} target="_blank" rel="noopener noreferrer">Download</a></p>
            </div>
        </div>
    </Modal>;
};

export default ViewApplier;
