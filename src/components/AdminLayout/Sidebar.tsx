import Image from 'next/image';
import Link from 'next/link';
import { AiFillContacts } from 'react-icons/ai';
import { BiBuildingHouse } from 'react-icons/bi';
import { FaHome, FaTimesCircle, FaUserGraduate } from 'react-icons/fa';
import { FiChevronRight } from 'react-icons/fi';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-inner">
                <div className="sidebar-logo">
                    <div className="d-flex align-items-center flex-nowrap">
                        <div className="sidebar-link text-decoration-none">
                            <div className="d-flex align-items-center flex-nowrap">
                                <div className="logo-sm">
                                    <div className="logo d-flex align-items-center justify-content-center">
                                        <Link href="/" className="header-brand">
                                            <a>
                                                <Image
                                                    src="/logo.svg"
                                                    alt="brand logo"
                                                    layout="fixed"
                                                    height={40}
                                                    width={36}
                                                />
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                                <div className="logo-text d-flex align-items-center justify-content-center pt-2">
                                    <Link href="/" className="header-brand">
                                        <a>
                                            <Image
                                                src="/logo.svg"
                                                alt="brand logo"
                                                layout="fixed"
                                                height={40}
                                                width={36}
                                            />
                                        </a>
                                    </Link>
                                    <h5 className="text-white ps-2">Chinta</h5>
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
                    <li className="nav-item dropdown">
                        <Link href="/admin/chinta/sliders">
                            <a className="nav-link wave-effect">
                                <span className="icon-holder">
                                    <FaHome />
                                </span>
                                <span className="title">Sliders</span>
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item dropdown">
                        <Link href="/admin/chinta/projects">
                            <a className="nav-link wave-effect">
                                <span className="icon-holder">
                                    <BiBuildingHouse />
                                </span>
                                <span className="title">Projects</span>
                                <FiChevronRight />
                            </a>
                        </Link>
                        <ul
                            className="dropdown-menu"
                            // style={{ display: 'block' }}
                        >
                            <li className="nav-item">
                                <Link href="#">
                                    <a className="nav-link ">
                                        <span className="title">
                                            Add Project
                                        </span>
                                    </a>
                                </Link>
                                <Link href="#">
                                    <a className="nav-link ">
                                        <span className="title">Projects</span>
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <a href="#" className="nav-link wave-effect">
                            <span className="icon-holder">
                                <FaUserGraduate />
                            </span>
                            <span className="title">Information</span>
                            <FiChevronRight />
                        </a>
                        <ul
                            className="dropdown-menu"
                            // style={{ display: 'block' }}
                        >
                            <li className="nav-item">
                                <Link href="#">
                                    <a className="nav-link ">
                                        <span className="title"> About </span>
                                    </a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="#">
                                    <a className="nav-link ">
                                        <span className="title"> Studio </span>
                                    </a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="#">
                                    <a className="nav-link ">
                                        <span className="title"> Award </span>
                                    </a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="#">
                                    <a className="nav-link ">
                                        <span className="title"> News </span>
                                    </a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="#">
                                    <a className="nav-link ">
                                        <span className="title"> Jobs </span>
                                    </a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="#">
                                    <a className="nav-link ">
                                        <span className="title"> Shops </span>
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <Link href="/admin/chinta/projects">
                            <a className="nav-link wave-effect">
                                <span className="icon-holder">
                                    <AiFillContacts />
                                </span>
                                <span className="title">Contact</span>
                            </a>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
