import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Col, Row, Form, Tabs, Tab, Button, Container } from "react-bootstrap";
import CardComponet from "../CardComponent";
import axios from "axios";

function BestRealEstaleDeal() {
  const [priceToggle, setPriceToggle] = useState("sell");
  const [tabData, setTabData] = useState("below50l");
  const [radioData, setRadioData] = useState("sell");
  const [allLatestProperty, setAllLatestProperty] = useState([]);

  const bestDealCall = (type, price) => {
    axios({
      method: "get",
      url: `/api/client/getbestdeals?type=${type}&price=${price}`,
    })
      .then((res) => {
        setAllLatestProperty(res.data);
      })
      .catch((err) => {
        return err || "";
      });
  };

  const radioToggleHandler = (e) => {
    setRadioData(e.target.value);
    if (e.target.value === "sell") {
      setPriceToggle("sell");
      setTabData("below50l");
    } else if (e.target.value === "rent") {
      setPriceToggle("rent");
      setTabData("below5k");
    }
  };

  const handleSelectFirst = (key) => {
    if (key === "below50l") {
      setTabData("below50l");
    }
    if (key === "50l1cr") {
      setTabData("50l1cr");
    }
    if (key === "above1cr") {
      setTabData("above1cr");
    }
  };

  const handleSelectTwo = (key) => {
    if (key === "below5k") {
      setTabData("below5k");
    }
    if (key === "5k10k") {
      setTabData("5k10k");
    }
    if (key === "above10k") {
      setTabData("above10k");
    }
  };

  useEffect(() => {
    if (tabData && radioData) {
      bestDealCall(radioData, tabData);
    }
    if (tabData && !radioData) {
      bestDealCall("sell", tabData);
    }
  }, [tabData, radioData]);

  return (
    <>
      <div className="best_real_estale " id="bestRealEstale">
        <Container className="real_main_div">
          <Row className=" best_estate_row">
            <Col md={5} sm={12}>
              <div>
                <h1 className=" homePage-all-headings">
                  Best Real Estate Deals
                </h1>
              </div>
            </Col>
            <Col
              md={4}
              sm={12}
              className="align-self-center align-self-lg-end mt-4 mt-md-0"
            >
              <Form>
                <div className="d-flex">
                  <div>
                    <Form.Group className="mb-3">
                      <Form.Check
                        className="best_real_radiBox"
                        type="radio"
                        id="disabledFieldsetCheck"
                        label="For Buy"
                        name="platform"
                        value="sell"
                        defaultChecked
                        onChange={(e) => radioToggleHandler(e)}
                      />
                    </Form.Group>
                  </div>
                  <div className="mx-4">
                    <Form.Group className="mb-3 best_real_radiBox  ">
                      <Form.Check
                        className="best_real_radiBox"
                        type="radio"
                        id="disabledFieldsetCheck"
                        label="For Rental "
                        name="platform"
                        value="rent"
                        onChange={(e) => radioToggleHandler(e)}
                      />
                    </Form.Group>
                  </div>
                </div>
              </Form>
            </Col>
            <Col
              md={3}
              sm={12}
              className="align-self-center text-md-end mb-4 mb-lg-0 d-none d-md-block "
            >
              {radioData === "sell" && (
                <Link className="" href="/buy">
                  <span className="text-more mb-4 mb-lg-0">View More</span>
                </Link>
              )}

              {radioData === "rent" && (
                <Link className="" href="/rent">
                  <span className="text-more mb-4 mb-lg-0">View More</span>
                </Link>
              )}
            </Col>
          </Row>
          {/*------------------------- Tabs---------------------------- */}
          <Row className=" best_estate_row mt-3 mt-md-5">
            <Col lg={12} md={12} sm={12}>
              {priceToggle === "sell" && (
                <div className="best_real_nav ps-0">
                  <Tabs
                    justify
                    defaultactivekey="below50l"
                    id="uncontrolled-tab-example"
                    className="mb-3 mb-md-5 best_real_tab"
                    onSelect={handleSelectFirst}
                  >
                    <Tab
                      eventKey="below50l"
                      title=" Below 50L"
                      className="best_real_nav"
                    >
                      <div>
                        <Row className=" best_estate_row  ">
                          {allLatestProperty.length ? allLatestProperty?.slice(0, 1).map((data, _id) => {
                            return (
                              <React.Fragment key={_id}>
                                <Col
                                  lg={4}
                                  md={6}
                                  className="pe-md-2 pe-xl-4 mt-4 mt-lg-0 "
                                >
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
                        </Row>
                      </div>
                    </Tab>
                    <Tab eventKey="50l1cr" title="50L  - 01Cr">
                      <div>
                        <Row>
                          {allLatestProperty.length ? allLatestProperty.slice(0, 3).map((data, _id) => {
                            return (
                              <React.Fragment key={_id}>
                                <Col
                                  lg={4}
                                  md={6}
                                  className="pe-md-2 pe-xl-4 mt-4 mt-lg-0 "
                                >
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
                        </Row>
                      </div>
                    </Tab>
                    <Tab eventKey="above1cr" title="Above 1Cr">
                      <div>
                        <Row>
                          {allLatestProperty.length ? allLatestProperty.slice(0, 3).map((data, _id) => {
                            return (
                              <React.Fragment key={_id}>
                                <Col
                                  lg={4}
                                  md={6}
                                  className="pe-md-2 pe-xl-4 mt-4 mt-lg-0 "
                                >
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
                        </Row>
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              )}
              {priceToggle === "rent" && (
                <div className="best_real_nav ps-0">
                  <Tabs
                    justify
                    defaultactivekey="below10k"
                    id="uncontrolled-tab-example"
                    className="mb-3 mb-md-5 best_real_tab"
                    onSelect={handleSelectTwo}
                  >
                    <Tab
                      eventKey="below10k"
                      title="Below 10K"
                      className="best_real_nav"
                    >
                      <div>
                        <Row className=" best_estate_row  ">
                          {allLatestProperty.length ? allLatestProperty.slice(0, 3).map((data, _id) => {
                            return (
                              <React.Fragment key={_id}>
                                <Col
                                  lg={4}
                                  md={6}
                                  className="pe-md-2 pe-xl-4 mt-4 mt-lg-0 "
                                >
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
                        </Row>
                      </div>
                    </Tab>
                    <Tab eventKey="10k50k" title="10K  - 50K">
                      <div>
                        <Row>
                          {allLatestProperty.length ? allLatestProperty.slice(0, 3).map((data, id) => {
                            return (
                              <React.Fragment key={id}>
                                <Col
                                  lg={4}
                                  md={6}
                                  className="pe-md-2 pe-xl-4 mt-4 mt-lg-0 "
                                >
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
                        </Row>
                      </div>
                    </Tab>
                    <Tab eventKey="above50k" title="Above 50K">
                      <div>
                        <Row>
                          {allLatestProperty.length ? allLatestProperty.slice(0, 3).map((data, id) => {
                            return (
                              <React.Fragment key={id}>
                                <Col
                                  lg={4}
                                  md={6}
                                  className="pe-md-2 pe-xl-4 mt-4 mt-lg-0 "
                                >
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
                        </Row>
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              )}
            </Col>
            <Col
              md={3}
              sm={12}
              className="align-self-center text-center my-4 mb-lg-0 d-md-none"
            >
              {radioData === "sell" && (
                <Link className="" href="/">
                  <span className="text-more mb-4 mb-lg-0">View More</span>
                </Link>
              )}

              {radioData === "rent" && (
                <Link className="" href="/">
                  <span className="text-more mb-4 mb-lg-0">View More</span>
                </Link>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default BestRealEstaleDeal;
