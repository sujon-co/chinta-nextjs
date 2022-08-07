import ReactFullpage from '@fullpage/react-fullpage';
import { AxiosResponse } from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { getPlaiceholder } from 'plaiceholder';
import { useState } from 'react';
import { IAbout, IStudio } from 'server/interface';
import instance from 'src/api/httpService';
import Layout from 'src/components/Common/Layout';
import About, { AboutWithImage } from 'src/components/Info/about';
import Studio, { StudioItem } from 'src/components/Info/studio';
import { config } from 'src/config';
import { scrollHandler } from 'src/utils';

// NOTE: if using fullpage extensions/plugins put them here and pass it as props.
const pluginWrapper = () => {
    /*
     * require('../static/fullpage.scrollHorizontally.min.js'); // Optional. Required when using the "scrollHorizontally" extension.
     */
};


interface Props {
    studios: StudioItem[];
    about: AboutWithImage;
}
const originalColors = [
    'salmon',
    'lightblue',
    '#fc6c7c',
    '#435b71',
    'orange',
    'purple',
    'yellow',
];

const InfoPage: NextPage<Props> = ({ studios, about }) => {
    const [sectionsColor, setSectionsColor] = useState(originalColors);
    const onLeave = (origin: any, destination: any, direction: any) => {
        // console.log('onLeave', { origin, destination, direction });
        // arguments are mapped in order of fullpage.js callback arguments do something
        // with the event
    };

    const moveSectionDown = () => {
        //@ts-ignore
        fullpage_api.moveSectionDown();
    };




    return (
        <Layout>
            <div className='container'>
                <div style={{ position: 'fixed', left: '0px', top: '100px', width: '100px', height: '400px', background: "red" }}>
                    <li> <a href='#info-about'>About</a> </li>
                    <li> <a href='#info-studio'>Studio</a> </li>
                    <li> <a href='#info-award'>Award</a> </li>
                    <li> <a href='#info-jobs'>Jobs</a> </li>
                    <li> <a href='#info-shops'>Shops</a> </li>
                </div>
                <ReactFullpage
                    pluginWrapper={pluginWrapper}
                    onLeave={onLeave}
                    scrollBar={false}
                    autoScrolling
                    scrollOverflowReset
                    scrollOverflow
                    sectionsColor={sectionsColor}
                    render={(comp) =>
                        <ReactFullpage.Wrapper>
                            <div className="section" id='info-about'>
                                <div className="info-section" >
                                    <About about={about} />
                                </div>
                            </div>
                            <div className="section" id='info-studio'>
                                <div className="info-section scroll" style={{ height: '80vh', overflowY: 'scroll', }} onWheel={scrollHandler} >
                                    <div className="pb-1">
                                        <Studio studios={studios} />
                                    </div>
                                </div>
                            </div>
                            <div className="section" id='info-award'>
                                <h1>Section Award</h1>
                            </div>
                            <div className="section" id='info-jobs'>
                                <h1>Section Jobs</h1>
                            </div>
                        </ReactFullpage.Wrapper>
                    }
                />
            </div>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const { data: studio } = await instance.get<AxiosResponse<IStudio[]>>(
        '/info/studios'
    );
    const { data: _about } = await instance.get<{ data: IAbout[]; }>(
        '/info/about'
    );
    const aboutData = _about.data[0];

    const [studios, about] = await Promise.all([
        await Promise.all(
            studio.data.map(async (data) => {
                const { base64, img } = await getPlaiceholder(`${config.imageUploadUrl}${data.photoUrl}`);
                return {
                    ...img,
                    ...data,
                    base64: base64,
                };
            })
        ),
        await getPlaiceholder(`${config.imageUploadUrl}${aboutData.photoUrl}`).then(({ base64, img }) => {
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
