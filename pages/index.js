import Head from "next/head";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styles from "../styles/Home.module.css";
// import * from "react-icons";
import Home from "./home";

export default function Index() {
  return (
    <div className={styles.container}>
      <Head>
        <title>EkNumberSauda</title>
        <meta name="description" content="EkNumberSauda" />
        <link rel="icon" href="/images/logo1.jpg" />
      </Head>
      <div>
        <Home />
      </div>
    </div>
  );
}
