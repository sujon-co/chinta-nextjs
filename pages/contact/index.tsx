import Layout from 'components/Common/Layout';
import Contact from 'components/Contact';
import { NextPage } from 'next';

interface Props {}

const ContactPage: NextPage<Props> = () => {
    return (
        <Layout>
            <div className="pt-30">
                <Contact />
            </div>
        </Layout>
    );
};

export default ContactPage;
