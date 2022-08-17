import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { TbHome2 } from "react-icons/tb";
import Image from "next/image";
import Owner from '../../../public/images/owner.jpeg'

function About() {
  const aboutText = [
    {
      id: 1,
      // bgColor: "#9672FF",
      image: "/images/men.png",
      title: "Sanju",
      dsp: "Find your place with immersive photo experience and the most listings, including things you won’t find anywhere else",
    },
    {
      id: 2,
      // bgColor: "#9672FF",
      image: "/images/men.png",
      title: "Yuraj",
      dsp: "Wheather you sell with new Zilow offers or take another approach, we’ll help you navigate the path to a successful sale",
    },
    {
      id: 3,
      // bgColor: "#9672FF",
      image: "/images/house.jpg",
      title: "Aman",
      dsp: "We’re creating a seamless online bussiness experience from shopping on the largest rental network, to applying, to paying rent",
    },
  ];
  return (
    <>
      <Container className="" id="about">
        <div className="py-5">
          <div className="little_header text-center px-3 mx-auto">
            <div className="little_head">
              <h1 className=" homePage-all-headings">
                Here Is A Little About
                <br />
                <span>Our Owner</span>
              </h1>
            </div>
            <div className="about_what mx-auto"></div>
          </div>
          <div className="">
            <Row className="justify-content-center py-4 owner-row">
              {/* {aboutText.map((item, id) => {
                return (
                  <React.Fragment key={id}>
                    <Col lg={4} md={12} className="px-3">
                      <div className="little_about_div m-0 m-xl-5 text-center my-3 px-2 py-4 py-sm-5 ">
                        <div className=" little_about_icon rounded-circle mb-3 mx-auto mt-5 ">
                          {item.image
                            ?
                            <Image
                            src={item.image}
                            width={160}
                            height={160}
                            // objectFit="cover"
                            alt="profileImg"
                            // className="rounded-circle"
                            style={{borderRadius: '10px'}}
                          />
                          :null
                          }
                        </div>
                        <div>
                          <h5 className="about-card-heading fw-bold">
                            {item.title}
                          </h5>
                          <p className="about-card-para px-3 mt-3 mb-5">
                            {item.dsp}
                          </p>
                        </div>
                      </div>
                    </Col>
                  </React.Fragment>
                );
              })} */}
              <Col>
                <Image
                  src={Owner}
                  width={641}
                  height={427}
                  // objectFit="cover"
                  alt="profileImg"
                  // className="rounded-circle"
                  style={{ borderRadius: '10px' }}
                />
              </Col>
              <Col className="main-owner p-5">
                <div className="main-owner-details">
                  <h3 className="owner-about">Roshan {'&'} Alok</h3>
                  <p className="owner-about-p">Property Providers for our home was a financially rewarding and stress-free experience. The team at Property Providers organised everything with ease and efficiency. Their attention to detail was outstanding and their ‘nothing is a problem’ attitude exemplary.</p>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        {/* <GiJusticeStar />
                    <FaMapMarkedAlt />
                    <BsHammer /> */}
      </Container>
    </>
  );
}

export default About;
