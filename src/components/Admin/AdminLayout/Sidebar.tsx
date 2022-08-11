import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { AiFillContacts } from 'react-icons/ai';
import { BiBuildingHouse, BiNews } from 'react-icons/bi';
import { BsFillAwardFill } from 'react-icons/bs';
import { FaHome, FaTimesCircle, FaUserGraduate, FaUsers } from 'react-icons/fa';
import { MdWork } from 'react-icons/md';

const routers = [
    {
        name: 'Sliders',
        link: 'sliders',
        icon: <FaHome />,
        subRoutes: [],
    },
    {
        name: 'Projects',
        link: 'projects',
        icon: <BiBuildingHouse />,
    },
    {
        name: 'About',
        link: 'info/about',
        icon: <FaUserGraduate />,
    },
    {
        name: 'Studio',
        link: 'info/studio',
        icon: <FaUsers />,
    },
    {
        name: 'Award',
        link: 'info/award',
        icon: <BsFillAwardFill />,
    },
    {
        name: 'News',
        link: 'info/news',
        icon: <BiNews />,
    },
    {
        name: 'Jobs',
        link: 'info/jobs',
        icon: <MdWork />,
    },
    {
        name: 'Shops',
        link: 'info/shops',
        icon: <AiFillContacts />,
    },
] as const;

type Router = typeof routers[number];

const Sidebar = () => {
    useEffect(() => { }, []);
    return (
        <div className="sidebar">
            <div className="sidebar-inner">
                <div className="sidebar-logo bg-success">
                    <div className="d-flex align-items-center flex-nowrap">
                        <div className="sidebar-link text-decoration-none">
                            <div className="d-flex align-items-center flex-nowrap">
                                <div className="logo-text">
                                    <Link href="/" >
                                        <a className="header-brand  d-flex align-items-center justify-content-center pt-2  text-decoration-none">
                                            <Image
                                                src="/logo.svg"
                                                alt="brand logo"
                                                layout="fixed"
                                                height={40}
                                                width={36}
                                            />
                                            <h5 className="text-white ps-2">
                                                Chinta
                                            </h5>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="mobile-toggle sidebar-toggle d-none">
                            <a href="#" className="text-decoration-none">
                                <FaTimesCircle />
                            </a>
                        </div>
                    </div>
                </div>
                <ul className="sidebar-menu ps pt-3">
                    {routers?.map((route) => (
                        <SidebarItem route={route} key={route.name} />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;

interface IRoute {
    route: Router;
}
const SidebarItem = ({ route }: IRoute) => {
    return (
        <li className="nav-item dropdown">
            <Link href={`/admin/chinta/${route.link}`}>
                <a className="nav-link d-flex justify-content-between align-items-center">
                    <div className="">
                        <span className="icon-holder">{route.icon}</span>
                        <span className="title"> {route.name} </span>
                    </div>
                </a>
            </Link>
        </li>
    );
};
