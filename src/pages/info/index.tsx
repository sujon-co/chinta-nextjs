import ReactFullpage from '@fullpage/react-fullpage';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { Fragment } from 'react';
import { APIResponse, IAbout, IAward, IContact, IJob, INews, IShop, IStudio } from 'server/interface';
import instance from 'src/api/httpService';
import Header from 'src/components/Common/Header';
import HomePageContact from 'src/components/HomePageContact';
import MyImage from 'src/components/Image';
import About from 'src/components/Info/about';
import JobApply from 'src/components/Info/jobs';
import ShopItem from 'src/components/Info/shop/ShopItem';
import Studio from 'src/components/Info/studio';
import NewsItem from 'src/components/NewsItem';
import { useSizeContext } from 'src/contexts/ResponseContextProvider';
import { scrollHandler } from 'src/utils';


const SEL = "custom-section";
const SECTION_SEL = `.${SEL}`;


interface Props {
    studios: IStudio[];
    about: IAbout;
    awards: IAward[];
    shops: IShop[];
    news: INews[];
    job: IJob;
    contact: IContact;
}

const InfoPage: NextPage<Props> = ({ studios, about, awards, shops, news, job, contact }) => {
    const { isMobile, isDesktop } = useSizeContext();


    const InfoAllData = <>
        <div className={`${SEL} full-height about-section-overwrite`} >
            <div className="info-section info-about-overwrite" >
                <About about={about} />
            </div>
        </div>
        <div className={`${SEL} full-height`} >
            <div className="info-section scroll info-section-height" onWheel={scrollHandler} >
                <div className="pb-1">
                    <Studio studios={studios} />
                </div>
            </div>
        </div>
        <div className={`${SEL} full-height award-info-section`}>
            <div className="info-section scroll info-section-height" onWheel={scrollHandler} >
                {awards.map((award) => (
                    <div className=" award-item" key={award.awardName}>
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
        <div className={`${SEL} full-height`} >
            <div className="info-section scroll info-section-height" onWheel={scrollHandler} >
                {news.map(news => (
                    <NewsItem news={news} key={news.title} />
                ))}
            </div>
        </div>
        <div className={`${SEL} full-height`} >
            <div className="info-section scroll info-section-height" onWheel={scrollHandler} >
                {shops.map(shop => (
                    <ShopItem shop={shop} key={shop.title} />
                ))}
            </div>
        </div>
        <div className={`${SEL} full-height`} >
            <div className="info-section scroll info-section-height" onWheel={scrollHandler} >
                <div className="jobs">
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <MyImage
                                layout="responsive"
                                className="img-fluid"
                                src={job.image}
                                alt={job.title}
                                placeholder="blur"
                                height={900}
                                width={1975}
                                objectFit="contain"
                            />
                        </div>
                        <div className="col-md-12 jobs-description">
                            <div className="" dangerouslySetInnerHTML={{ __html: job.description }} />
                        </div>
                        <p>If you are interested in joining Chinta Sthapatya, submit your details <JobApply /> or view our current opportunities <a href={job.opportunity} target="_blank" rel="noreferrer" style={{ textDecoration: 'underline' }} > <b>here</b> </a>. We look forward to hearing from you!</p>
                    </div>
                </div>
            </div>
        </div>
        <div className={`${SEL} full-height`} >
            <div className="info-section scroll info-contact" onWheel={scrollHandler} >
                <HomePageContact contact={contact} />
            </div>
        </div>
    </>;

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
                    <li data-menuanchor="info-news"> <a href='#info-news'>News</a> </li>
                    <li data-menuanchor="info-shops"> <a href='#info-shops'>Shop</a> </li>
                    <li data-menuanchor="info-jobs"> <a href='#info-jobs'>Jobs</a> </li>
                    <li data-menuanchor="info-contact"> <a href='#info-contact'>Contact</a> </li>
                </ul>
                <div className='container'>
                    <>
                        {isDesktop && <ReactFullpage
                            scrollBar={false}
                            licenseKey='YOUR_KEY_HERE'
                            sectionSelector={SECTION_SEL}
                            anchors={['info-about', 'info-studio', 'info-award', 'info-news', 'info-shops', 'info-jobs', 'info-contact']}
                            css3={true}
                            menu="#myMenu"
                            autoScrolling={true}
                            render={(comp) =>
                                <ReactFullpage.Wrapper  >
                                    {InfoAllData}
                                </ReactFullpage.Wrapper>
                            }
                        />}
                        {isMobile && InfoAllData}
                    </>
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
    const { data: contact } = await instance.get<{ data: IContact[]; }>('/contact');

    return {
        props: {
            studios: studio.data,
            about: _about.data[0],
            awards: awards.data,
            shops: _shops.data,
            news: _news.data,
            job: _job?.data[0],
            contact: contact.data[0],
        },
    };
};

export default InfoPage;
