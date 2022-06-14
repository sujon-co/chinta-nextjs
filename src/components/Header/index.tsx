import { NextPage } from 'next';
import Image from 'next/image';
import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

interface IProps {}

const Header: NextPage<IProps> = () => {
    const [showMenu, setShowMenu] = useState(false);
    console.log({ showMenu });
    return (
        <header className="header">
            <nav className="container header-nav border">
                <div className="header-brand">
                    <Image
                        src="/logo.svg"
                        alt="brand logo"
                        layout="fixed"
                        height={40}
                        width={36}
                    />
                </div>
                <div className="header-content">
                    <div className="header-menu-wrapper">
                        <div
                            className={`header-menu ${
                                showMenu
                                    ? 'menu-open-animation'
                                    : 'menu-close-animation'
                            }`}
                        >
                            <a href="#" className="header-menu-item">
                                Projects
                            </a>
                            <a href="#" className="header-menu-item">
                                Info
                            </a>
                            <a href="#" className="header-menu-item">
                                Contacts
                            </a>
                        </div>
                    </div>
                    <div
                        className="header-dots"
                        onClick={() => setShowMenu(!showMenu)}
                    >
                        <BsThreeDotsVertical />
                    </div>
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
            </nav>
        </header>
    );
};

export default Header;
