import { FC, useState } from 'react';
import ApplyModal from './ApplyModal';

interface IJobProps {
}

const JobApply: FC<IJobProps> = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return <div>
        <button onClick={openModal}>Open Modal</button>
        <ApplyModal modalIsOpen={isModalOpen} closeModal={closeModal} />
    </div>;
};

export default JobApply;
