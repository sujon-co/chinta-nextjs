import '@fullpage/react-fullpage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NextComponentType } from 'next';
import { AppContext, AppInitialProps, AppLayoutProps } from 'next/app';
import { Router, useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Preloader from 'src/components/Preloader';
import SizeContextProvider from 'src/contexts/ResponseContextProvider';
import 'swiper/css/bundle';
import '../scss/main.scss';

const MyApp: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
    Component,
    pageProps,
}) => {
    const router = useRouter();
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        if (router.pathname === '/') {
            setTimeout(() => {
                setPageLoading(false);
            }, 3500);
        } else {
            setPageLoading(false);
        }
    }, [router.pathname]);


    useEffect(() => {
        const handleStart = () => {
            setPageLoading(true);
        };
        const handleComplete = () => {
            setPageLoading(false);
        };

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleComplete);
            router.events.off('routeChangeError', handleComplete);
        };

    }, [router, router.pathname]);

    useEffect(() => {
        typeof document !== undefined ? require('bootstrap/dist/js/bootstrap.bundle') : null;
    }, []);

    useEffect(() => {
        Router.events.on('routeChangeComplete', () => {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        });
    }, []);

    const getLayout = Component.getLayout || ((page: ReactNode) => page);
    return (
        <>
            {pageLoading ? (
                <Preloader />
            ) : (
                <SizeContextProvider>
                    {/* <ToTop >
                    
                    </ToTop> */}
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
                            },
                        }}
                    />
                </SizeContextProvider>
            )}
        </>
    );
};

export default MyApp;

