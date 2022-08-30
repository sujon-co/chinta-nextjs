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
    const [homePageLoading, setHomePageLoading] = useState(true);

    useEffect(() => {
        if (router.pathname === '/') {
            setTimeout(() => {
                setHomePageLoading(false);
            }, 3000);
        } else {
            setPageLoading(false);
        }
    }, [router.pathname]);


    useEffect(() => {
        const handleStart = () => {
            setPageLoading(true);
            console.log({ page: 'project/[slug]' });
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

    }, [router]);

    useEffect(() => {
        typeof document !== undefined ? require('bootstrap/dist/js/bootstrap.bundle') : null;
    }, []);

    console.log({ pageLoading, homePageLoading, pathname: router.pathname });

    const getLayout = Component.getLayout || ((page: ReactNode) => page);
    return (
        <>

            {router.pathname === '/' && homePageLoading ? <Preloader /> : <>
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
            </>}

            {router.pathname !== '/' && pageLoading ? (
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

