import ReactFullpage from '@fullpage/react-fullpage';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { Fragment } from 'react';
import { APIResponse, IAbout, IAward, IJob, INews, IShop, IStudio } from 'server/interface';
import instance from 'src/api/httpService';
import Header from 'src/components/Common/Header';
import HomePageContact from 'src/components/HomePageContact';
import MyImage from 'src/components/Image';
import About from 'src/components/Info/about';
import ShopItem from 'src/components/Info/shop/ShopItem';
import Studio from 'src/components/Info/studio';
import NewsItem from 'src/components/NewsItem';
import { scrollHandler } from 'src/utils';

// NOTE: if using fullpage extensions/plugins put them here and pass it as props.
const pluginWrapper = () => {
    /*
     * require('../static/fullpage.scrollHorizontally.min.js'); // Optional. Required when using the "scrollHorizontally" extension.
     */
};
const SEL = "custom-section";
const SECTION_SEL = `.${SEL}`;


interface Props {
    studios: IStudio[];
    about: IAbout;
    awards: IAward[];
    shops: IShop[];
    news: INews[];
    job: IJob;
}

const InfoPage: NextPage<Props> = ({ studios, about, awards, shops, news, job }) => {
    const onLeave = (origin: any, destination: any, direction: any) => {
        // console.log('onLeave', { origin, destination, direction });
        // arguments are mapped in order of fullpage.js callback arguments do something
        // with the event
    };

    console.log({ job });

    const moveSectionDown = () => {
        //@ts-ignore
        fullpage_api.moveSectionDown();
    };

    return (
        <Fragment>
            <Head>
                <title>Chinta Sthapatya</title>
            </Head>
            <Header />
            <div className="info-page-wrapper">
                <ul id="myMenu">
                    <li data-menuanchor="info-about"> <a href='#info-about'>About</a> </li>
                    <li data-menuanchor="info-studio"> <a href='#info-studio'>Studio</a> </li>
                    <li data-menuanchor="info-award"> <a href='#info-award'>Award</a> </li>
                    <li data-menuanchor="info-shops"> <a href='#info-shops'>Shop</a> </li>
                    <li data-menuanchor="info-jobs"> <a href='#info-jobs'>Jobs</a> </li>
                    <li data-menuanchor="info-news"> <a href='#info-news'>News</a> </li>
                    <li data-menuanchor="info-contact"> <a href='#info-contact'>Contact</a> </li>
                </ul>
                <div className='container'>
                    <ReactFullpage
                        pluginWrapper={pluginWrapper}
                        onLeave={onLeave}
                        scrollBar={false}
                        licenseKey='YOUR_KEY_HERE'
                        sectionSelector={SECTION_SEL}
                        anchors={['info-about', 'info-studio', 'info-award', 'info-shops', 'info-jobs', 'info-news', 'info-contact']}
                        css3={true}
                        menu="#myMenu"
                        autoScrolling={true}
                        render={(comp) =>
                            <ReactFullpage.Wrapper  >
                                <div className={`${SEL} about-section-overwrite`} >
                                    <div className="info-section info-about-overwrite" >
                                        <About about={about} />
                                    </div>
                                </div>
                                <div className={SEL} >
                                    <div className="info-section scroll" style={{ height: '80vh' }} onWheel={scrollHandler} >
                                        <div className="pb-1">
                                            <Studio studios={studios} />
                                        </div>
                                    </div>
                                </div>
                                <div className={SEL}>
                                    <div className="info-section scroll" style={{ height: '80vh' }} onWheel={scrollHandler} >
                                        {awards.map((award) => (
                                            <div className="d-flex gap-2 mb-2" key={award.awardName}>
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
                                <div className={SEL} >
                                    <div className="info-section scroll" style={{ height: '80vh' }} onWheel={scrollHandler} >
                                        {shops.map(shop => (
                                            <ShopItem shop={shop} key={shop.title} />
                                        ))}
                                    </div>
                                </div>
                                <div className={SEL} >
                                    <div className="info-section scroll" style={{ height: '80vh' }} onWheel={scrollHandler} >
                                        <div className="jobs">

                                            <div className="row">
                                                <div className="col-md-12 mb-3">
                                                    <MyImage
                                                        layout="responsive"
                                                        className=" img-fluid mt-1"
                                                        src={job.image}
                                                        alt={job.title}
                                                        placeholder="blur"
                                                        height={280}
                                                        width={450}
                                                    />
                                                </div>
                                                <div className="jobs-title mb-3">
                                                    <h4>{job.title}</h4>
                                                </div>
                                                <div className="col-md-12 jobs-description">
                                                    <div className="" dangerouslySetInnerHTML={{ __html: job.requirements }} />
                                                </div>
                                                <div className="col-md-12 jobs-description">
                                                    <div className="" dangerouslySetInnerHTML={{ __html: job.description }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={SEL} >
                                    <div className="info-section scroll" style={{ height: '80vh' }} onWheel={scrollHandler} >
                                        {news.map(news => (
                                            <NewsItem news={news} key={news.title} />
                                        ))}
                                    </div>
                                </div>
                                <div className={SEL} >
                                    <div className="info-section scroll info-contact" onWheel={scrollHandler} >
                                        <HomePageContact />
                                    </div>
                                </div>
                            </ReactFullpage.Wrapper>
                        }
                    />
                </div>
            </div>
        </Fragment >
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const { data: studio } = await instance.get<APIResponse<IStudio[]>>('/info/studios');
    const { data: _about } = await instance.get<APIResponse<IAbout[]>>('/info/about');

    const { data: awards } = await instance.get<{ data: IAward[]; }>('/info/awards');
    const { data: _shops } = await instance.get<{ data: IShop[]; }>('/info/shops');
    const { data: _news } = await instance.get<{ data: INews[]; }>('/info/news');
    const { data: _job } = await instance.get<APIResponse<IJob[]>>('/info/jobs');

    return {
        props: {
            studios: studio.data,
            about: _about.data[0],
            awards: awards.data,
            shops: _shops.data,
            news: _news.data,
            job: _job.data[0]
        },
    };
};

export default InfoPage;
