import { NextPage } from 'next';
import { useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Element } from 'react-scroll';
import About, { AboutWithImage } from './about';
import InfoRoutes from './routes';
import Studio, { StudioItem } from './studio';

interface Props {
    studios: StudioItem[];
    about: AboutWithImage;
}

export type routeTypes =
    | 'about'
    | 'studio'
    | 'award'
    | 'news'
    | 'jobs'
    | 'shops';

const Info: NextPage<Props> = ({ studios, about }) => {
    const { ref, inView, entry } = useInView({
        threshold: 0,
    });
    const [selectedRoute, setSelectedRoute] = useState<routeTypes>();
    const counterRef = useRef(0);

    const removeActiveClass = (id: string) => {
        document.getElementById(id)?.classList.add('active');
    };
    const routeHandler = (route: routeTypes) => {
        setSelectedRoute(route);
        // if (route === 'award') {
        //     removeActiveClass('award');
        // }
        // if (route === 'news') {
        //     removeActiveClass('news');
        // }
        // if (route === 'jobs') {
        //     removeActiveClass('jobs');
        // }
        // if (route === 'shops') {
        //     removeActiveClass('shops');
        // }

        // const found = document.querySelectorAll('.route-item');
        // found.forEach((item) => {
        //     item.classList.remove('active');
        // });
    };

    // useEffect(() => {
    //     if (inView) {
    //         if (counterRef.current <= 0) {
    //             window.scrollTo({
    //                 left: 0,
    //                 top: document.body.scrollHeight,
    //                 behavior: 'smooth',
    //             });
    //             document.getElementById('ctn')?.classList.add('active');
    //             const found = document.querySelectorAll('.route-item');
    //             found.forEach((item) => {
    //                 item.classList.remove('active');
    //             });
    //         }
    //         counterRef.current++;
    //     } else {
    //         document.getElementById('ctn')?.classList.remove('active');
    //     }
    // }, [inView]);

    return (
        <Element name="info" className="pt-30">
            <div className="container">
                <div className="row">
                    <div className="col-md-1">
                        <InfoRoutes routeHandler={routeHandler} />
                    </div>
                    <div className="col-md-11">
                        <Element
                            name="test7"
                            className="info-section"
                            id="containerElement"
                        >
                            <Element
                                id="about"
                                name="about"
                                className="info-item-section"
                            >
                                <About about={about} />
                            </Element>

                            <Element
                                id="studio"
                                name="studio"
                                className="info-item-section"
                            >
                                <Studio studios={studios} />
                            </Element>
                            <Element
                                id="award"
                                name="award"
                                className="info-item-section"
                            >
                                award element inside container
                            </Element>
                            <Element
                                id="news"
                                name="news"
                                className="info-item-section"
                            >
                                news element inside container
                            </Element>
                            <Element
                                id="jobs"
                                name="jobs"
                                className="info-item-section"
                            >
                                jobs element inside container
                            </Element>
                            <Element
                                id="shops"
                                name="shops"
                                className="info-item-section"
                            >
                                shops element inside container
                            </Element>
                            <div ref={ref} style={{ height: '5px' }} />
                        </Element>
                    </div>
                </div>
            </div>
        </Element>
    );
};

export default Info;
