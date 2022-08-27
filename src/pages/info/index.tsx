import ReactFullpage from '@fullpage/react-fullpage';
import { AxiosResponse } from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Fragment, useState } from 'react';
import { IAbout, IAward, INews, IShop, IStudio } from 'server/interface';
import instance from 'src/api/httpService';
import Header from 'src/components/Common/Header';
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

const InfoPage: NextPage<Props> = ({ studios, about, awards, shops, news }) => {
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

    console.log({ shops });


    return (
        <Fragment>
            <Head>
                <title>Chinta Sthapatya</title>
            </Head>
            <Header />
            <div className='container'>
                <ul id="myMenu">
                    <li data-menuanchor="info-about"> <a href='#info-about'>About</a> </li>
                    <li data-menuanchor="info-studio"> <a href='#info-studio'>Studio</a> </li>
                    <li data-menuanchor="info-award"> <a href='#info-award'>Award</a> </li>
                    <li data-menuanchor="info-shops"> <a href='#info-shops'>Shop</a> </li>
                    <li data-menuanchor="info-jobs"> <a href='#info-jobs'>Jobs</a> </li>
                    <li data-menuanchor="info-news"> <a href='#info-news'>News</a> </li>
                </ul>
                <ReactFullpage
                    pluginWrapper={pluginWrapper}
                    onLeave={onLeave}
                    scrollBar={false}
                    licenseKey='YOUR_KEY_HERE'
                    sectionSelector={SECTION_SEL}
                    anchors={['info-about', 'info-studio', 'info-award', 'info-shops', 'info-jobs', 'info-news']}
                    css3={true}
                    menu="#myMenu"
                    autoScrolling={true}
                    // sectionsColor={sectionsColor}
                    render={(comp) =>
                        <ReactFullpage.Wrapper  >
                            <div className={SEL} >
                                <div className="info-section" >
                                    <About about={about} />
                                </div>
                            </div>
                            <div className={SEL} >
                                <div className="info-section scroll" style={{ height: '80vh', overflowY: 'scroll', }} onWheel={scrollHandler} >
                                    <div className="pb-1">
                                        <Studio studios={studios} />
                                    </div>
                                </div>
                            </div>
                            <div className={SEL}>
                                <div className="">
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
                                {shops.map(shop => (
                                    <ShopItem shop={shop} key={shop.title} />
                                ))}
                            </div>
                            <div className={SEL} >
                                <div className="jobs-section" onWheel={scrollHandler}>
                                    <div className="col-md-10 mx-auto">
                                        <p>Our journey started in Copenhagen in 2005, followed by an office in NYC in 2010, London in 2016 and Barcelona in 2019. We have completed about 35 buildings in 10+ countries and never limit ourselves to a specific region – we go where the projects are – even if its Mars!</p>
                                        <Image src="/jobs.jpeg" alt='jobs' layout='responsive' width={400} height={200} />
                                        <p>Over the last two decades, we have grown organically to a 500+ person family worldwide. Working on new projects, typologies and challenges – we are joined by new BIGsters with the skills, experience and expertise our projects need! This is how we continue to grow and get better at what we do.
                                            If you are interested in joining Chinta , view our current opportunities
                                            <a className='px-1' href="" style={{ color: '#0087ca' }}> Apply Here </a> . We look forward to hearing from you!</p>
                                    </div>
                                </div>
                            </div>
                            <div className={SEL} >
                                <div className="col-md-10 mx-auto">
                                    <div className='news-section' onWheel={scrollHandler}>
                                        {news.map(news => (
                                            <NewsItem news={news} key={news.title} />
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </ReactFullpage.Wrapper>
                    }
                />
            </div>
        </Fragment >
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const { data: studio } = await instance.get<AxiosResponse<IStudio[]>>('/info/studios');
    const { data: _about } = await instance.get<{ data: IAbout[]; }>('/info/about');

    const { data: awards } = await instance.get<{ data: IAward[]; }>('/info/awards');
    const { data: _shops } = await instance.get<{ data: IShop[]; }>('/info/shops');
    const { data: _news } = await instance.get<{ data: INews[]; }>('/info/news');

    return {
        props: {
            studios: studio.data,
            about: _about.data[0],
            awards: awards.data,
            shops: _shops.data,
            news: _news.data,
        },
    };
};

export default InfoPage;
