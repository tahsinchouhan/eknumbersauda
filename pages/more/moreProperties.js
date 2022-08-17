import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CardComponet from "../../components/commonComponent/CardComponent";
import PROPERTYDB from "../../@fakedb/property.db";
import Breadcrumbs from "nextjs-breadcrumbs";
import SearchBox from "../../components/commonComponent/searchBox/searchBox";
import axios from "axios";
import Breadcrumb from 'react-bootstrap/Breadcrumb';

function MoreProperties() {
  const [recentData, setRecentData] = useState([])

  useEffect(() => {
    getRecentlyData()
  }, [])


  const getRecentlyData = () => {
    axios.get(`/api/client/getproperty`)
      .then((res) => {
        setRecentData(res.data);
      })
      .catch((res) => {
        return res || [];
      });
  }
  const propertyCallback = (values) => {
    setRecentData(values)
  }

  let pathname = '/moreProperties';
  pathname = pathname.substring(1);

  return (
    <div>
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
        <SearchBox propertyCallback={propertyCallback} withOutSearch={true} />

        <Row>
          {recentData?.map((data) => {
            return (
              <>
                <Col
                  lg={4}
                  md={6}
                  className="pe-md-2 pe-xl-4 mt-4 mt-md-5"
                  key={data.id}
                >
                  <CardComponet
                    propertiFor={data.type}
                    img={data.images?.length > 0 ? data.images[0] : []}
                    flatName={data.title}
                    location={data.address}
                    amenities={data.amenities}
                    price={data.realprice}
                    offerprice={data.offerprice}
                    slug={data.slug}
                  />
                </Col>
              </>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default MoreProperties;
