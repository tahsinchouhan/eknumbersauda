import React from "react";
import { Col, Container, Row, Form, Button, } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import Image from "next/image";
import axios from "axios";

import men from "../../public/images/men.png";
import ButtonComponent from "../button/buttonComponent";
import { toast, ToastContainer } from "react-toastify";

function Contact() {
  const initialValues = {
    name: "",
    email: "",
    mobile: "",
    message: "",
  };

  const phoneRegExp = /^[6-9][0-9]{9}$/;
  const validationSchema = yup.object().shape({
    name: yup.string().required("Required*"),
    email: yup.string().required("Required*"),
    mobile: yup
      .string()
      .required("Required*")
      .matches(phoneRegExp, "Phone number is not valid"),
    message: yup.string().required("Required*"),
  });

  const onSubmit = (values, onSubmitProps) => {
    const payload = {
      name: values.name,
      email: values.email,
      phone: values.mobile,
      messages: values.message,
      dateOfBirth: "10/10/2000",
    };
    axios({
      method: "post",
      url: "/api/actions/contact",
      data: payload,
    })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Your response is submitted successfully", {
            theme: "colored",
          });
        }
        onSubmitProps.resetForm();
      })
      .catch((err) => {
        toast.success(err, {
          theme: "colored",
        });
        return err || "";
      });
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  return (
    <>
      <div style={{ backgroundColor: " #F9F9F9" }} id="contact">
        <Container className=" py-5">
          <div>
            <Row>
              <Col lg={12} md={12}>
                <div
                  className="text-center mb-5"
                  style={{ marginBottom: "10rem" }}
                >
                  <span className="pb-2 homePage-all-headings fw-bold">
                    Contact with us
                  </span>
                  <p className="mt-4 px-4 contact-us-para">
                    In publishing and graphic design, Lorem ipsum is a
                    placeholder text commonly used to demonstrate the visual
                    form of a.
                  </p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={5} md={5} sm={12} className="text-center">
                <div className="contact_image_div">
                  <Image
                    src={men}
                    alt="men"
                    height={500}
                    width={400}
                    className="contact_image"
                  />
                </div>
              </Col>
              <Col lg={7} md={7} sm={12} className="mt-5 mt-md-0 px-3">
                <form onSubmit={formik.handleSubmit}>
                  <Row>
                    <Col lg={12} md={12}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          className="contact-form-control input-box"
                          type="text"
                          name="name"
                          placeholder="Enter your name"
                          {...formik.getFieldProps("name")}
                          onChange={(e) => {
                            formik.setFieldValue("name", e.target.value);
                          }}
                        />
                        {formik.touched.name && formik.errors.name && (
                          <div className="text-danger">
                            {formik.errors.name}
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                    <Col lg={12} md={12}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          className="contact-form-control input-box"
                          type="email"
                          name="email"
                          placeholder="Enter your email"
                          {...formik.getFieldProps("email")}
                          onChange={(e) => {
                            formik.setFieldValue("email", e.target.value);
                          }}
                        />

                        {formik.touched.email && formik.errors.email && (
                          <div className="text-danger">
                            {formik.errors.email}
                          </div>
                        )}
                      </Form.Group>
                    </Col>

                    <Col lg={12} md={12}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          className="contact-form-control input-box"
                          type="number"
                          name="mobile"
                          placeholder="Mobile number"
                          {...formik.getFieldProps("mobile")}
                          onChange={(e) => {
                            formik.setFieldValue("mobile", e.target.value);
                          }}
                        />
                        {formik.touched.mobile && formik.errors.mobile && (
                          <div className="text-danger">
                            {formik.errors.mobile}
                          </div>
                        )}
                      </Form.Group>
                    </Col>

                    <Col lg={12} md={12}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Control
                          className="contact-form-control "
                          type="text"
                          name="message"
                          as="textarea"
                          rows={5}
                          placeholder="Write your message"
                          {...formik.getFieldProps("message")}
                          onChange={(e) => {
                            formik.setFieldValue("message", e.target.value);
                          }}
                        />
                        {formik.touched.message && formik.errors.message && (
                          <div className="text-danger">
                            {formik.errors.message}
                          </div>
                        )}
                      </Form.Group>
                    </Col>

                    <Col lg={12} md={12}>
                      <div className="mt-2 mt-lg-3">
                        <ButtonComponent
                          type="submit"
                          className="btn btn_contact"
                          text="Submit"
                          style="px-3 px-lg-5 py-2 py-lg-3"
                        />
                      </div>
                    </Col>
                  </Row>
                </form>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <ToastContainer />
    </>
  );
}

export default Contact;
