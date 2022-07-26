import { AxiosResponse } from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { getPlaiceholder } from 'plaiceholder';
import { IStudio } from 'server/interface';
import instance from 'src/api/httpService';
import Layout from 'src/components/Common/Layout';
import Info from 'src/components/Info';
import { StudioItem } from 'src/components/Info/studio';

interface Props {
    studios: StudioItem[];
}

const InfoPage: NextPage<Props> = ({ studios }) => {
    return (
        <Layout>
            <Info studios={studios} />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const { data: studio } = await instance.get<AxiosResponse<IStudio[]>>(
        '/info/studios'
    );

    const studios = await Promise.all(
        studio.data.map(async (data) => {
            const { base64, img } = await getPlaiceholder(data.photoUrl);
            return {
                ...img,
                ...data,
                base64: base64,
            };
        })
    );

    return {
        props: {
            studios,
        },
    };
};

export default InfoPage;
