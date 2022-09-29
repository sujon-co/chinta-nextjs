import { FC, useState } from 'react';
import ApplyModal from './ApplyModal';

interface IJobProps {
}

const JobApply: FC<IJobProps> = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return <>
        <span style={{ textDecoration: 'underline', cursor: "pointer" }} onClick={openModal}> here</span>
        <ApplyModal modalIsOpen={isModalOpen} closeModal={closeModal} />
    </>;
};

export default JobApply;
