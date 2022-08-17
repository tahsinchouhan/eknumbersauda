import React, { useState } from "react";
import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
function HappyCustomer() {
  const [customer, setCustomer] = useState([])

  useEffect(() => {
    getCustomer()
  }, [])

  const getCustomer = async () => {
    const response = await fetch("/api/client/getcounter")
    const customerData = await response.json()
    setCustomer(customerData)

  }
  return (
    <>
      <div style={{ backgroundColor: " #F9F9F9" }}>
        <Container className=" py-5">
          <div className="text-center ">
            <Row>
              {customer && customer.slice(0,4).map((counter, _id) => {
                return (
                  <React.Fragment key={counter._id}>
                    <Col
                      xl={3}
                      lg={6}
                      md={6}
                      sm={12}
                      className="mb-4 mb-md-5 mb-xl-0"
                    >
                      <div className="happy_custmer_div mx-auto overflow-hidden">
                        <div className="">
                          <h1 className="happy_tittle mb-0 ">{counter.countNumber}</h1><br />
                          <span className="happy_subTittle ">
                            {counter.countTitle} <br />
                          </span>
                        </div>
                      </div>
                    </Col>
                  </React.Fragment>
                )
              })}
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}

export default HappyCustomer;
