import { NextPage } from 'next';
import { useState } from 'react';

interface Props { }

const Contact: NextPage<Props> = () => {
    const [showInput, setShowInput] = useState(false);
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="wrapper">
                        <div className="type-writer-box">
                            <textarea spellCheck="false" autoCorrect='false' autoComplete='false' />
                            <button className='send-btn' >
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
                        <h6>
                            We would love to hear from you so don&lsquo;t
                            hesitate to say hi!
                        </h6>

                        <div className="mb-2">
                            <div className="">+8801970785096</div>
                            <div>info@chintaarchitects.com</div>
                        </div>
                        <p>
                            CHINTA STHAPATYA, Level-5, House-25/2, Road
                            No-15 (new) 28 (old)
                            <br />
                            Dhaka 1205, Bangladesh
                        </p>
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
    );
};

export default Contact;
