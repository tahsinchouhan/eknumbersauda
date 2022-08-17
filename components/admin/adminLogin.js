import React, { useState } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import { useFormik } from "formik";
import axios from "axios"
import * as yup from "yup";
import { Row, Col, Modal, Form, InputGroup, Button } from "react-bootstrap";
import Image from "next/image";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../../public/images/logo.png"
import { FaReceipt } from "react-icons/fa";



function AdminLogin() {
  const router = useRouter();
  const validationSchema = yup.object().shape({
    email: yup.string().required("email is required"),
    password: yup.string().required("password is required"),
  });

  const initialValues = {
    email: "",
    password: "",

  };
  async function onSubmit(values, onSubmitProps) {
    const payload = {
      email: values.email,
      password: values.password,
    };
    axios.post('/api/actions/users/login', payload)
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem('login',JSON.stringify(res.data.token))
        toast.success("login successfully",{ theme: "colored",});
        router.push("/pageadmin/dashboard");
          onSubmitProps.resetForm();
        }
      }).catch((err) => {
        toast.error("something went wrong",{ theme: "colored",});
      })

  }
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  
  return (
    <>
    <div className="" style={{background:"aliceblue",height:"100vh"}}>
      <div className="container">
      <div className="text-center" style={{ paddingTop: "100px" }}>
            <Image src={Logo} alt="logo"   width={209} height={60} />
          </div>
        <div className="login_main col-md-6 offset-md-3 mt-5" >
          <div className="card md-px-4" style={{ marginTop: "5vh" }}>
            <h4 className="card-header">Login</h4>
            <div className="card-body ">
              <form onSubmit={formik.handleSubmit}>
                <Row className="px-0 px-sm-3 px-xl-5 justify-content-center">
                  <Form.Group as={Col} md="12" className="mb-4 pt-4" controlId="validationFormik01">
                    <Form.Control placeholder="Enter your email"
                      type="email"
                      name="email"
                      {...formik.getFieldProps("email")}
                      onChange={(e) => {
                        formik.setFieldValue("email", e.target.value);
                      }} />
                    {formik.touched.email &&
                      <small className='text-danger'>
                        {formik.errors.email}
                      </small>
                    }
                  </Form.Group>

                  <Form.Group as={Col} md="12" className="mb-4" controlId="validationFormik01">
                    <Form.Control placeholder="Enter your password"
                      type="password"
                      name="password"
                      {...formik.getFieldProps("password")}
                      onChange={(e) => {
                        formik.setFieldValue("password", e.target.value);
                      }} />
                    {formik.touched.password &&
                      <small className='text-danger'>
                        {formik.errors.password}
                      </small>
                    }
                  </Form.Group>
                  <Col md={12}>
                    <div className="text-center pt-4">
                      <Button type="submit" className="btn btn-submit">
                        <span className="Complete-login">Submit</span>
                      </Button>
                    </div>
                  </Col>
                </Row>
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
      <ToastContainer />
    </>
  );
}
export default AdminLogin;




