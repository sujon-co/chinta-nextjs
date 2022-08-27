import { NextPage } from 'next';
import Head from 'next/head';
import Footer from 'src/components/Common/Footer';
import Header from 'src/components/Common/Header';
import Contact from 'src/components/Contact';

interface Props { }

const ContactPage: NextPage<Props> = () => {
    return (
        <>
            <Head>
                <title>Chinta Sthapatya</title>
            </Head>
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
        </>
    );
};

export default ContactPage;

