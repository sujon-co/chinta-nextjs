import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Preloader from 'src/components/Preloader';
import 'swiper/css/bundle';
import '../scss/main.scss';

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
            setTimeout(() => {
                setPageLoading(false);
            }, 3000);
        };

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);

        window.addEventListener('load', delayHandler);
        return () => {
            window.removeEventListener('load', delayHandler);
        };
    }, [router]);

    return <>{pageLoading ? <Preloader /> : <Component {...pageProps} />}</>;
}

export default MyApp;
