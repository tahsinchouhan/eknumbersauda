import React, { useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import Image from "next/image";
import { BsGeoAltFill } from "react-icons/bs";
import { useRouter } from "next/router";
import ButtonComponent from "../button/buttonComponent";
import axios from "axios";
import { PaymnetIcons } from "../../utils/constants";

function ThirdCard(props) {
  const {
    amenities,
    img,
    flatName,
    type,
    location,
    offerprice, price, propertyname, maxprice, minprice,
    slug,
    propertiFor,
  } = props;

  const [viewAll, setViewAll] = useState(0);
  const router = useRouter()

  const viewHandler = (slug) => {
    router.push(`/view-property/${slug}`);
    setViewAll(slug);
  };

  return (
    <div>
      <Card
        style={{ width: "100%" }}
        className="featured_card mb-5 mb-md-4 mb-lg-5 p-2 p-lg-3 "
      >
        {img
          ?
          <Image
            src={img}
            width={500}
            height={280}
            alt="card_image"
            className="featured_card_image"
          />
          : null
        }

        <style jsx global>{`
          .featured_card_image {
            border-radius: 20px;
          }
        `}</style>
        <div className="position-absolute sell-rent-div px-4 py-2 m-4   ">
          <span>{type}</span>
        </div>
        <div className="ms-2 ms-sm-4 mt-3 mt-sm-4 ">
          <div>
            <h5 className="recent_card_header mb-2">
              {flatName}
            </h5>
            <div className="d-flex pt-0 mt-0 align-items-center">
              <BsGeoAltFill className=" map_icon" />
              <span className="card_address ps-2" style={{ whiteSpace: "break-spaces" }}>
                {location}
              </span>
            </div>
          </div>

          <Row className="">
            {amenities?.length &&
              amenities?.slice(0, 3).map((item, _id) => {
                return (
                  <>
                    <Col
                      key={item._id}
                      xs={4}
                      md={12}
                      xl={4}
                      className="d-flex py-1 p-sm-2 pe-0"
                    >
                      <span className=" align-self-center bath-icon">
                        {item.icon
                          ?
                          <Image src={item.icon} alt="icon" width={20} height={20} />
                          : null}
                      </span>
                      <p className="text-bed-bath-sqft m-0 ms-2"> {item.value}</p>
                    </Col>
                  </>
                );
              })}
          </Row>
          <div className="ms-2  mb-2 d-flex  align-items-center justify-content-between ">
            <div className="mb-1 p-0">
              <div className="mt-2">
                {propertyname === "project" &&
                  <>
                    <h6 className="card_price"> ₹ {minprice} -  ₹ &nbsp;{maxprice}</h6>
                    {/* <p className="text-real-price fw-bold align-self-center text-center">
                      <s className="text-real-price fw-bold align-self-center text-center">
                        ₹ {minprice}
                    </s>
                  </p> */}
                  </>}
                {propertyname === "property" &&
                  <>
                    <h6 className="card_price">  ₹&nbsp;{offerprice}</h6>
                    <p className="text-real-price fw-bold align-self-center text-center">
                      <s className="text-real-price fw-bold align-self-center text-center">
                        ₹&nbsp; {price}
                      </s>
                    </p>
                  </>}

              </div>
            </div>
            <div className="ps-0 ps-lg-2">
              <div className="float-lg-end" onClick={() => viewHandler(slug)}>
                <ButtonComponent
                  text="View Property"
                  style=" px-3 px-sm-4 py-2 py-sm-3"
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ThirdCard;
