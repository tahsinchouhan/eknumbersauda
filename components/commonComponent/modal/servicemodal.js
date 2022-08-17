import React, { useState, useEffect } from "react";
import paridhi from "../../../public/images/logo.png";
import home from "../../../public/images/homelogo.png";
import { Row, Col, Modal, Form, InputGroup } from "react-bootstrap";
import Image from "next/image";
import { Formik } from "formik";
import { useFormik } from "formik";
import axios from "axios"

import * as yup from "yup";
import ButtonComponent from "../../button/buttonComponent";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// HOMEPAGE SERVICE MODAL

export default function ServiceModal({ show, close, setId, setmodalSuccess }) {
  const [getData, setGetData] = useState("")
  const [deepData, setDeepData] = useState("")
  const [servieData, setServieData] = useState([])


  useEffect(() => {
    // getmodal(setId)
    getModalService()
  }, [])

  const validationSchema = yup.object().shape({
    name: yup.string().required("name is required"),
    email: yup.string().required("email is required"),
    phone: yup.number().required("mobile number is required"),
    service: yup.string().required("Enter Description"),
  });


  const initialValues = {
    name: "",
    email: "",
    phone: "",
    service: "",
  };

  async function onSubmit(values, onSubmitProps) {
    const payload = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      service: values.service,
    }

    axios({
      method: "post",
      url: '/api/client/postbestservice',
      headers: {
        "Content-Type": "application/json",
      },
      data: payload,
    })
      .then((res) => {
        if (res.data) {
          setmodalSuccess(true)
          toast.success("service added successfully", { theme: "colored", });
          onSubmitProps.resetForm();
          close();
        }
      })
      .catch((res) => {
        toast.error("something went wrong", { theme: "colored", });
      });

  }
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const getModalService = () => {
    axios.get('/api/client/getservice')
      .then((res) => {
        setServieData(res.data)
        const filterData = res.data.filter((i) => i.title === setId.title)
        formik.setFieldValue("service", filterData[0].title);

      })
      .catch((err) => {
        console.log("ServiceModelError", err)
      })
  }

  return (
    <>
      <Modal show={show} onHide={close} animation={false} size="xl">
        <Row className="mx-auto">

          <Col lg={6} md={12} className="p-0 d-none d-lg-block" >
            <div className="p-5 text-center" style={{ backgroundColor: "#F9F9F9", borderRadius: "30px 0px 0px 30px" }}>
              <div><Image src={paridhi} className="Home-paridhi" width={200} height={55} /></div>
              <div className="mt-5">
                <Image src={home} className="Home-paridhi" width={293} height={184} />
              </div>
              <div className="text-center">
                <p className="px-5 m-5">
                  Vivamus suscipit tortor eget felis porttitor volutpat.
                  Curabitur non nulla sit tempus convallis quis ac lectus.
                  Curabitur{" "}
                </p>
              </div>
            </div>
          </Col>

          <Col lg={6} md={12}>
            <Modal.Header closeButton />
            <Modal.Body>
              <form onSubmit={formik.handleSubmit}>
                <Row className="px-0 px-md-4 justify-content-center">
                  <Col md={12}>
                    <h4 className="px-4 mb-4 text-center">
                      Choose Our Best <br />Services
                    </h4>
                  </Col>
                  <Row className="mb-3">

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

                    <Form.Group as={Col} md="12" controlId="validationFormik02" className="mb-4">
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

                    <Form.Group as={Col} md="12" controlId="validationFormikUsername" className="mb-4">
                      <InputGroup>
                        <InputGroup.Text id="inputGroupPrepend">+91</InputGroup.Text>
                        <Form.Control placeholder="Enter your mobile number" type="text" aria-describedby="inputGroupPrepend" name="phone"
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

                    <Form.Group as={Col} md="12" controlId="validationFormikUsername" className="mb-4">
                      <InputGroup>
                        <Form.Select name="service"
                          {...formik.getFieldProps("service")}
                          onChange={(e) => {
                            formik.setFieldValue("service", e.target.value);
                          }}
                        >
                          {servieData.map((itme, _id) => {
                            return (
                              <option value={itme.title} key={_id}>{itme.title}</option>
                            )
                          })}
                        </Form.Select>
                      </InputGroup>
                    </Form.Group>
                  </Row>
                </Row>

                <div className="text-center">
                  <ButtonComponent type="submit" text="Submit" style="px-4 py-2" />
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
