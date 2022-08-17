/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SearchBox from "../../components/commonComponent/searchBox/searchBox";
import SearchBoxComponent from "../../components/commonComponent/searchBox/searchBoxComponent";
import SecondCard from "../../components/commonComponent/secondCard";
import Breadcrumbs from "nextjs-breadcrumbs";
import axios from "axios"
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import CardComponet from "../../components/commonComponent/CardComponent";

function moreProjects() {
  const [projectData, setProjectData] = useState([])

  const [similerData, setSimilerData] = useState([])


  useEffect(() => {
    getOurProject()
  }, [])

  const getOurProject = () => {
    axios.get(`/api/client/getproperty`)
      .then((res) => {
        setProjectData(res.data);
      })
      .catch((res) => {
        return res || [];
      });
  }

  let pathname = '/moreProject';
  pathname = pathname.substring(1);

  const getSimiler = async () => {

    await axios.get(`/api/client/getsimiler`)
      .then((res) => {
        setSimilerData(res.data)
      })
      .catch((res) => {
        return res || [];
      })
  }

  useEffect(() => {
    getSimiler();
  }, [])
  return (
    <div>
      <div className="d-md-none">
        <Breadcrumb className="" style={{ whiteSpace: "break-spaces" }}>
          <Breadcrumb.Item href="/" style={{ color: "rgb(155, 151, 151)" }}>Home</Breadcrumb.Item>
          <span style={{ color: 'red' }}>{pathname}</span>
        </Breadcrumb>
        {/* <Breadcrumbs
          useDefaultStyle
          rootLabel="Home"
          activeItemClassName="brActive"
        /> */}
      </div>
      <Container className="mt-5">
        {/* <SearchBox /> */}
        <h3 className="homePage-all-headings fw-bold  my-5  text-center">
          Our Projects
        </h3>

        <Row>
          {projectData.filter(
            (project) => project.propertyname === "project"
          ).map((items) => {
            return (
              <React.Fragment key={items.slug}>
                <Col lg={6} md={12} className="px-3 px-sm-4">
                  <SecondCard
                    img={items.images?.length > 0 ? items.images[0] : []}
                    title={items.title}
                    amenities={items.amenities}
                    minprice={items.minprice}
                    maxprice={items.maxprice}
                    address={items.address}
                    // Sqft={items.amenities[2]}
                    slug={items.slug}
                  />
                </Col>
              </React.Fragment>
            );
          })}
        </Row>
        {/* ---------------------similar properties for you---------------------- */}
        <div className=" my-5 ">
          <h4 className="price-and-fourMore fw-bold  mt-3 mt-md-4">
            We&apos;ve found similar properties for you
          </h4>
          <Row className=" mt-2 mt-md-4">
            {similerData?.slice(0, 3).map((data) => {
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
            })}
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default moreProjects;
