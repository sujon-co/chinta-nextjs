import Layout from 'components/Common/Layout';
import Info from 'components/Info';
import { NextPage } from 'next';

interface Props {}

const InfoPage: NextPage<Props> = () => {
    return (
        <Layout>
            <Info />
        </Layout>
    );
};

export default InfoPage;
