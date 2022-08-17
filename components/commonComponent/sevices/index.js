import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BiHomeAlt } from "react-icons/bi";
import { GiJusticeStar } from "react-icons/gi";
import { FaBuilding, FaMapMarkedAlt } from "react-icons/fa";
import { BsHammer } from "react-icons/bs";
import { AddItemButton } from "react-admin";
import ServiceModal from "../modal/servicemodal";

function BestServices() {
  const [modalOpen, setModalOpen] = useState(false); // MODAL STATE TRUE FALSE
  const [bildingData, setBuildingData] = useState([]);
  const [setId, setSetId] = useState("");
  const [modalSuccess, setmodalSuccess] = useState(false)


  const getId = (data) => {
    setSetId(data)
    setModalOpen(true);

  }
  // /api/client/getservice
  useEffect(() => {
    serviceGetData();
  }, []);
  const serviceGetData = async () => {
    const response = await fetch("/api/client/getservice");
    const data = await response.json();
    setBuildingData(data);
  };

  const handleClose = () => setModalOpen(false); // MODAL STATE SET FALSE
  const handleOpen = () => {
    formik.setFieldValue("service", res.content, false);
    setModalOpen(true)
  }; // MODAL STATE SET TRUE

  return (
    <>
      <div style={{ backgroundColor: " #F9F9F9" }} id="services">
        <Container className="">
          <div className="pt-5">
            <div className="text-center mb-5 ">
              <h1 className="homePage-all-headings">Our best services</h1>
            </div>
            <div className="">
              <Row className="justify-content-center">
                {bildingData.length && bildingData?.map((serviceItem, id) => {
                  return (
                    <React.Fragment key={id} >
                      <Col
                        lg={4}
                        md={6}
                        className="mb-5 clickCursor"
                        onClick={() => {
                          getId(serviceItem);
                        }}
                      >
                        <div className="p-4 p-xl-0 mt-3 m-xl-4  text-center">
                          <div
                            className="service_icon mb-5 mx-auto "
                            style={{ background: serviceItem.bgColor }}
                          >
                            <BiHomeAlt className="text-center fs-3 " />
                          </div>
                          <div>
                            <h5 className="mb-3"> {serviceItem.title}</h5>
                            <p className="service_card_para px-1 px-xl-5">
                              {serviceItem.content}
                            </p>
                          </div>
                        </div>
                      </Col>
                    </React.Fragment>
                  );
                })}
              </Row>
            </div>
          </div>
        </Container>
      </div>
      {modalOpen && <ServiceModal show={handleOpen}
        close={handleClose} setId={setId} setmodalSuccess={setmodalSuccess}
      />}
    </>
  );
}

export default BestServices;
