import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button, Carousel } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";


function ImageUploadMultiple({
  heading,
  accept,
  multiple,
  images,
  setImages,
  isCarousel,
  disabled = false

}) {

  // arr.length;
  const addImage = (e) => {
    let imgs = []
    if(e.target.files?.length > 0){
      for (let i = 0; i < e.target.files?.length; i++) {
        imgs.push({ src: URL?.createObjectURL(e.target.files[i]), file: e.target.files[i] })
      }
    }
    setImages([
      ...images,
      // URL?.createObjectURL(e.target.files[0]) ,
      // { src: URL?.createObjectURL(e.target.files[0]), file: e.target.files[0] },
      ...imgs
    ]);
  };
  const removeImage = (index) => {
    setImages(images.filter((_val, idx) => idx != index));
  };

  const imagePreview = (images) => {
    let renderUploadImages = images?.map((item, idx) => {

      return (
        <>
        <Col md={3}>
        <div className="multi_image">
          {/* <Carousel interval={10000}>
        <Carousel.Item className="rounded "> */}
          <div 
            key={idx}
            style={{
              width: isCarousel ? "100%" : "80px",
              height: isCarousel ? "100px" : "63px",
              maxWidth: "100%",
              marginRight: "16px",
              display: "flex",
              justifyContent: "center",
              borderRadius: "4px",
              position: "relative",
              padding: isCarousel ? "2px" : "0",
            }}
          >
            {
              !disabled &&
              <Button
                style={{
                  backgroundColor: "#fff !important",
                  boxShadow: "0px 1px 1px rgb(0 0 0 / 25%)",
                  padding: "0",
                  minWidth: "10px",
                  zIndex: "500",
                  minHeight: "10px",
                  borderRadius: "100%",
                  position: "absolute",
                  top: isCarousel ? "5px" : "4px",
                  right: isCarousel ? "5px" : "4px",
                  "&:hover": {
                    backgroundColor: "red !important",
                  },
                }}
                onClick={() => {
                  removeImage(idx);
                }}
              >
                x
              </Button>
            }

            <Image
              src={item?.src}
              alt="image"
              height="250px"
              width="100%"
            />

          </div>
          {/* </Carousel.Item>
      </Carousel> */}
        </div>
      </Col>
    </>
      );
    });
    return renderUploadImages;
  };

  return (
    <>
      <input
        className="p-3"
        placeholder=" image"
        accept={accept}
        type="file"
        name="file"
        multiple="multiple"
        onChange={addImage}
        disabled={disabled}
      />

      {isCarousel && images?.length && images ? (
          <Row>
          {imagePreview(images)}
    </Row>
        // <Carousel interval={10000}>
        //   <Carousel.Item className="rounded ">
        //     {imagePreview(images)}
        //   </Carousel.Item>
        // </Carousel>
      ) : (
        <> {imagePreview(images)}</>
      )}
    </>
  );
}

export default ImageUploadMultiple;
