import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';
import 'swiper/css/bundle';
import '../scss/main.scss';

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;
