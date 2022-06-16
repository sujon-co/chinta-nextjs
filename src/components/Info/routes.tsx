import { NextPage } from 'next';
import { Link } from 'react-scroll';

interface Props {}

const InfoRoutes: NextPage<Props> = () => {
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
                >
                    Jobs
                </Link>
                <Link
                    activeClass="active"
                    className="info-route-item"
                    to="shop"
                    spy={true}
                    smooth={true}
                    duration={250}
                    containerId="containerElement"
                >
                    Shops
                </Link>
                <Link
                    activeClass="active"
                    className="info-route-item"
                    to="contacts"
                    spy={true}
                    smooth={true}
                    duration={250}
                    containerId="containerElement"
                >
                    Contacts
                </Link>
            </div>
        </div>
    );
};

export default InfoRoutes;
