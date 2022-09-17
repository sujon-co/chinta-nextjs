import { Fragment, SyntheticEvent, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { FiChevronRight } from 'react-icons/fi';
import { imageUploadInstance } from 'src/api/httpService';
import { scrollHandler } from 'src/utils';
import Footer from '../Common/Footer';
import MailPop from '../Modal';


const HomePageContact = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [data, setData] = useState({});
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    function openModal() { setIsOpen(true); }
    function closeModal() { setIsOpen(false); }

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
        toast.success('Mail Send Successfully!');
        toast.promise(
            fetchData(),
            {
                loading: 'Mail Sending...',
                success: (data) => `Mail Send Successfully!`,
                error: (err) => `Email send Failed!, Please Try Again'`,
            },
            {
                style: {
                    background: '#363636',
                    color: '#fff',
                }
            },
        );
        // try {
        //     const newData = { ...data, message };
        //     const mail = await imageUploadInstance.post<{ message: string; }>('/mail/send', newData);
        //     if (mail.data.message) {
        //         toast.success('Mail Send Successfully!');
        //     }
        //     closeModal();
        // } catch (error) {
        //     toast.error('Email send Failed!, Please Try Again');
        // }

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
                                <div className="type-writer-box-3">
                                    <textarea name="" id="message" ref={textAreaRef} onChange={textAreaHandler} onWheel={scrollHandler} />
                                    <button className='send-btn' onClick={openModal} >
                                        <FiChevronRight />
                                    </button>
                                </div>
                            </div>
                            <h6 className='mb-2'> We would love to hear from you so don&lsquo;t hesitate to say hi! </h6>

                            <div className="mb-2">
                                <div className="">
                                    <a style={{ textDecoration: 'none' }} href="tel:+8801670785096">+8801670785096</a>
                                </div>
                                <div>
                                    <a target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }} href="mailto:info@chintaarchitects.com">info@chintaarchitects.com</a>
                                </div>
                            </div>
                            <p className='mb-0'> CHINTA STHAPATYA, Level-5, House-25/2, Road No-15 (new) 28 (old) <br /> Dhaka 1205, Bangladesh </p>
                        </div>
                    </div>
                    <div className="col-lg-6" >
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
