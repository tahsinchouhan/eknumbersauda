import axios from "axios";
import Image from "next/image";
import React from "react";
import { useState, useRef } from "react";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AiFillStar } from "react-icons/ai";
import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIosNew } from "react-icons/md";
import { useRouter } from 'next/router'
import Slider from "react-slick";


function Ratiing() {
  const [ratting, setRatting] = useState()
  const router = useRouter()


  const settings = {
    dots: false,
    speed: 500,
    slidesToShow: ratting?.length > 3 ? 3 : ratting?.length,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <MdArrowBackIosNew />,
    nextArrow: <MdArrowForwardIos />,

    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    getTestimonials()
  }, [])

  const getTestimonials = () => {
    axios.get(`/api/client/gettestimonials`)
      .then((res) => {
        setRatting(res.data);
      })
      .catch((res) => {
        return res || [];
      });
  }

  return (
    <>
      <div id="testimonials" >
        <Container className="my-5 overflow-hidden for-arrows"  >
          <div className="text-center">
            <p className="text-Testimonials fw-bold">Testimonials</p>
            <h3 className="fw-bold homePage-all-headings">
              What people say about us?
            </h3>
            <p className="mt-3 px-4 rating-para">
              Here you can see our clients reviews&apos; around the world
            </p>
          </div>
          <Slider {...settings} className="w-100  overflow-hidden ">
            {ratting?.map((item, _id) => {
              return (
                <>
                  <div className="my-3 ratting-slider" key={_id}>
                    <div className="cardd p-4 p-xxl-5 mx-2 my-5">
                      <div className="d-flex">
                        <div className="star-icon ms-1">
                          {new Array(item.star).fill(null).map(() => (
                            <>
                              <AiFillStar key={_id} />
                            </>
                          ))}
                        </div>
                      </div>
                      <div className="my-4 my-xxl-5">
                        <p className="pe-3 pe-lg-5">{item.content ? item.content.slice(0, 80) : item.content}</p>
                      </div>
                      <div className="cardd-image mt-4 mt-xxl-5 ">
                        <div className="d-flex">
                          <div className="profile-img-div rounded-circle">
                            <Image
                              src={item.image.length>0?item.image[0]:[]}
                              width={50}
                              height={50}
                              alt="profileImg"
                              className="rounded-circle"
                            />
                          </div>
                          <div className=" align-self-center ms-3">
                            <span className="fw-bold mt-3 profile-text">
                              {item.name}
                            </span>
                            <p className="  profile-text-city">
                              {item.address}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </Slider>

        </Container>
      </div>


    </>
  );
}

export default Ratiing;

