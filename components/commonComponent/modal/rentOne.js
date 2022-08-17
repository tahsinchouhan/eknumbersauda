import React, { useState } from "react";
import paridhi from "../../../public/images/logo.png";
import home from "../../../public/images/homelogo.png";
import {
  Row,
  Col,
  Modal,
  Form,
  InputGroup,
} from "react-bootstrap";
import Image from "next/image";
import { useFormik } from "formik";
import * as yup from "yup";
import { BsArrowLeft } from "react-icons/bs";
import { BsFillCaretDownFill } from "react-icons/bs";
import ButtonComponent from "../../button/buttonComponent";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Rent({ show, close }) {
  const [rentSteps, setRentSteps] = useState(true);
  const [enablearrow, setEnableArrow] = useState(false);

  const initialValues = {
    username: "",
    email: "",
    phone: "",
    description: "",
    type: "",
  };

  const phoneRegExp = /^[6-9][0-9]{9}$/;
  const validationSchema = yup.object().shape({
    username: yup.string().required("name is required"),
    email: yup.string().required("email is required"),
    phone: yup
      .string()
      .required("mobile number is required")
      .matches(phoneRegExp, "Phone number is not valid"),
    description: yup.string().required("message is required"),
    type: yup.string().required("property type is required"),

  });


  async function onSubmit(values, onSubmitProps) {
    const payload = {
      name: values.username,
      email: values.email,
      phone: values.phone,
      type: values.type,
      message: values.description,
    };
    axios({
      method: "post",
      url: `/api/client/postproperty`,
      headers: {
        "Content-Type": "application/json",
      },
      data: payload,
    })
      .then((res) => {
        if (res.data) {
          toast.success("property added successfully",{ theme: "colored",});
          onSubmitProps.resetForm();
          close();
        }
      })
      .catch((res) => {
        toast.error("something went wrong",{ theme: "colored",});
      });
  }
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  return (
    <>
      <Modal show={show} onHide={close} animation={false} size="xl">
        <Row className=" mx-auto">
          <Col lg={6} md={12} className="d-none d-lg-block">
            <div
              className="p-5 text-center"
              style={{
                backgroundColor: "#F9F9F9",
                borderRadius: "30px 0px 0px 30px",
              }}
            >
              <Image
                src={paridhi}
                className="Home-paridhi"
                width={200}
                height={55}
                alt=""
              />
              <div className="mt-5">
                <Image
                  src={home}
                  className="Home-paridhi"
                  width={293}
                  height={298}
                  alt=""
                />
              </div>
              <div className="text-center">
                <p className="px-2 px-xl-5 m-5 mx-3 mx-xl-5 rent-one-para">
                  Vivamus suscipit tortor eget felis porttitor volutpat.
                  Curabitur non nulla sit tempus convallis quis ac lectus.
                  Curabitur
                </p>
              </div>
            </div>
          </Col>

          <Col lg={6} md={12}>
            <Modal.Header closeButton>
              {enablearrow === true ? (
                <BsArrowLeft
                  className="fw-b fs-3"
                  onClick={() => {
                    setRentSteps(!rentSteps);
                    setEnableArrow(!enablearrow);
                  }}
                />
              ) : null}
            </Modal.Header>
            <Modal.Body>

              <form onSubmit={formik.handleSubmit}>
                <Row className="px-0 px-sm-3 px-xl-5 justify-content-center">
                  <Col md={12}>
                    <h4 className="px-3 px-xl-4 mb-4 text-center">
                      Rent Your Property With <br />
                      Paridhi Group
                    </h4>
                  </Col>
                  <Row>
                    <Form.Group
                      as={Col}
                      md="12"
                      className="mb-4"
                      controlId="validationFormik01"
                    >
                      <Form.Control
                        placeholder="Enter your name"
                        type="text"
                        name="username"
                        {...formik.getFieldProps("username")}
                        onChange={(e) => {
                          formik.setFieldValue("username", e.target.value);
                        }}
                      />
                      {formik.touched.username && formik.errors.username && (
                        <div className="text-danger">
                          {formik.errors.username}
                        </div>
                      )}

                    </Form.Group>

                    <Form.Group
                      as={Col}
                      md="12"
                      controlId="validationFormik02"
                      className="mb-4"
                    >
                      <Form.Control
                        placeholder="Enter your email"
                        type="email"
                        name="email"
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

                    <Form.Group
                      as={Col}
                      md="12"
                      controlId="validationFormikUsername"
                      className="mb-4"
                    >
                      <InputGroup>
                        <InputGroup.Text id="inputGroupPrepend">
                          +91
                        </InputGroup.Text>
                        <Form.Control
                          placeholder="Enter your number"
                          type="number"
                          name="phone"
                          {...formik.getFieldProps("phone")}
                          onChange={(e) => {
                            formik.setFieldValue("phone", e.target.value);
                          }}
                        />
                      </InputGroup>
                      {formik.touched.phone && formik.errors.phone && (
                        <div className="text-danger">
                          {formik.errors.phone}
                        </div>
                      )}
                    </Form.Group>

                    <Form.Group   as={Col}
                      md="12"
                      controlId="validationFormikUsername"
                      className="mb-4">
                      <div
                        className="radio-wrapper mb-0"
                      >
                        <Form.Check
                          inline
                          label="Sell"
                          name="type"
                          type="radio"
                          value="sell"
                          className="check-property "
                          checked={
                            formik.values.type === "sell"
                          }
                          {...formik.getFieldProps("type")}
                          onChange={(e) => {
                            formik.setFieldValue("type", "sell");
                          }}
                        />
                        {/* {formik.touched.type && formik.errors.type && (
                          <div className="text-danger">
                            {formik.errors.type}
                          </div>
                        )} */}

                        <Form.Check
                          inline
                          label="Rent"
                          name="type"
                          type="radio"
                          value="rent"
                          className="check-property"
                          checked={
                            formik.values.type === "rent"
                          }
                          {...formik.getFieldProps("rent")}
                          onChange={(e) => {
                            formik.setFieldValue("type", "rent");
                          }}
                        />
                      </div>
                      {formik.touched.type && formik.errors.type && (
                          <div className="text-danger">
                            {formik.errors.type}
                          </div>
                        )}
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="12"
                      controlId="validationFormik02"
                      className="mb-4"
                    >
                      <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="message...."
                        type="text"
                        name="description"
                        {...formik.getFieldProps("description")}
                        onChange={(e) => {
                          formik.setFieldValue("description", e.target.value);
                        }}
                      />
                      {formik.touched.description && formik.errors.description && (
                        <div className="text-danger">
                          {formik.errors.description}
                        </div>
                      )}
                    </Form.Group>
                  </Row>
                </Row>

                <div className="text-center">
                  <ButtonComponent
                    type="submit"
                    text="Submit"
                    style="px-4 py-2"
                  />
                </div>
              </form>
            </Modal.Body>
          </Col>
        </Row>
      </Modal>
      <ToastContainer />
    </>
  );
}
