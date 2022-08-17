//Common card for Recently Added Properties||Best Real Estate Deals||We've found similar properties for you.....

import React, { useState } from "react";
import Image from "next/image";
import { MdLocationOn } from "react-icons/md";
import { BiBed } from "react-icons/bi";
import { FaExpandArrowsAlt } from "react-icons/fa";
import { TbBath } from "react-icons/tb";
import ButtonComponent from "../button/buttonComponent";
import { Col, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import { PaymnetIcons } from "../../utils/constants"

function CardComponet(props) {
  const {
    amenities, img, flatName, location, bed, offerprice, price, propertyname, maxprice, minprice, slug, propertiFor } = props

  const [recentView, setRecentView] = useState(0);

  const router = useRouter();

  const recentViewHandler = (slug) => {
    setRecentView(slug);
    router.push(`/view-property/${slug}`);
  };
  return (
    <div>
      <div className="card-main-div ">
        <div className="position-relative">
          <div className="card-img-div text-center ">
            {img
              ?
              <Image src={img} width={500} height={350} alt="image" style={{ borderRadius: "20px" }} />
              : null
            }
          </div>
          <div className="position-absolute sell-rent-div px-4 py-2 m-4   ">
            <span>{propertiFor}</span>
          </div>
        </div>
        <div className="card-content p-1 mt-2 mt-sm-3">
          <p className="building-s fw-bold">{flatName}</p>
          <div className="d-flex  mt-2">
            <MdLocationOn className=" align-self-center location-icon me-1" />
            <p className="location-name" style={{ whiteSpace: "break-spaces" }}>{location}</p>
          </div>

          <Row className=" mt-sm-3 ">
            {amenities?.length && amenities?.slice(0, 3).map((item, _id) => {
              return <> <Col xs={4} md={12} lg={4} xl={4} className="d-flex py-1 p-sm-2 pe-0">
                <span className=" align-self-center bath-icon" >
                  {item.icon
                    ?
                    <Image src={item?.icon} alt="icon" width={20} height={20} />
                    : null
                  }
                </span>
                <p className="text-bed-bath-sqft ms-2"> {item?.value}</p>
              </Col>
              </>
            })}
          </Row>
          <div className="d-flex  justify-content-between mt-3 mt-sm-4  mb-0 mb-sm-2">
            {propertyname === "project" &&
              <div>
                <p className="text-price fw-bold align-self-center">
                  ₹ &nbsp;{minprice} - ₹ &nbsp;{maxprice}
                </p>
                {/* <p className="text-real-price fw-bold align-self-center text-center">
                  <s> ₹ {minprice}</s>
                </p> */}
              </div>
            }
            {propertyname === "property" &&
              <div>
                <p className="text-price fw-bold align-self-center">
                  ₹ &nbsp;{offerprice}
                </p>
                <p className="text-real-price fw-bold align-self-center text-center">
                  <s>₹&nbsp;{price}</s>
                </p>
              </div>}
            <div
              className=" align-self-center"
              onClick={() => recentViewHandler(slug)}
            >
              <ButtonComponent text="View Property" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardComponet;
