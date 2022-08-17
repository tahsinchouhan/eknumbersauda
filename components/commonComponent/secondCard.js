import React, { useState } from "react";
import Image from "next/image";
import { BsGeoAltFill } from "react-icons/bs";
import { FaExpandArrowsAlt } from "react-icons/fa";
import { TbBath } from "react-icons/tb";
import { BiBed } from "react-icons/bi";
import ButtonComponent from "../../components/button/buttonComponent";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import { PaymnetIcons } from "../../utils/constants";

function SecondCard(props) {
  const {
    amenities, img, title, address, bed, maxprice, minprice, slug, propertiFor, icon } = props
  const [recentView, setRecentView] = useState([]);

  const router = useRouter();

  const ourProjectHandler = (slug) => {
    setRecentView(slug);
    router.push(`/view-property/${slug}`);
  };

  // {amenities?.length && amenities?.slice(0,1).map((item, _id) => {
  // })}
  return (
    <div>
      <div className="">
        <div>
          {
            img
            ?  <Image
            src={img}
            alt="our_home"
            width={650}
            height={429}
            className="our_project_image"
            style={{ borderRadius: "10px" }}
          />
          :null
          }
        
          <style jsx global>{`.our_project_image { width:"100%" height:"429"}
     `}</style>
        </div>

        <div className="sanju">
          <Card className="py-3 py-sm-4 ps-1 ps-md-2 recent_card">
            <Row className="ms-2">
              <Col md={6} className="mb-1 p-0">
                <div>
                  <h5 className="recent_card_header mb-3">
                    {title}
                  </h5>
                  <div className="d-flex pt-0 mt-0">
                    <BsGeoAltFill className="align-self-center map_icon " />
                    <span className="card_address ps-2" style={{ whiteSpace: "break-spaces" }}>
                      {address}
                    </span>
                  </div>
                </div>
              </Col>
              <Col md={6} className="pe-4 ps-0">
                <div className="ps-0 ps-lg-2 text-md-end">
                  <h6 className="card_price ms-0 ms-md-4 ">
                    ₹ {minprice}- ₹ {maxprice}
                  </h6>
                  {/* <p className="text-real-price fw-bold align-self-center  ms-0 ms-md-4 ms-xl-5 text-md-end">
                    <s>  ₹ {minprice}</s>
                  </p> */}
                </div>
              </Col>
              <Row className=" align-items-center ">
                {amenities?.length && amenities?.slice(0,3).map((item, _id) => {
                  return (

                    <Col xs={4} md={12} xl={3} className="d-flex py-1 p-sm-2 pe-0" key={_id}>
                      <span className=" align-self-center bath-icon" >
                        {item.icon
                        ?
                        <Image src={item.icon} alt="icon" width={20} height={20}/>
                        :null
                      }
                      </span>
                      <p className="text-bed-bath-sqft m-0 ms-2"> {item?.value}</p>
                    </Col>

                  )
                })}
                
                <Col xs={12} md={12} xl={3} className="p-0 mt-3 mt-md-0">
                  <div
                    className="text-end"
                    onClick={() => ourProjectHandler(slug)}
                  >
                    <ButtonComponent text="View Property" />
                  </div>
                </Col>
              </Row>
            </Row>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default SecondCard;
