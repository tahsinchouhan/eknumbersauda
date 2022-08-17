import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import flat from "../../../public/images/flat.png";
import flatsecond from "../../../public/images/secondbuilding.png";
import ButtonComponent from "../../button/buttonComponent";
import axios from "axios";
import { PaymnetIcons } from "../../../utils/constants";
import ThirdCard from "../../commonComponent/thirdCard";

function FeaturedProperties(props) {
  const {
    amenities,
    img,
    title,
    address,
    bed,
    offerprice,
    price,
    slug,
    propertiFor,
  } = props;
  // const [viewAll, setViewAll] = useState(1);
  const [featuredData, setFeaturedData] = useState([]);
  const router = useRouter();

  // const viewHandler = (id) => {
  //   setViewAll(id);
  //   router.push(`/view-property/${id}`);
  // };

  const viewPropertyHandler = () => {
    router.push(`/viewAllPropertyPage`);
  };

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

  return (
    <>
      <Container className="">
        <div className="py-5">
          <div className=" mx-auto mb-5 ">
            <p className="Recent_featured text-center fw-bold">Recent</p>
            <h3 className="text-center mb-3 homePage-all-headings">
              Featured Properties
            </h3>
            <p className=" px-4  featured-properties-para text-center ">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry is standard. Lorem
              Ipsum has been the industry is standard.
            </p>
          </div>
          <div>
            <Row className="px-3">
              {/* {featuredData.length ? featuredData?.filter(
                (Featured) => Featured.propertyname === "Featured-property"
              ) */}

              {/*---- project --- */}
              {featuredData.length ? featuredData?.filter(
                (project) => project.propertyname === "project"
              ).slice(0, 2).map((cardItem, id) => {
                return (
                  <React.Fragment key={id}>
                    <Col lg={6} md={6} className=" pe-lg-5">
                      <ThirdCard
                        propertyname={cardItem.propertyname}
                        type={cardItem.type}
                        img={cardItem.images?.length > 0 ? cardItem.images[0] : []}
                        flatName={cardItem.title}
                        location={cardItem.address}
                        amenities={cardItem.amenities}
                        price={cardItem.realprice}
                        offerprice={cardItem.offerprice}
                        maxprice={cardItem.maxprice}
                        minprice={cardItem.minprice}
                        slug={cardItem.slug}
                      />
                    </Col>
                  </React.Fragment>
                );
              }) : <div className="d-flex justify-content-center">No display property...</div>}


              {/* ---- other-property ----*/}

              {featuredData.length ? featuredData?.filter(
                (property) => property.propertyname === "property"
              ).slice(0, 2).map((cardItem, id) => {
                return (
                  <React.Fragment key={id}>
                    <Col lg={6} md={6} className=" pe-lg-5">
                      <ThirdCard
                        propertyname={cardItem.propertyname}
                        type={cardItem.type}
                        img={cardItem.images[0]}
                        flatName={cardItem.title}
                        location={cardItem.address}
                        amenities={cardItem.amenities}
                        price={cardItem.realprice}
                        offerprice={cardItem.offerprice}
                        maxprice={cardItem.maxprice}
                        minprice={cardItem.minprice}
                        slug={cardItem.slug}
                      />
                    </Col>
                  </React.Fragment>
                );
              }) : <div className="d-flex justify-content-center">No display property...</div>}

            </Row>
            {featuredData.length && featuredData?.filter(
              (project) => project.propertyname === "project"
            ).length ?
              <div
                className="text-center mb-5"
                onClick={() => viewPropertyHandler()}
              >
                <ButtonComponent
                  text="View All Property"
                  style=" px-3 px-sm-4 py-2 py-sm-3"
                />
              </div> : <div className="d-flex justify-content-center">No property....</div>}
          </div>
        </div>
      </Container>
    </>
  );
}

export default FeaturedProperties;
