import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import SidebarData from "../../../components/admin/adminContents/sidebarData";
import Amenities from "./property-master/amenities/[amenitiesId]";
import PropertyType from "./property-master/[propertyTypeId]";

function PropertMaster() {
  const router = useRouter();

  useEffect(() => {
    const login = JSON.parse(localStorage.getItem("login"));
    if (!login) {
      router.push("/pageadmin");
    }
  }, []);
  return (
    <div>
      <columns />
      {/* <PropertyTable/> */}
      <div>
        <div className="p-4" style={{ backgroundColor: "#0098DA" }}>
          <h5
            className="text-white m-0 fw-bold andmin-paridhi-text"
            style={{ letterSpacing: "3px" }}
          >
            Ek Number Sauda
          </h5>
        </div>
        <div className=" ">
          <div className="d-flex ">
            <div lg={2} md={12} className="px-0">
              <SidebarData />
            </div>
            <div lg={10} md={10} className="px-3  w-100 ">
              <div>
                <h4 className="header mx-4 px-3 pt-3 my-5 fw-bold">
                  Property Master
                </h4>
              </div>

              <Tabs
                justify
                defaultactivekey="Property Type"
                id="uncontrolled-tab-example"
                className="mb-3 mb-md-5 best_real_tab"
              >
                <Tab
                  defaultactivekey="Property Type"
                  eventKey={"Property Type"}
                  title="Property Type"
                  className=""
                >
                  <div>
                    <PropertyType />
                  </div>
                </Tab>
                <Tab eventKey={"Amenities"} title="Amenities" className="">
                  <div>
                    <Amenities />
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertMaster;
