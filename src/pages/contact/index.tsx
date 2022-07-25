import { NextPage } from 'next';
import Layout from 'src/components/Common/Layout';
import Contact from 'src/components/Contact';

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
