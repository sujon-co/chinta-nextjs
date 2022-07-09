import { NextPage } from 'next';
import Info from 'src/components/Info';
import Layout from 'src/components/Layout';

interface Props {}

const InfoPage: NextPage<Props> = () => {
    return (
        <Layout>
            <Info />
        </Layout>
    );
};

export default InfoPage;
