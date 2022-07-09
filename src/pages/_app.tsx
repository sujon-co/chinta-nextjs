import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Preloader from 'src/components/Preloader';
import 'swiper/css/bundle';
import '../scss/main.scss';

axios.defaults.baseURL = 'http://localhost:3000/api';

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const [pageLoading, setPageLoading] = useState(false);

    useEffect(() => {
        const handleStart = () => {
            setPageLoading(true);
        };
        const handleComplete = () => {
            setPageLoading(false);
        };

        const delayHandler = () => {
            if (router.pathname === '/') {
                setTimeout(() => {
                    setPageLoading(false);
                }, 3000);
            } else {
                setPageLoading(false);
            }
        };
        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);
        window.addEventListener('load', delayHandler);

        return () => {
            window.removeEventListener('load', delayHandler);
        };
    }, [router]);

    return (
        <>
            {pageLoading ? (
                <Preloader />
            ) : (
                <>
                    <Component {...pageProps} />
                    <Toaster
                        position="top-right"
                        reverseOrder={false}
                        gutter={8}
                        containerClassName=""
                        containerStyle={{}}
                        toastOptions={{
                            // Define default options
                            className: '',
                            duration: 5000,
                            style: {
                                background: '#363636',
                                color: '#fff',
                            },
                            // Default options for specific types
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
}

export default MyApp;
