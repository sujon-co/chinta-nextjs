/* eslint-disable @next/next/no-img-element */
import { NextPage } from 'next';
import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Link } from 'react-scroll';

interface IProps {}

const Header: NextPage<IProps> = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [stay, setStay] = useState(false);
    const { pathname } = useRouter();

    useEffect(() => {
        if (stay) {
            setShowMenu(true);
        }
        if (showMenu && !stay) {
            setTimeout(() => {
                setShowMenu(false);
            }, 10000);
        }
        console.log({ stay, showMenu });
    }, [showMenu, stay]);

    return (
        <header className="header">
            <nav className="container header-nav">
                <NextLink href="/" className="header-brand">
                    <a>
                        <Image
                            src="/logo.svg"
                            alt="brand logo"
                            layout="fixed"
                            height={40}
                            width={36}
                        />
                    </a>
                </NextLink>
                <div className="header-content">
                    {pathname === '/' && (
                        <>
                            <div className="header-menu-wrapper">
                                <div
                                    className={`header-menu ${
                                        showMenu
                                            ? 'menu-open-animation'
                                            : 'menu-close-animation'
                                    }`}
                                    onMouseOver={() => setStay(true)}
                                    onMouseLeave={() => setStay(false)}
                                >
                                    <Link
                                        className="header-menu-item"
                                        activeClass="active"
                                        to="projects"
                                        spy={true}
                                        smooth={true}
                                        duration={500}
                                    >
                                        Projects
                                    </Link>
                                    <Link
                                        className="header-menu-item"
                                        activeClass="active"
                                        to="info"
                                        spy={true}
                                        smooth={true}
                                        duration={500}
                                    >
                                        Info
                                    </Link>
                                    <Link
                                        className="header-menu-item"
                                        activeClass="active"
                                        to="contact"
                                        spy={true}
                                        smooth={true}
                                        duration={500}
                                    >
                                        Contact
                                    </Link>
                                </div>
                            </div>
                            {!showMenu && (
                                <div
                                    className="header-dots"
                                    onClick={() => setShowMenu(true)}
                                >
                                    <BsThreeDotsVertical />
                                </div>
                            )}
                            {showMenu && (
                                <div
                                    className="bar-wrapper"
                                    onClick={() => setShowMenu(false)}
                                >
                                    <div className="bar" />
                                </div>
                            )}
                        </>
                    )}
                    <div className="">
                        <div className="header-search">
                            <input
                                className="header-search-input"
                                type="text"
                                name=""
                                id=""
                                onFocus={() => setShowMenu(false)}
                            />
                            <span className="bar"></span>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
