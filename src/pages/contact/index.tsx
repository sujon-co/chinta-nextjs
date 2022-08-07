import { NextPage } from 'next';
import Footer from 'src/components/Common/Footer';
import Header from 'src/components/Common/Header';
import Contact from 'src/components/Contact';

interface Props { }

const ContactPage: NextPage<Props> = () => {
    return (
        <div className='page-wrapper'>
            <div className="container__header">
                <Header />
            </div>
            <div className="container__main">
                <Contact />
            </div>
            <div className="container__footer">
                <Footer />
            </div>
        </div>
    );
};

export default ContactPage;

