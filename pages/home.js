import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsWhatsapp } from "react-icons/bs";
import OurProject from "../components/commonComponent/latestProperty/ourProject";
import RecentlyAdded from "../components/commonComponent/latestProperty/RecentlyAdded";
import BestRealEstaleDeal from "../components/commonComponent/real-estate/bestRealEstale";
import BestServices from "../components/commonComponent/sevices";
import About from "../components/home/about";
import Contact from "../components/home/contact";
import FeaturedProperties from "../components/home/featuredProperties";
import HappyCustomer from "../components/home/happyCustomer";
import MainBenner from "../components/home/mainBenner";
import Ratiing from "../components/home/rating/Ratiing";

function Home() {
  const router = useRouter();

  const [whatsRedirect, setWhatsRedirect] = useState(false);

  useEffect(() => {
    if (whatsRedirect) {
      window.location.href =
        "https://api.whatsapp.com/send?phone=+919981476750&text=Hi";
    }
  }, [whatsRedirect]);

  return (
    <>
      <div className="whatsapp_btn ">
        <Link
          href="https://api.whatsapp.com/send?phone=+919981476750&text=Hi"
          clickOnButton={() => setWhatsRedirect(true)}
        >
          <BsWhatsapp className="mt-2" />
        </Link>
      </div>
      <MainBenner />
      <OurProject />
      <RecentlyAdded />
      <BestRealEstaleDeal />
      <FeaturedProperties />
      <BestServices />
      <About />
      <HappyCustomer />
      <Ratiing />
      <Contact />
    </>
  );
}

export default Home;
