/* eslint-disable @next/next/no-sync-scripts */
import { Html, Head, Main, NextScript } from "next/document";


export default function Document() {
    return (
        <Html>
            <Head lang="zxx">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link href="/dist/output.css" rel="stylesheet" />
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-B64K9VB6CF"></script>
                <script dangerouslySetInnerHTML={{
                    __html: ` window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-B64K9VB6CF');`,}}>
                </script>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
