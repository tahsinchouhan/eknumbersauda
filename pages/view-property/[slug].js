import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { HiLocationMarker } from "react-icons/hi";
import { GiTap, GiThreeLeaves, GiFlowerPot } from "react-icons/gi";
import CardComponet from "../../components/commonComponent/CardComponent";
import ButtonComponent from "../../components/button/buttonComponent";
import BookNow from "../../components/commonComponent/modal/bookNow";
// import Slider from "react-slick";
import Link from "next/link";
import {
  FaExpandArrowsAlt,
  FaSwimmer,
  FaHandHoldingWater,
  FaBath,
  FaRunning,
} from "react-icons/fa";
import { AiFillThunderbolt, AiOutlineWifi } from "react-icons/ai";
import Breadcrumbs from "nextjs-breadcrumbs";
import styled from "styled-components";
import { useRouter } from "next/router";
import axios from "axios";
import { ImPower } from "react-icons/im";
import { CgGym } from "react-icons/cg";
import { GiLift } from "react-icons/gi";
import { GiTireTracks } from "react-icons/gi";
import {
  MdOutlineSecurity,
  MdLocalParking,
  MdPool,
  MdOutlineFireExtinguisher,
  MdKingBed,
} from "react-icons/md";
import { IoIosConstruct, IoBedSharp } from "react-icons/io";
import { IdIcons, PaymnetIcons } from "../../utils/constants";
import { toast, ToastContainer } from "react-toastify";
import OurProject from "../../components/commonComponent/latestProperty/ourProject";
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const options = [
  { value: "Gym", label: "Gym" },
  { value: "Power Backup", label: "Power Backup" },
  { value: "Lift(s)", label: "Lift(s)" },
  { value: "Jogging Track", label: "Jogging Track" },
  { value: "Security", label: "Security" },
  { value: "Car Parking", label: "Car Parking" },
  { value: "Garden", label: "Garden" },
  { value: "Water Supply", label: "Water Supply" },
  { value: "Swimming Pool", label: "Swimming Pool" },
  { value: "Maintenace", label: "Maintenace" },
  { value: "Wi-fi", label: "Wi-fi" },
  { value: "Fire safty", label: "Fire safty" },
  { value: "Playground", label: "Playground " },
  { value: "2 Bed", label: "2 Bed " },
  { value: "3 Bed", label: "3 Bed " },
  { value: "2 Bath", label: "2 Bath " },
];


const ReadMore = ({ description }) => {
  // const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? description.substr(0, 250) : description}
      {description.length > 250 && (
        <span onClick={toggleReadMore} className="read-or-hide">
          {isReadMore ? "...read more" : " show less"}
        </span>
      )}
    </p>
  );
};


function ViewPropertyId({ property }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
    ],
  };

  const router = useRouter();
  const slugId = router.query.slug;
  const [modalOpen, setModalOpen] = useState(false);
  const [displayToast, setDisplayToast] = useState(false);

  const handleClose = () => setModalOpen(false);
  const handleOpen = () => setModalOpen(true);
  const [getPropertyData, setGetPropertyData] = useState([]);
  const [viewId, setViewId] = useState("");
  const [bookId, setBookId] = useState("");
  const [similerData, setSimilerData] = useState([])
  const [propertyId, setPropertyId] = useState("")


  useEffect(() => {
    setViewId(router.query.slug);
    getPropertyCall(slugId);
    setBookId(slugId);
  }, [slugId]);

  useEffect(() => {
    if (getPropertyData) {
      getSimiler();
    }
  }, [getPropertyData])

  useEffect(() => {
    if (displayToast) {
      toast.success("booknow added successfully");
    }
  }, [displayToast]);

  //Get Api
  const getPropertyCall = (slugId) => {
    axios({
      method: "get",
      url: `/api/client/getproperty/${slugId}`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setGetPropertyData(res.data);
        setPropertyId(res.data._id)
      })
      .catch((res) => {
        return res || [];
      });
  };

  // ----getSimiler-api---//


  const getSimiler = async () => {

    await axios.get(`/api/client/getsimiler?type=${getPropertyData.type}&slug=${getPropertyData.slug}`)
      .then((res) => {
        setSimilerData(res.data)
      })
      .catch((res) => {
        return res || [];
      })
  }



  return (
    <>
      <div className="d-md-none breadcrumb-div">
        <Breadcrumb className="" style={{ whiteSpace: "break-spaces" }}>
          <Breadcrumb.Item href="/" style={{ color: "rgb(155, 151, 151)" }}>Home</Breadcrumb.Item>
          <span style={{ color: 'red' }}>{getPropertyData.title}</span>
        </Breadcrumb>

        {/* <Breadcrumbs
          className="breadcrumbs-itme"
          useDefaultStyle
          activeItemClassName="brActive"
        /> */}
      </div>
      <div className=" px-1 px-lg-5 mt-4 view-property">
        <Container>
          {/* --------------------------------Carousel section-------------------------------  */}
          <Carousel interval={10000}>
            {getPropertyData?.images?.map((CarouselImgData) => {
              return (
                <Carousel.Item key={CarouselImgData.slug} className="rounded ">
                  {CarouselImgData
                    ?
                    <Image
                      className="d-block rounded "
                      src={CarouselImgData}
                      alt="First slide"
                      width={1920}
                      height={700}
                    />
                    : null
                  }
                </Carousel.Item>
              );
            })}
          </Carousel>
          {/* --------------------VillaName  Loction ₹ And Description section------------------ */}
          <Row>
            <Col lg={6} md={6} sm={12}>
              <h4 className="fw-bold villa-name mt-3">{getPropertyData.title}</h4>
              <div className="d-flex  mt-3 mt-md-5">
                <div className="align-self-center me-3">
                  <HiLocationMarker className="location-icon" />
                </div>
                <div className="location-text ">{getPropertyData?.address}</div>
              </div>

              {/* {getPropertyData.propertyname === "property" &&
                <>
                  <div>
                    <div className="location-text ms-4 mt-3 fw-bold">{getPropertyData.sqft}  sq.ft</div>
                  </div>
                  <div>
                    <div className="location-text ms-4 fw-bold">{getPropertyData.ratepersqft}  Rate/per sq.ft</div>
                  </div>
                </>
              } */}
              {
                getPropertyData.propertyname === "property" &&
                <>
                  <div>
                    <p className="location-text ms-4 mt-3 fw-bold">{getPropertyData.sqft}  sq.ft</p>
                  </div>
                </>
              }
              <div>
                <p className={getPropertyData.propertyname === "property" ? "location-text ms-4 fw-bold" : "mt-3 ml-3 location-text ms-4 fw-bold"}>{getPropertyData.ratepersqft}  Rate/per sq.ft</p>
              </div>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <div className=" mt-3 mt-md-4 pe-4 float-md-end">
                <span className="price-and-fourMore fw-bold">
                  {getPropertyData.propertyname === "project" &&
                    <>
                      ₹ {getPropertyData.minprice}&nbsp;-&nbsp;₹&nbsp;{getPropertyData.maxprice}
                    </>}
                  {getPropertyData.propertyname === "property" &&
                    <>
                      <div>
                        <p className="text-real-price fw-bold align-self-center text-center">
                          ₹  {getPropertyData?.offerprice}
                        </p>
                        <p className="text-price fw-bold align-self-center">
                          <s> ₹ {getPropertyData.realprice}</s>
                        </p>
                      </div>
                      {/* ₹ {getPropertyData?.offerprice}&nbsp;&nbsp;&nbsp;
                      <s>₹ {getPropertyData.realprice}</s> */}
                    </>}
                </span>
              </div>
            </Col>
          </Row>
          <div className=" mt-3 mt-md-4">
            <span className="price-and-fourMore fw-bold view-property-description">
              Description
            </span>
            <p className="pe-2 pe-5 mt-3 mt-md-4 view-property-description ">
              {/* {getPropertyData?.description} */}
              <ReadMore description={getPropertyData?.description || ""} />
            </p>


          </div>
          {/* --------------------Amenities Map Why Choose Book Now ------------------------ */}
          <Row className="mt-5">
            <Col lg={6} mt-3 mt-md-0>
              <h4 className="price-and-fourMore fw-bold m-0 ">Amenities</h4>
              <Row>
                {getPropertyData?.amenities?.length &&
                  getPropertyData?.amenities
                    ?.slice(0, 14)
                    .map((item, index) => (
                      <React.Fragment key={index}>
                        <Col
                          xs={6}
                          lg={4}
                          className="d-flex mt-4 mt-md-5"
                        >
                          <span className="align-self-center bath-icon">
                            {item.icon
                              ?
                              <Image src={item?.icon} alt="icon" width={20} height={20} />
                              : null
                            }
                          </span>
                          <p className="text-bed-bath-sqft ms-2 mb-0 "> {item?.value}</p>
                          {/* <IdIcons key={item._id} paymentOption={item.icon} /> */}
                          {/* <div className="view-property-icons-text">{item.value}</div> */}
                        </Col>
                      </React.Fragment>
                    ))}
              </Row>
              <div className="  mt-5">
                <h4 className="price-and-fourMore fw-bold mb-4 ">
                  Why Choose This Property?
                </h4>
              </div>

              <div className="mt-2 mt-md-3">
                <div className="d-flex">
                  <div className="number-div me-2 me-md-3">1</div>
                  <div className="align-self-center why-choose-content-text fw-bold">
                    {getPropertyData.whychoose1}
                  </div>
                </div>
              </div>
              <div className="mt-2 mt-md-3">
                <div className="d-flex">
                  <div className="number-div me-2 me-md-3">2</div>
                  <div className="align-self-center why-choose-content-text fw-bold">
                    {getPropertyData.whychoose2}
                  </div>
                </div>
              </div>
              <div className="mt-2 mt-md-3">
                <div className="d-flex">
                  <div className="number-div me-2 me-md-3">3</div>
                  <div className="align-self-center why-choose-content-text fw-bold">
                    {getPropertyData.whychoose3}
                  </div>
                </div>
              </div>
              <div className="mt-2 mt-md-3">
                <div className="d-flex">
                  <div className="number-div me-2 me-md-3">4</div>
                  <div className="align-self-center why-choose-content-text fw-bold">
                    {getPropertyData.whychoose4}
                  </div>
                </div>
              </div>
              <div className="mt-2 mt-md-3">
                <div className="d-flex">
                  <div className="number-div me-2 me-md-3">5</div>
                  <div className="align-self-center why-choose-content-text fw-bold">
                    {getPropertyData.whychoose5}
                  </div>
                </div>
              </div>

            </Col>
            <Col
              lg={6}
              className="text-center text-md-end mt-5 mt-lg-0 map-div"
            >
              <iframe
                src={getPropertyData?.iframe}
                width="100%"
                height="100%"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                className="iframe-div"
              ></iframe>
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              <div className=" mt-5 ">
                <ButtonComponent
                  text="Book Now"
                  style="px-2 px-md-5  py-2 py-md-3"
                  clickOnButton={() => {
                    setModalOpen(true);
                    setBookId(slugId);
                  }}
                />
              </div>
            </Col>
            <Col lg={6}>
              <div>
                <div className="location-text mt-5 ms-md-3 fw-bold">RERA No.{getPropertyData.rera}</div>
              </div></Col></Row>
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
          {modalOpen && (
            <BookNow
              show={handleOpen}
              close={handleClose}
              bookId={propertyId}
              setDisplayToast={setDisplayToast}
            />
          )}
        </Container>
        <ToastContainer />
      </div>
    </>
  );
}

export default ViewPropertyId;
