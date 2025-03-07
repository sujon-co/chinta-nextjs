/* eslint-disable @next/next/no-sync-scripts */
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="true"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400&display=swap"
                    rel="stylesheet"
                />
                <link rel="icon" type="image/x-icon" href="/favicon.ico" />
            </Head>
            <body className='fp-responsive'>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
