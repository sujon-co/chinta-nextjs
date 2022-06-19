import { NextPage } from 'next';
import { useState } from 'react';
import { Element } from 'react-scroll';
import About from './about';
import InfoRoutes from './routes';
import Studio from './studio';

interface Props {}

export type routeTypes = 'news' | 'jobs' | 'shops';

const Info: NextPage<Props> = () => {
    const [selectedRoute, setSelectedRoute] = useState<routeTypes>();

    const routeHandler = (route: routeTypes) => {
        setSelectedRoute(route);
    };

    console.log({ selectedRoute });
    return (
        <Element name="info" className="section info-section-wrapper">
            <div className="container">
                <div className="row">
                    <div className="col-md-2">
                        <InfoRoutes routeHandler={routeHandler} />
                    </div>
                    <div className="col-md-10">
                        <Element
                            name="test7"
                            className="info-section"
                            id="containerElement"
                        >
                            <Element name="about" className="info-item-section">
                                <About />
                            </Element>

                            <Element
                                name="studio"
                                className="info-item-section"
                            >
                                <Studio />
                            </Element>
                            <Element name="award" className="info-item-section">
                                award element inside container
                            </Element>
                            <Element name="news" className="info-item-section">
                                news element inside container
                            </Element>
                            <Element name="jobs" className="info-item-section">
                                jobs element inside container
                            </Element>
                            <Element name="shops" className="info-item-section">
                                shop element inside container
                            </Element>
                        </Element>
                    </div>
                </div>
            </div>
        </Element>
    );
};

export default Info;
