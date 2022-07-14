import { NextPage } from 'next';
import { MouseEvent, MouseEventHandler, useRef } from 'react';
import { FaBars, FaHome, FaTimesCircle } from 'react-icons/fa';

interface Props {}

const Dashboard: NextPage<Props> = () => {
    const toggleClassName = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        document.body.classList.toggle('is-collapsed');
    };
    return (
        <>
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
                                            <img src="https://next-sidebar.netlify.app/assets/images/next.png" />
                                        </div>
                                    </div>
                                    <div className="logo-text d-flex align-items-center justify-content-center">
                                        <img src="https://next-sidebar.netlify.app/assets/images/next-full.png" />
                                    </div>
                                </div>
                            </a>
                            <div className="">
                                <div className="mobile-toggle sidebar-toggle">
                                    <a
                                        href="#"
                                        className="text-decoration-none"
                                    >
                                        <FaTimesCircle />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul className="sidebar-menu ps pt-3">
                        <li className="nav-item dropdown">
                            <a href="#" className="nav-link wave-effect">
                                <span className="icon-holder">
                                    <FaHome />
                                </span>
                                <span className="title">Dashboard</span>
                            </a>
                        </li>
                        <li className="nav-item dropdown">
                            <a href="#" className="nav-link wave-effect">
                                <span className="icon-holder">
                                    <FaHome />
                                </span>
                                <span className="title">Dashboard</span>
                            </a>
                            <ul
                                className="dropdown-menu"
                                style={{ display: 'block' }}
                            >
                                <li className="nav-item dropdown">
                                    <a
                                        href="#"
                                        className="nav-link dropdown-toggle"
                                    >
                                        <span className="icon-holder">
                                            <FaHome />
                                        </span>
                                        <span className="title">Menu Item</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="container-wide">
                <nav className="navbar navbar-expand navbar-light bg-light">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item active">
                            <a
                                id="sidebar-toggle"
                                className="sidebar-toggle nav-link"
                                href="#"
                                onClick={toggleClassName}
                            >
                                <FaBars />
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Left
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Link
                            </a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Right
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Link
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default Dashboard;
