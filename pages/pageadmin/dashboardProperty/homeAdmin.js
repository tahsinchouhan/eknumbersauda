import React, { useState } from "react";
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import AdminDashboard from "../../../components/admin/adminDashboard";
import ButtonComponent from "../../../components/button/buttonComponent";

function HomeAdmin() {
  const validationSchema = yup.object().shape({
    image: yup.mixed().required("Image is required"),
  });

  const initialValues = {
    image: "",
  };

  const onSubmit = (values) => {
    Router.push("./propertyData");
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  return (
    <>
      <div className="">
        <div className="p-4" style={{ backgroundColor: "#0098DA" }}>
          <h5
            className="text-white m-0 fw-bold andmin-paridhi-text"
            style={{ letterSpacing: "3px" }}
          >
            PARIDHI
          </h5>
        </div>
        <div className="d-flex">
          <div lg={2} md={12}>
            {" "}
            <AdminDashboard />
          </div>
          <div lg={10} md={10} className="px-4 py-2 w-100 mt-5">
            <Card>
              <form onSubmit={formik.handleSubmit}>
                <Row className="m-4 p-4 ">
                  <div>
                    <h4 className="header  pt-3 mb-4">Home</h4>
                  </div>
                  <Col lg={6} md={6}>
                    <Form.Group
                      as={Col}
                      md="12"
                      className="mb-4"
                      controlId="validationFormik01"
                    >
                      <label>Home benner</label>
                      <Form.Control
                        placeholder=" image"
                        type="file"
                        name="image"
                        {...formik.getFieldProps("image")}
                        onChange={(e) => {
                          formik.setFieldValue("image", e.target.value);
                        }}
                      />
                      {formik.touched.title && formik.errors.image && (
                        <small className="text-danger">
                          {formik.errors.image}
                        </small>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={12} className="mb-3 mt-3">
                    <ButtonComponent
                      type="submit"
                      className="btn btn_contact"
                      text="Submit"
                      style=" my-3 px-5 py-3"
                    />
                  </Col>
                </Row>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeAdmin;
