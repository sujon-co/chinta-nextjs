import { NextPage } from 'next';
import Head from 'next/head';
import Header from 'src/components/Common/Header';
import HomePageContact from 'src/components/HomePageContact';

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
                    <HomePageContact />
                </div>
                <div className="container__footer">
                    {/* <Footer /> */}
                </div>
            </div>
        </>
    );
};

export default ContactPage;

