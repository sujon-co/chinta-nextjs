import { NextPage } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Link } from 'react-scroll';

interface IProps {}

const Header: NextPage<IProps> = () => {
    const [showMenu, setShowMenu] = useState(false);
    console.log({ showMenu });

    useEffect(() => {
        if (showMenu) {
            setTimeout(() => {
                setShowMenu(false);
            }, 10000);
        }
    }, [showMenu]);

    return (
        <header className="header">
            <nav className="container header-nav">
                <a href="#" className="header-brand">
                    <Image
                        src="/logo.svg"
                        alt="brand logo"
                        layout="fixed"
                        height={40}
                        width={36}
                    />
                </a>
                <div className="header-content">
                    <div className="header-menu-wrapper">
                        <div
                            className={`header-menu ${
                                showMenu
                                    ? 'menu-open-animation'
                                    : 'menu-close-animation'
                            }`}
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
