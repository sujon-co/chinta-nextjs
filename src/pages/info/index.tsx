import ReactFullpage from '@fullpage/react-fullpage';
import { AxiosResponse } from 'axios';
import { Types } from 'mongoose';
import { GetServerSideProps, NextPage } from 'next';
import { getPlaiceholder } from 'plaiceholder';
import { Fragment, useState } from 'react';
import { IAbout, IAward, INews, IShop, IStudio } from 'server/interface';
import instance from 'src/api/httpService';
import Header from 'src/components/Common/Header';
import About, { AboutWithImage } from 'src/components/Info/about';
import ShopItem from 'src/components/Info/shop/ShopItem';
import Studio, { StudioItem } from 'src/components/Info/studio';
import NewsItem from 'src/components/NewsItem';
import { config } from 'src/config';
import { scrollHandler } from 'src/utils';

// NOTE: if using fullpage extensions/plugins put them here and pass it as props.
const pluginWrapper = () => {
    /*
     * require('../static/fullpage.scrollHorizontally.min.js'); // Optional. Required when using the "scrollHorizontally" extension.
     */
};
const SEL = "custom-section";
const SECTION_SEL = `.${SEL}`;

type ImageItem = {
    base64: string;
    src: string;
    height: number;
    width: number;
    photoUrl: string;
    type?: string | undefined;
};
export type ShopItem = {
    images: ImageItem[];
    _id: Types.ObjectId;
    title: string;
    url?: string | undefined;
    shortDescription: string;
    description?: string | undefined;
    previousPrice?: number | undefined;
    currentPrice: number;
    stock: number;
};

export type NewsItem = {
    _id: string | Types.ObjectId;
    title: string;
    description: string;
    image: string;
    url: string;
    createdAt?: any;
    src: string;
    height: number;
    width: number;
    base64: string;
    type?: string | undefined;
};

interface Props {
    studios: StudioItem[];
    about: AboutWithImage;
    awards: IAward[];
    shops: ShopItem[];
    news: NewsItem[];
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
                            <div className={SEL} >
                                {shops.map(shop => (
                                    <ShopItem shop={shop} key={shop.title} />
                                ))}
                            </div>
                            <div className={SEL} >
                                <h4>Section Jobs</h4>
                            </div>
                            <div className={SEL} >
                                <div className='news-section' onWheel={scrollHandler}>
                                    {news.map(news => (
                                        <NewsItem news={news} key={news.title} />
                                    ))}
                                </div>

                            </div>
                        </ReactFullpage.Wrapper>
                    }
                />
            </div>
        </Fragment>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const { data: studio } = await instance.get<AxiosResponse<IStudio[]>>('/info/studios');
    const { data: _about } = await instance.get<{ data: IAbout[]; }>('/info/about');
    const aboutData = _about.data[0];

    const { data: awards } = await instance.get<{ data: IAward[]; }>('/info/awards');
    const { data: _shops } = await instance.get<{ data: IShop[]; }>('/info/shops');
    const { data: _news } = await instance.get<{ data: INews[]; }>('/info/news');

    const [studios, about, shops, news] = await Promise.all([
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
        await Promise.all(
            _shops.data.map(async (shop) => {
                const images = await Promise.all(
                    shop.images.map(async (image) => {
                        const { base64, img } = await getPlaiceholder(`${config.imageUploadUrl}${image}`);
                        const obj = {
                            ...img,
                            base64: base64,
                            photoUrl: image
                        };
                        return obj;
                    })
                );
                return {
                    ...shop,
                    images
                };
            })),
        await Promise.all(
            _news.data.map(async (data) => {
                const { base64, img } = await getPlaiceholder(`${config.imageUploadUrl}${data.image}`);
                return {
                    ...img,
                    ...data,
                    base64: base64,
                };
            })
        ),
    ]);

    return {
        props: {
            studios,
            about,
            awards: awards.data,
            shops,
            news,
        },
    };
};

export default InfoPage;
