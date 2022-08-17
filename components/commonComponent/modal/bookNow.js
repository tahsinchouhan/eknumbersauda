/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { Modal, InputGroup, Row, Col, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import ButtonComponent from "../../button/buttonComponent";
import axios from "axios"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function bookNow({ show, close, bookId,setDisplayToast }) {
  const [bookNowId, setbookNowId] = useState("")

  const phoneRegExp = /^[6-9][0-9]{9}$/;
  const validationSchema = yup.object().shape({
    name: yup.string().required("name is required"),
    email: yup.string().required("email is required"),
    phone: yup
      .string()
      .required("mobile number is required")
      .matches(phoneRegExp, "mobile number is not valid"),
    message: yup.string().required("message is required"),
  });
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    message: "",
    propertyID: "",
  };

  useEffect(() => {
    setbookNowId(bookId)
  }, [])

  const onSubmit = (values, onSubmitProps) =>
  {
    const payload = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      message: values.message,
      propertyID: bookNowId,
    }
    axios({
      method: "post",
      url: `/api/actions/getintouch`,
      headers: {
        "Content-Type": "application/json",
      },
      data: payload,
    })
      .then((res) => {
        if (res.data) {
          setDisplayToast(true)
          toast.success("property added successfully",{ theme: "colored",});
          onSubmitProps.resetForm();
          close();
        }
      })
      .catch((res) => {
        toast.error("something went wrong",{ theme: "colored",});
      });
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  })
  return (
    <>
      <Modal show={show} onHide={close} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton><Modal.Title id="contained-modal-title-vcenter"></Modal.Title></Modal.Header>
        <Modal.Body>
          <h3 className="text-center mb-5">Get In Touch With Us</h3>
          <form onSubmit={formik.handleSubmit} className="mt-1">
            <Row className="mx-4">
              <Col lg={12} md={12}>
                <Form.Group as={Col} md="12" className="mb-4" controlId="validationFormik01">
                  <Form.Control placeholder="Enter your name" type="text" name="name"
                    {...formik.getFieldProps("name")}
                    onChange={(e) => {
                      formik.setFieldValue("name", e.target.value);
                    }}
                  />
                  {formik.touched.name &&
                    <small className='text-danger'>
                      {formik.errors.name}
                    </small>
                  }
                </Form.Group>
              </Col>
              <Col lg={12} md={12}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Control placeholder="Enter your email" type="email" name="email"
                    {...formik.getFieldProps("email")}
                    onChange={(e) => {
                      formik.setFieldValue("email", e.target.value);
                    }}
                  />
                  {formik.touched.email &&
                    <small className='text-danger'>
                      {formik.errors.email}
                    </small>
                  }
                </Form.Group>
              </Col>

              <Col lg={12} md={12}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">+91</InputGroup.Text>
                    <Form.Control placeholder="Enter your mobile number" type="text" name="phone"
                      {...formik.getFieldProps("phone")}
                      onChange={(e) => {
                        formik.setFieldValue("phone", e.target.value);
                      }}
                    />
                  </InputGroup>
                  {formik.touched.phone &&
                      <small className='text-danger'>
                        {formik.errors.phone}
                      </small>
                    }
                </Form.Group>
              </Col>

              <Col lg={12} md={12}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Control className="form-Control " type="text"
                  placeholder="message..."
                   name="message" as="textarea" rows={4}   {...formik.getFieldProps("message")}
                    onChange={(e) => {
                      formik.setFieldValue("message", e.target.value);
                    }}
                  />
                  {formik.touched.message &&
                    <small className='text-danger'>
                      {formik.errors.message}
                    </small>
                  }
                </Form.Group>
              </Col>
              <Col lg={12} md={12}>
                <div className="text-center">
                  <ButtonComponent type="submit" className="btn btn_contact" text="Submit" style=" my-3 px-5 py-3" />
                </div>
              </Col>
            </Row>
          </form>
        </Modal.Body>
      </Modal>
      <ToastContainer />

    </>
  );
}

