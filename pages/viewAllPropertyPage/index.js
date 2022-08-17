import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import ButtonComponent from "../../components/button/buttonComponent";
import Image from "next/image";
import Breadcrumbs from "nextjs-breadcrumbs";
import { BsGeoAltFill } from "react-icons/bs";
import { FaExpandArrowsAlt } from "react-icons/fa";
import { TbBath } from "react-icons/tb";
import { BiBed } from "react-icons/bi";
import { featured } from "../../@fakedb/featured.db";
import axios from "axios";
import ThirdCard from "../../components/commonComponent/thirdCard";
import SearchBox from "../../components/commonComponent/searchBox/searchBox";
import Breadcrumb from 'react-bootstrap/Breadcrumb';


function ViewAllPropertyPage() {
    const [featuredData, setFeaturedData] = useState([]);

  useEffect(() => {
    getFeatured();
  }, []);

  const getFeatured = () => {
    axios
      .get(`/api/client/getproperty`)
      .then((res) => {
        setFeaturedData(res.data);
      })
      .catch((res) => {
        return res || [];
      });
  };

  let pathname = '/viewAllPropertypage';
  pathname = pathname.substring(1);
  return (
    <>
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

        {/* <SearchBox/> */}
        <h3 className="homePage-all-headings fw-bold  my-5  text-center">
        Featured Properties
        </h3>
        <Row className="px-3">
          {featuredData
            .filter((project) => project.propertyname === "project")
            .map((cardItem, id) => {
              return (
                <React.Fragment key={id}>
                  <Col lg={6} md={6} className=" pe-lg-5">
                    <ThirdCard
                      type={cardItem.type}
                      img={cardItem.images[0]}
                      flatName={cardItem.title}
                      location={cardItem.address}
                      amenities={cardItem.amenities}
                      // price={cardItem.realprice}
                      // offerprice={cardItem.offerprice}
                      price={cardItem.realprice}
                      offerprice={cardItem.offerprice}
                      maxprice={cardItem.maxprice}
                      minprice={cardItem.minprice}
                      slug={cardItem.slug}
                    />
                  </Col>
                </React.Fragment>
              );
            })}
        </Row>
      </Container>
    </>
  );
}

export default ViewAllPropertyPage;
