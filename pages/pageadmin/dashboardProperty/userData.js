import React, { useState } from 'react'
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";
import AdminDashboard from '../../../components/admin/adminDashboard';
import ButtonComponent from '../../../components/button/buttonComponent';
import { useFormik } from "formik";
import * as yup from "yup";

function UserData() {

  const validationSchema = yup.object().shape({
    name: yup.string().required(
      "name is required"
    ),
    email: yup.string().required("email is required"),
    password: yup.string().required("password is required"),


  });


  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const onSubmit = (values) => {
    console.log('userData', values)
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  return (
    <>
      <div className='d-flex'>
        <AdminDashboard />
        <Card className='mx-4 mb-4 w-100'>
          <div className=' col-md-6 mt-5'>

            <div>
              <h4 className="header mx-4 px-3 pt-3">User </h4>
            </div>
            <form onSubmit={formik.handleSubmit} className="mt-1">
              <Row className='mx-4'>

                <Col lg={12} md={12}>
                  <Form.Group
                    as={Col}
                    md="12"
                    className="mb-4"
                    controlId="validationFormik01"
                  >
                    <Form.Control
                    className='p-3'
                      placeholder=" Enter your name "
                      type="text"
                      name="name"
                      {...formik.getFieldProps("name")}
                      onChange={(e) => {
                        formik.setFieldValue("name", e.target.value);
                      }}
                    />
                    {formik.touched.title &&
                      <small className='text-danger'>
                        {formik.errors.name}
                      </small>
                    }
                  </Form.Group>
                </Col>

                <Col lg={12} md={12}>
                  <Form.Group
                    as={Col}
                    md="12"
                    className="mb-4"
                    controlId="validationFormik01"
                  >
                    <Form.Control
                     className='p-3'
                      placeholder="Enter your email "
                      type="email"
                      name="email"
                      {...formik.getFieldProps("email")}
                      onChange={(e) => {
                        formik.setFieldValue("email", e.target.value);
                      }}
                    />
                    {formik.touched.title &&
                      <small className='text-danger'>
                        {formik.errors.email}
                      </small>
                    }
                  </Form.Group>
                </Col>
                <Col lg={12} md={12}>
                  <Form.Group
                    as={Col}
                    md="12"
                    className="mb-4"
                    controlId="validationFormik01"
                  >
                    <Form.Control
                     className='p-3'
                      placeholder="Enter your password"
                      type="password"
                      name="password"
                      {...formik.getFieldProps("password")}
                      onChange={(e) => {
                        formik.setFieldValue("password", e.target.value);
                      }}
                    />
                    {formik.touched.title &&
                      <small className='text-danger'>
                        {formik.errors.password}
                      </small>
                    }
                  </Form.Group>
                </Col>
                <Col lg={12} md={12}>
                  <div className=''>
                    <ButtonComponent type="submit" className="btn btn_contact" text="Submit" style=" my-3 px-5 py-3" />
                  </div>
                </Col>
              </Row>
            </form>

          </div>
        </Card>

      </div>
    </>
  )
}

export default UserData