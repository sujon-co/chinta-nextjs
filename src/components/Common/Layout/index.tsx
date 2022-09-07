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
            <div className="mt-3 mb-2">
                <Footer />
            </div>
        </>
    );
};

export default Layout;
