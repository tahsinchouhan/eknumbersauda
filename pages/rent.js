import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CardComponet from "../components/commonComponent/CardComponent";
import PROPERTYDB from "../@fakedb/property.db";
import Breadcrumbs from "nextjs-breadcrumbs";
import styled from "styled-components";
import SearchBoxComponent from "../components/commonComponent/searchBox/searchBoxComponent";
import axios from "axios";
import { useRouter } from "next/router";
import Breadcrumb from 'react-bootstrap/Breadcrumb';


export default function Rent() {
  const { query } = useRouter()
  const [propertyData, setPropertyData] = useState([]);
  const [rentType, setRentType] = useState("");

  const [similerData, setSimilerData] = useState([])

  const router = useRouter();
  useEffect(() => {
    if (router.query.type) {
      let params = {
        type: router.query.type,
        lowerrange: router.query.lowerrange,
        higherrange: router.query.higherrange,
      }
      if (router.query.address) {
        params = {
          ...params,
          address: router.query.address
        }
      }
      if (router.query.propertytype && router.query.propertytype !== '') {
        params = {
          ...params,
          propertytype: router.query.propertytype
        }
      }
      // axios({
      //   method: "get",
      //   // url: `/api/client/getfilter?type=${type}&address=${location}&propertytype=${propertytype}&lowerrange=${values.slider.min}&higherrange=${values.slider.max}`,
      //   url: `/api/client/getfilter?type=${router.query.type}&address=${router.query.address}&propertytype=${router.query.propertytype}&lowerrange=${router.query.lowerrange}&higherrange=${router.query.higherrange}`,
      // })
      axios({
        method: "get",
        url: `/api/client/getfilter`,
        params
      })
        .then((res) => {
          setPropertyData(res.data);
        })
        .catch((err) => {
          return err || null;
        });
    } else {
      axios
        .get(`/api/client/getproperty`)
        .then((res) => {
          setPropertyData(res.data);
        })
        .catch((res) => {
          return res || [];
        });
    }
  }, [
    router.query.type,
    router?.query?.address,
    router?.query?.propertytype,
    router?.query?.lowerrange,
    router?.query?.higherrange,
  ]);

  const propertyCallback = (values) => {
    setPropertyData(values);
  };

  let pathname = '/rent';
  pathname = pathname.substring(1);

  const getSimiler = async () => {

    await axios.get(`/api/client/getsimiler`)
      .then((res) => {
        setSimilerData(res.data)
      })
      .catch((res) => {
        return res || [];
      })
  }

  useEffect(() => {
    getSimiler();
  }, [])

  return (
    <>
      <div className="d-md-none">
        <Breadcrumb className="" style={{ whiteSpace: "break-spaces" }}>
          <Breadcrumb.Item href="/" style={{ color: "rgb(155, 151, 151)" }}>Home</Breadcrumb.Item>
          <span style={{ color: 'red' }}>{pathname}</span>
        </Breadcrumb>

        {/* <Breadcrumbs
          useDefaultStyle
          rootLabel="Home"
          activeItemClassName="brActive"
        /> */}
      </div>
      <Container className="mt-5">
        <SearchBoxComponent
          type="Rent"
          rentType={rentType}
          setRentType={setRentType}
          query={query}
          address={query.address}
          propertytype={query.propertytype}
          lowerrange={query.lowerrange}
          higherrange={query.higherrange}
          propertyCallback={propertyCallback}
          withOutSearch={true}
        />
        <Row>
          {propertyData.length ? (
            propertyData
              ?.filter((propert) => propert.type === "Rent")
              .map((data) => {
                return (
                  <React.Fragment key={data._id}>
                    <Col
                      lg={4}
                      md={6}
                      className="pe-md-2 pe-xl-4 mt-4 mt-md-5 "

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
                        dkjvb
                      />
                    </Col>
                  </React.Fragment>
                );
              })
          ) : (
            <div>No Property to show</div>
          )}
        </Row>
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
      </Container>
    </>
  );
}
