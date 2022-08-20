import Head from 'next/head';
import Link from 'next/link';
import { FC, MouseEvent, ReactNode } from 'react';
import { FaBars } from 'react-icons/fa';
import Sidebar from './Sidebar';

interface IAdminLayoutProps {
    children: ReactNode;
}

const AdminLayout: FC<IAdminLayoutProps> = ({ children }) => {
    const toggleClassName = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        document.body.classList.toggle('is-collapsed');
    };
    return (
        <>
            <Head>
                <title>Chinta Admin</title>
            </Head>
            <Sidebar />
            <div className="container-wide">
                <nav className="navbar navbar-expand navbar-light bg-light ">
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
                            <Link href="/admin/chinta">
                                <a className="nav-link fw-bolder ">Dashboard</a>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="container mt-5"> {children} </div>
            </div>
        </>
    );
};

export default AdminLayout;
