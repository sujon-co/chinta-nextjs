/* eslint-disable @next/next/no-img-element */
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

interface IProps { }

const Header: NextPage<IProps> = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [stay, setStay] = useState(false);
    const [search, setSearch] = useState('');
    const { pathname, push } = useRouter();

    const searchHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();
        push(`/search/?query=${search}`);
    };

    useEffect(() => {
        if (stay) {
            setShowMenu(true);
        }
        if (showMenu && !stay) {
            setTimeout(() => {
                setShowMenu(false);
            }, 10000);
        }
    }, [showMenu, stay]);

    return (
        <header className="header">
            <nav className="container header-nav">
                <Link href="/" >
                    <a className="header-brand">
                        <Image
                            src="/logo.svg"
                            alt="brand logo"
                            layout="fixed"
                            height={40}
                            width={36}
                        />
                    </a>
                </Link>
                <div className="header-content">
                    <div className="header-menu-wrapper">
                        <div
                            className={`header-menu ${showMenu
                                ? 'menu-open-animation'
                                : 'menu-close-animation'
                                }`}
                            onMouseOver={() => setStay(true)}
                            onMouseLeave={() => setStay(false)}
                        >
                            <Link href="/projects">
                                <a className={`header-menu-item  red ${pathname === '/projects' ? 'active  RED' : ''}`} >
                                    Projects
                                </a>
                            </Link>
                            <Link href="/info">
                                <a className={`header-menu-item blue ${pathname === '/info' ? 'active  BLUE' : ''}`} >
                                    Info
                                </a>
                            </Link>
                            <Link href="/contact">
                                <a className={`header-menu-item yellow ${pathname === '/contact' ? 'active  YELLOW' : ''}`} >
                                    Contact
                                </a>
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
                        <form
                            className="header-search"
                            onSubmit={searchHandler}
                        >
                            <input
                                className="header-search-input"
                                type="text"
                                name=""
                                id=""
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                onFocus={() => setShowMenu(false)}
                            />
                            <span className="bar"></span>
                        </form>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
