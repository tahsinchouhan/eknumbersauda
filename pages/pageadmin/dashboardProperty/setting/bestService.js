import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import SidebarData from "../../../../components/admin/adminContents/sidebarData";
import BestServiceForm from "./bestServiceForm";
import HappyCustomerForm from "./happyCustomerForm";
import TestimonialHome from "./testimonialHome";
import Testimonials from "./testimonials";

function BestService() {
  const router = useRouter();
  const [tabSelect, setTabSelect] = useState(1);

  const handleSelect = (key) => {
    setTabSelect(key);
  };
  useEffect(() => {
    const login = JSON.parse(localStorage.getItem("login"));
    if (!login) {
      router.push("/pageadmin");
    }
  }, []);
  return (
    <>
      <div className="p-4" style={{ backgroundColor: "#0098DA" }}>
        <h5
          className="text-white m-0 fw-bold andmin-paridhi-text"
          style={{ letterSpacing: "3px" }}
        >
          Ek Number Sauda
        </h5>
      </div>
      <div className="d-flex">
        <div lg={2} md={12} className="px-0">
          <SidebarData />
        </div>
        <div lg={10} md={10} className="px-4 py-2 w-100 mt-5">
          <div>
            <h4 className="header mx-4 px-3 pt-3 mb-5 fw-bold">Setting</h4>
          </div>
          <Tabs
            justify
            id="uncontrolled-tab-example"
            className="mb-3 mb-md-5 best_real_tab"
            onSelect={handleSelect}
          >
            <Tab
              defaultactivekey={1}
              eventKey={1}
              title="Best Service"
              className="best_real_nav"
            >
              {" "}
              {tabSelect == 1 && <BestServiceForm />}
            </Tab>
            <Tab
              eventKey={2}
              title="Happy Customer"
              className="best_real_nav"
              onClick={() => setTabSelect(2)}
            >
              {tabSelect == 2 && <HappyCustomerForm />}
            </Tab>
            <Tab
              eventKey={3}
              title="Home"
              className="best_real_nav"
              onClick={() => setTabSelect(3)}
            >
              {tabSelect == 3 && <TestimonialHome />}
            </Tab>
            <Tab
              eventKey={4}
              title="Testimonials"
              className="best_real_nav"
              onClick={() => setTabSelect(4)}
            >
              {tabSelect == 4 && <Testimonials />}
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default BestService;
