import React from "react";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import CardComponet from "../CardComponent";
import { useRouter } from "next/router";
import MoreProperties from "../../../pages/more/moreProperties";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { paymnetIcons } from "../../../utils/constants"
function RecentlyAdded() {
  const router = useRouter();
  const [recentData, setRecentData] = useState([])


  const moreProperties = () => {
    router.push("/more/moreProperties");
  };



  useEffect(() => {
    getRecentlyData()
  }, [])


  const getRecentlyData = () => {
    axios.get(`/api/client/recentproperty`)
      .then((res) => {
        setRecentData(res.data);
      })
      .catch((res) => {
        return res || [];
      });
  }



  return (
    <>
      <div className="main-div my-2 my-sm-5 ms-3 ms-sm-5 p-0 p-sm-2  p-sm-5">
        <Container>
          <div className="py-5">
            <div className="">
              <Row>
                <Col lg={6}>
                  <p className="latest-text fw-bold mt-2"> Latest Properties</p>
                  <h3 className="homePage-all-headings fw-bold mb-3 mb-sm-4 mb-lg-5">
                    Recently Added Properties
                  </h3>
                </Col>
                <Col
                  lg={6}
                  className="text-start text-lg-end align-self-center pe-0 pe-lg-5 d-none d-lg-block "
                >
                  <div className="fw-bold" onClick={() => moreProperties()}>
                    <span className=" text-more "> More Properties</span>
                  </div>
                </Col>
              </Row>

              <Row>
                {/* {recentData?.map((data, slug) => {
                  return (
                    <React.Fragment key={data.slug}>
                      <Col
                        lg={4}
                        md={6}
                        className="pe-md-2 pe-xl-4 mt-4 mt-lg-0 "
                      >
                        <CardComponet
                          propertyname={data.propertyname}
                          propertiFor={data.type}
                          img={data.images[0]}
                          flatName={data.title}
                          location={data.address}
                          amenities={data.amenities}
                          price={data.realprice}
                          offerprice={data.offerprice}
                          maxprice={data.maxprice}
                          minprice={data.minprice}
                          slug={data.slug}
                        />
                      </Col>
                    </React.Fragment>
                  );
                })} */}
                {recentData.length ? recentData?.filter(
                  (property) => property.propertyname === "property"
                ).slice(0, 3).map((data, slug) => {
                  return (
                    <React.Fragment key={data.slug}>
                      <Col lg={4}
                        md={6}
                        className="pe-md-2 pe-xl-4 mt-4 mt-lg-0">
                        <CardComponet
                          propertyname={data.propertyname}
                          propertiFor={data.type}
                          img={data.images?.length > 0 ? data.images[0] : []}
                          flatName={data.title}
                          location={data.address}
                          amenities={data.amenities}
                          price={data.realprice}
                          offerprice={data.offerprice}
                          maxprice={data.maxprice}
                          minprice={data.minprice}
                          slug={data.slug}
                        />
                      </Col>
                    </React.Fragment>
                  );
                }) : <div className="d-flex justify-content-center">No property available</div>}

                <Col
                  lg={6}
                  className="text-center align-self-center my-5 d-lg-none"
                >
                  <div className="fw-bold" onClick={() => moreProperties()}>
                    <span className=" text-more "> More Properties</span>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default RecentlyAdded;
