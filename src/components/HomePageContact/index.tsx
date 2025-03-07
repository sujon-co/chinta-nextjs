import { Fragment, SyntheticEvent, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { FiChevronRight } from 'react-icons/fi';
import { IContact } from 'server/interface';
import { imageUploadInstance } from 'src/api/httpService';
import { useSizeContext } from 'src/contexts/ResponseContextProvider';
import { scrollHandler } from 'src/utils';
import Footer from '../Common/Footer';
import MailPop from '../Modal';
import TypeModal from '../Modal/TypeBox';

interface Props {
    showFooter?: boolean;
    contact: IContact;
}

const HomePageContact = ({ contact, showFooter = true }: Props) => {
    const { isMobile, isDesktop } = useSizeContext();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [typeModalOpen, setTypeModalOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [data, setData] = useState({});
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [showInput, setShowInput] = useState(false);


    function openModal() { setIsOpen(true); }
    function closeModal() { setIsOpen(false); }
    const typeModalOpenHandler = () => setTypeModalOpen(true);
    const typeModalCloseHandler = () => {
        setTypeModalOpen(false);
        setShowInput(false);
    };

    const heightHandler = (textArea: any) => {
        if (textArea.scrollHeight > 34) {
            textArea.style.height = textArea.scrollHeight + 'px';
            textArea.style.overflow = 'hidden';
        }
        if (textArea.scrollHeight > 270) {
            textArea.style.height = 270 + 'px';
            textArea.style.overflowY = 'auto';
            textArea.style.overflowX = 'hidden';
        }
    };

    const inputHandler = (event: any) => {
        const { name, value } = event.target;
        setData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };
    const textAreaHandler = (event: any) => {
        const { value } = event.target;
        setMessage(value);

        if (textAreaRef.current) {
            heightHandler(textAreaRef.current);
        }

    };


    const fetchData = async (): Promise<unknown> => {
        const newData = { ...data, message };
        return await imageUploadInstance.post('/mail/send', newData);
    };

    const mailSubmitHandler = async (event: SyntheticEvent) => {
        event.preventDefault();
        toast.promise(
            fetchData(),
            {
                loading: 'Mail Sending...',
                success: (data) => {
                    closeModal();
                    return `Mail Send Successfully!`;
                },
                error: (err) => `Email send Failed!, Please Try Again'`,
            },
            {
                style: {
                    background: '#363636',
                    color: '#fff',
                }
            },
        );
    };

    useEffect(() => {
        if (!message && textAreaRef.current) {
            textAreaRef.current.style.height = 30 + 'px';
        }
    }, [message]);


    return (
        <Fragment>
            <div className="container contact-container" onWheel={scrollHandler}>
                <div className="row g-3">
                    <div className="col-lg-6">
                        <div className="wrapper">
                            <div className="type-writer-wrapper">
                                {isMobile && (<>
                                    <div
                                        className="tagline"
                                        style={{ display: showInput ? 'none' : 'block', }}
                                        onClick={() => {
                                            setShowInput(true);
                                            typeModalOpenHandler();
                                        }}
                                    >
                                        <p>DROP US A LINE</p>
                                    </div>
                                    <TypeModal modalIsOpen={typeModalOpen} closeModal={typeModalCloseHandler} >
                                        <div className="type-writer-wrapper" style={{ height: '300px' }}>
                                            <div className="type-writer-box-3" >
                                                <textarea name="" id="message" ref={textAreaRef} onChange={textAreaHandler} onWheel={scrollHandler} />
                                                <button className='send-btn' onClick={openModal} >
                                                    <FiChevronRight />
                                                </button>
                                            </div>
                                        </div>
                                    </TypeModal>
                                </>)}
                                {isDesktop && (
                                    <>
                                        <div
                                            className="tagline"
                                            style={{ display: showInput ? 'none' : 'block', }}
                                            onClick={() => setShowInput(true)}
                                        >
                                            <p>DROP US A LINE</p>
                                        </div>
                                        <div className="type-writer-box-3" style={{ display: showInput ? 'block' : 'none', }}>
                                            <textarea name="" id="message" ref={textAreaRef} onChange={textAreaHandler} onWheel={scrollHandler} />
                                            <button className='send-btn' onClick={openModal} >
                                                <FiChevronRight />
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>

                            <h6 className='mb-2' style={{ fontWeight: '300' }}> {contact.text} </h6>
                            <div className="mb-2">
                                <div className="">
                                    <a style={{ textDecoration: 'none' }} href={`tel:${contact.phone}`}>{contact.phone}</a>
                                </div>
                                <div>
                                    <a target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }} href={`mailto:${contact.email}`}> {contact.email} </a>
                                </div>
                            </div>
                            <div className='mb-0' dangerouslySetInnerHTML={{ __html: contact.address }} />
                        </div>
                    </div>
                    <div className="col-lg-6" >
                        <div className="gmap_canvas">
                            <iframe
                                width="100%"
                                height="100%"
                                id="gmap_canvas"
                                src="https://maps.google.com/maps?q=Chinta,%20CHINTA%20STHAPATYA,%20Level-5&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                frameBorder="0"
                                scrolling="no"
                            />
                        </div>
                    </div>
                </div>
            </div>
            {showFooter &&
                <div className="pb-4 contact-footer">
                    <Footer />
                </div>
            }


            <MailPop
                inputHandler={inputHandler}
                closeModal={closeModal}
                mailSubmitHandler={mailSubmitHandler}
                modalIsOpen={modalIsOpen}
            />



        </Fragment >
    );
};

export default HomePageContact;
