import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Slider from "react-slick";
// import Link from "next/link";
import axios from "axios";
import SearchBox from "../commonComponent/searchBox/searchBox";

function MainBenner() {
  const [flatMenu, setFlatMenu] = useState(0);
  const [dropDownFlag, setDropDownFlag] = useState(false);
  const [bennerData, setBennerData] = useState([]);
  // const [imageData, setImageData] = useState();s

  // const [dropDownTypeFlag, setDropDownTypeFlag] = useState({
  //   status: false,
  //   key: null,
  // });
  // const flatHandler = (index) => {
  //   setFlatMenu(index);
  // };

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

  // -------benner------//

  useEffect(() => {
    getHomeBanner();
  }, []);
  const getHomeBanner = () => {
    axios
      .get(`/api/client/getbanner`)
      .then((res) => {
        setBennerData(res.data);
      })
      .catch((res) => {
        return res || [];
      });
  };

  return (
    <>
      <Container className="banner-container">
        <Slider {...settings} className="d-none d-lg-block">
          {bennerData.length &&
            bennerData?.map((imgItem, _id) => {
              return (
                <>
                  <div className="benner_image" style={{}} key={imgItem._id}>
                    {imgItem.url ? (
                      <Image
                        src={imgItem.url}
                        alt="homenennerS"
                        width={1240}
                        height={497}
                        layout="responsive"
                        objectFit="contain"
                        style={{
                          borderRadius: "20px",
                          width: "100%",
                          height: "497px",
                          maxWidth: "100%",
                          maxHeight: "479",
                        }}
                      />
                    ) : null}
                  </div>
                </>
              );
            })}
        </Slider>
        {/* --------------------------------------------search--------------------------------- */}
        <div
          className="search-bar"
          style={{
            marginTop: "40px",
          }}
        >
          <SearchBox />
        </div>
      </Container>
    </>
  );
}

export default MainBenner;
