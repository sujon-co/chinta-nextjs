import ReactFullpage from '@fullpage/react-fullpage';
import { AxiosResponse } from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { getPlaiceholder } from 'plaiceholder';
import { Fragment, useState } from 'react';
import { IAbout, IAward, IStudio } from 'server/interface';
import instance from 'src/api/httpService';
import Header from 'src/components/Common/Header';
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
    awards: IAward[];
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

const InfoPage: NextPage<Props> = ({ studios, about, awards }) => {
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
        <Fragment>
            <Header />
            <div className='container'>
                <ul id="myMenu" style={{ position: 'fixed', left: '0px', top: '100px', width: '100px', height: '400px', background: "lightblue" }}>
                    <li data-menuanchor="info-about"> <a href='#info-about'>About</a> </li>
                    <li data-menuanchor="info-studio"> <a href='#info-studio'>Studio</a> </li>
                    <li data-menuanchor="info-award"> <a href='#info-award'>Award</a> </li>
                    <li data-menuanchor="info-jobs"> <a href='#info-jobs'>Jobs</a> </li>
                    <li data-menuanchor="info-shops"> <a href='#info-shops'>Shops</a> </li>
                </ul>
                <ReactFullpage
                    pluginWrapper={pluginWrapper}
                    onLeave={onLeave}
                    scrollBar={false}
                    autoScrolling
                    licenseKey='YOUR_KEY_HERE'
                    // autoScrolling
                    // fitToSection
                    // scrollOverflowReset
                    // menu='#myMenu'
                    // css3
                    // anchors={['info-about', 'info-studio', 'info-award', 'info-jobs', 'info-shops']}
                    // fadingEffect={'sections'}
                    // sectionsColor={sectionsColor}
                    render={(comp) =>
                        <ReactFullpage.Wrapper  >
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
                                <div className="">
                                    {awards.map((award) => (
                                        <div className="d-flex gap-2" key={award.awardName}>
                                            <span> {award.year} </span>
                                            <span> {award.awardName} </span>
                                            <a href={award.programUrl} target="_blank" rel="noreferrer">
                                                {award.programName}
                                            </a>
                                            <span> Organized by</span>
                                            <a href={award.organizationUrl} target="_blank" rel="noreferrer"> {award.organizedBy} </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="section" id='info-jobs'>
                                <h1>Section Jobs</h1>
                            </div>
                            <div className="section" id='info-shops'>
                                <h1>Section Shops</h1>
                            </div>
                        </ReactFullpage.Wrapper>
                    }
                />
            </div>
        </Fragment>
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

    const { data: awards } = await instance.get<{ data: IAward[]; }>('/info/awards');

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
            awards: awards.data,
        },
    };
};

export default InfoPage;
