import '@fullpage/react-fullpage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NextComponentType } from 'next';
import { AppContext, AppInitialProps, AppLayoutProps } from 'next/app';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Preloader from 'src/components/Preloader';
import 'swiper/css/bundle';
import '../scss/main.scss';

const MyApp: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
    Component,
    pageProps,
}) => {
    const router = useRouter();
    const [pageLoading, setPageLoading] = useState(false);

    useEffect(() => {
        const handleStart = () => {
            setPageLoading(true);
        };
        const handleComplete = () => {
            setPageLoading(false);
        };

        // if (router.pathname === "/") {
        //     window.addEventListener('load', () => {
        //         setTimeout(() => {
        //             handleComplete();
        //         }, 3000);
        //     });
        //     return () => {
        //         window.removeEventListener('load', handleComplete);
        //     };
        // }
        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);
        window.addEventListener('load', () => {
            handleComplete();
        });
        return () => {
            window.removeEventListener('load', handleComplete);
        };

    }, [router]);

    useEffect(() => {
        typeof document !== undefined ? require('bootstrap/dist/js/bootstrap.bundle') : null;
    }, []);

    const getLayout = Component.getLayout || ((page: ReactNode) => page);
    console.log({ pageLoading });
    return (
        <>
            {pageLoading ? (
                <Preloader />
            ) : (
                <>
                    {getLayout(<Component {...pageProps} />)}
                    <Toaster
                        position="top-right"
                        reverseOrder={false}
                        gutter={8}
                        containerClassName=""
                        containerStyle={{}}
                        toastOptions={{
                            className: '',
                            duration: 5000,
                            style: {
                                background: '#363636',
                                color: '#fff',
                            },
                            success: {
                                duration: 3000,
                                theme: {
                                    primary: 'green',
                                    secondary: 'black',
                                },
                            },
                        }}
                    />
                </>
            )}
        </>
    );
};

export default MyApp;
