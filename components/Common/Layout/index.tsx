import Footer from '../Footer';
import Header from '../Header';
interface IProps {
    children: JSX.Element;
}
const Layout = ({ children }: IProps) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
};

export default Layout;
