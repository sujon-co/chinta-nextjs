import { AxiosResponse } from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { getPlaiceholder } from 'plaiceholder';
import { IAbout, IStudio } from 'server/interface';
import instance from 'src/api/httpService';
import Layout from 'src/components/Common/Layout';
import Info from 'src/components/Info';
import { AboutWithImage } from 'src/components/Info/about';
import { StudioItem } from 'src/components/Info/studio';

interface Props {
    studios: StudioItem[];
    about: AboutWithImage;
}

const InfoPage: NextPage<Props> = ({ studios, about }) => {
    return (
        <Layout>
            <Info studios={studios} about={about} />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const { data: studio } = await instance.get<AxiosResponse<IStudio[]>>(
        '/info/studios'
    );
    const { data: _about } = await instance.get<{ data: IAbout[] }>(
        '/info/about'
    );
    const aboutData = _about.data[0];

    const [studios, about] = await Promise.all([
        await Promise.all(
            studio.data.map(async (data) => {
                const { base64, img } = await getPlaiceholder(data.photoUrl);
                return {
                    ...img,
                    ...data,
                    base64: base64,
                };
            })
        ),
        await getPlaiceholder(aboutData.photoUrl).then(({ base64, img }) => {
            return {
                ...img,
                ...aboutData,
                base64: base64,
            };
        }),
    ]);

    return {
        props: {
            studios,
            about,
        },
    };
};

export default InfoPage;
