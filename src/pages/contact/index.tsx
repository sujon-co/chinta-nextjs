import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { IContact } from 'server/interface';
import instance from 'src/api/httpService';
import Footer from 'src/components/Common/Footer';
import Header from 'src/components/Common/Header';
import HomePageContact from 'src/components/HomePageContact';

interface Props {
    contact: IContact;
}

const ContactPage: NextPage<Props> = ({ contact }) => {
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
                    <HomePageContact contact={contact} showFooter={false} />
                </div>
                <div className="container__footer">
                    <Footer />
                </div>
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const { data: contact } = await instance.get<{ data: IContact[]; }>('/contact');

    return {
        props: {
            contact: contact.data[0],
        },
    };
};

export default ContactPage;

