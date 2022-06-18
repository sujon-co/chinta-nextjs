import { NextPage } from 'next';
import { useState } from 'react';

interface Props {}

const Contact: NextPage<Props> = () => {
    const [showInput, setShowInput] = useState(false);
    return (
        <div className="container pt-5">
            <div className="row">
                <div className="col-md-5">
                    <div className="wrapper">
                        <div className=""></div>
                        {!showInput && (
                            <div
                                className="tagline"
                                v-show="!show"
                                onClick={() => setShowInput(true)}
                            >
                                <p>DROP US A LINE</p>
                            </div>
                        )}

                        {showInput && (
                            <div className="feedbackInput">
                                <input type="text" v-model="feedbacktxt" />
                                <button>&#9654;</button>
                            </div>
                        )}
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
                            CHINTA STHAPATYA, Level-5, House-25/2, Road No-15
                            (new) 28 (old)
                            <br />
                            Dhaka 1205, Bangladesh
                        </p>
                    </div>
                    <ul className="social-link">
                        <li>
                            <a href="#">Twitter</a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/kanakmahmud/">
                                LinkedIn
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/chintaarchitects/">
                                Instagram
                            </a>
                        </li>
                        <li>
                            <a href="https://www.facebook.com/chintasthapatya">
                                Facebook
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="col-md-6">
                    <div className="gmap_canvas">
                        {/* <iframe
                            width="600"
                            height="500"
                            id="gmap_canvas"
                            src="https://maps.google.com/maps?q=Chinta,%20CHINTA%20STHAPATYA,%20Level-5&t=&z=13&ie=UTF8&iwloc=&output=embed"
                            frameBorder="0"
                            scrolling="no"
                        /> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
