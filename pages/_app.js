import React, { Suspense } from "react"

import Layout from "../components/layout";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SSRProvider } from "@react-aria/ssr";



export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Suspense fallback={<div>loading...</div>}>
        <SSRProvider SRProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SSRProvider>
      </Suspense>


    </>
  );
}
