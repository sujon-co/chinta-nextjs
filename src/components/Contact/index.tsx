import { NextPage } from 'next';

interface Props {}

const Contact: NextPage<Props> = () => {
    return (
        <div className="container pt-5">
            <div className="row">
                <div className="col-md-6">Contact</div>
                <div className="col-md-6">
                    <div className="mapouter">
                        {/* <div className="gmap_canvas">
                            <iframe
                                width="200"
                                height="200"
                                id="gmap_canvas"
                                src="https://maps.google.com/maps?q=Chinta%20Sthapatya&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                frameBorder="0"
                                scrolling="no"
                                marginHeight={0}
                                marginWidth={0}
                            />
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
