import { NextPage } from 'next';
import Contact from 'src/components/Contact';
import Layout from 'src/components/Layout';

interface Props {}

const ContactPage: NextPage<Props> = () => {
    return (
        <Layout>
            <Contact />
        </Layout>
    );
};

export default ContactPage;
