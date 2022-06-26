import { NextPage } from 'next';
import Image from 'next/image';
import { FaAngleRight, FaBars, FaFingerprint, FaHome } from 'react-icons/fa';

interface Props {}

const Dashboard: NextPage<Props> = () => {
    return (
        <div className="app is-collapsed">
            <div className="sidebar">
                <div className="sidebar-inner">
                    <div className="sidebar-logo">
                        <div className="d-flex align-items-center flex-nowrap">
                            <a
                                className="sidebar-link text-decoration-none"
                                href="#"
                            >
                                <div className="d-flex align-items-center flex-nowrap">
                                    <div className="logo-sm">
                                        <div className="logo d-flex align-items-center justify-content-center">
                                            <Image
                                                src="/logo.svg"
                                                alt="brand logo"
                                                layout="fixed"
                                                height={40}
                                                width={36}
                                            />
                                        </div>
                                    </div>
                                    <div className="logo-text d-flex align-items-center justify-content-center">
                                        <Image
                                            src="/logo.svg"
                                            alt="brand logo"
                                            layout="fixed"
                                            height={40}
                                            width={36}
                                        />
                                    </div>
                                </div>
                            </a>
                            <div className="">
                                <div className="mobile-toggle sidebar-toggle">
                                    <a
                                        href="#"
                                        className="text-decoration-none"
                                    >
                                        <FaBars />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ul className="sidebar-menu scrollable position-relative">
                        <li className="nav-item dropdown">
                            <a className="nav-link" href="#">
                                <span className="icon-holder">
                                    <FaHome />
                                </span>
                                <span className="title">Dashboard</span>
                            </a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#">
                                <span className="icon-holder">
                                    <i className="fas fa-fingerprint"></i>
                                    <FaFingerprint />
                                </span>
                                <span className="title">Auth</span>
                                <span className="arrow">
                                    <FaAngleRight />
                                </span>
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <a className="sidebar-link" href="#">
                                        404
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="container-wide">Content</div>
        </div>
    );
};

export default Dashboard;
