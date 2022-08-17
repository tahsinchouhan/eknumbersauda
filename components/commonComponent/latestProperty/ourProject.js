import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Link from "next/link";

import { BsGeoAltFill } from "react-icons/bs";
import { FaExpandArrowsAlt } from "react-icons/fa";
import { TbBath } from "react-icons/tb";
import { BiBed } from "react-icons/bi";
import ButtonComponent from "../../button/buttonComponent";
import SecondCard from "../secondCard";
import { useRouter } from "next/router";
import axios from "axios";

function OurProject() {
  const router = useRouter();
  const [projectData, setProjectData] = useState([])


  const moreProjects = () => {
    router.push("/more/moreProjects");
  };
  const cardData = [
    {
      id: 1,
      img: "/images/house.jpg",
      title: "Hilltruck Valley",
      price: "375,000",
      address: "Korba Chattisgrah",
      bed: "2 Beds",
      bath: "2 Baths ",
      sqft: "1234 Sq ft",
    },
    {
      id: 1,
      img: "/images/house.jpg",
      title: "Hilltruck Valley",
      price: "375,000",
      address: "Korba Chattisgrah",
      bed: "2 Beds",
      bath: "2 Baths ",
      sqft: "1234 Sq ft",
    },
  ];


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

  return (
    <>
      <div style={{ backgroundColor: " #F9F9F9" }} className="">
        <Container className=" mt-4 mt-md-5 pt-3 pt-5" style={{ marginTop: " 6rem!important" }}>
          <div>
            <h2 className="mt-2 mb-3 mb-sm-5 fw-bold homePage-all-headings">
              Our Projects
            </h2>
          </div>
          <Row className="mb-4">
            <Col md={9} sm={12}>
              <div>
                <p className="our-project-para">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry is
                  standard. Lorem Ipsum has been the industry is standard.
                </p>
              </div>
            </Col>
            <Col md={3} sm={12} className="text-md-end d-none d-md-block ">
              <div className="recent_more pt-sm-4 pt-0 ">
                <div className="fw-bold" onClick={() => moreProjects()}>
                  <span className=" text-more pt-sm-5 pt-0">More Projects</span>
                </div>
              </div>
            </Col>
          </Row>
          <div>
            <Row>

              {projectData.length ? projectData?.filter(
                (project) => project.propertyname === "project"
              ).slice(0,2).map((items, _id) => {
                return (
                  <React.Fragment  key={_id}>
                    <Col lg={6} md={12} className="px-3 px-sm-4">
                      <SecondCard
                        img={items.images?.length>0?items.images[0]:[]}
                        title={items.title}
                        amenities={items.amenities}
                        minprice={items.minprice}
                        maxprice={items.maxprice}
                        address={items.address}
                        slug={items.slug}
                      />
                    </Col>
                  </React.Fragment>
                );
              }):<div className="d-flex justify-content-center">No property available</div>}

              {/* <Col md={6}></Col> */}
              <Col md={3} sm={12} className="text-center mb-4 d-md-none">
                <div className="recent_more pt-0 ">
                  <div className="fw-bold" onClick={() => moreProjects()}>
                    <span className=" text-more pt-0">More Projects</span>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}

export default OurProject;
