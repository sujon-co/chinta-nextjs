import { NextPage } from 'next';
import { Link } from 'react-scroll';
import { routeTypes } from '.';

interface IProps {
    routeHandler: (route: routeTypes) => void;
}

const InfoRoutes: NextPage<IProps> = ({ routeHandler }) => {
    // useEffect(() => {
    //     document.getElementById('ctn')?.click();
    // }, []);
    return (
        <div className="info-route-wrapper">
            <div className="info-route">
                <Link
                    activeClass="active"
                    className="info-route-item"
                    to="about"
                    spy={true}
                    smooth={true}
                    duration={250}
                    containerId="containerElement"
                >
                    About
                </Link>
                <Link
                    activeClass="active"
                    className="info-route-item"
                    to="studio"
                    spy={true}
                    smooth={true}
                    duration={250}
                    containerId="containerElement"
                >
                    Studio
                </Link>
                <Link
                    activeClass="active"
                    className="info-route-item"
                    to="award"
                    spy={true}
                    smooth={true}
                    duration={250}
                    containerId="containerElement"
                >
                    Award
                </Link>
                <Link
                    activeClass="active"
                    className="info-route-item"
                    to="news"
                    spy={true}
                    smooth={true}
                    duration={250}
                    containerId="containerElement"
                    onClick={() => routeHandler('news')}
                >
                    News
                </Link>
                <Link
                    activeClass="active"
                    className="info-route-item"
                    to="jobs"
                    spy={true}
                    smooth={true}
                    duration={250}
                    containerId="containerElement"
                    onClick={() => routeHandler('jobs')}
                >
                    Jobs
                </Link>
                <Link
                    activeClass="active"
                    className="info-route-item"
                    to="shops"
                    spy={true}
                    smooth={true}
                    duration={250}
                    containerId="containerElement"
                    onClick={() => routeHandler('shops')}
                >
                    Shops
                </Link>
                <Link
                    activeClass="active"
                    className="info-route-item"
                    to="contact"
                    id="ctn"
                    spy={true}
                    smooth={true}
                    duration={250}
                >
                    Contacts
                </Link>
            </div>
        </div>
    );
};

export default InfoRoutes;
