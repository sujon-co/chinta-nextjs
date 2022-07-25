import { NextPage } from 'next';
import Layout from 'src/components/Common/Layout';
import Info from 'src/components/Info';

interface Props {}

const InfoPage: NextPage<Props> = () => {
    return (
        <Layout>
            <Info />
        </Layout>
    );
};

export default InfoPage;
