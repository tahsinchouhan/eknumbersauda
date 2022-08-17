import React, { useState } from "react";
import { Container, Row, Col, FormCheck } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import Image from "next/image";
import { Stepper, Step } from "react-form-stepper";
import FormCheckBox from "./formCheckbox";

function AdminForm() {
  const [goSteps, setGoSteps] = useState(0);

  const validationSchema = Yup.object({
    email: Yup.string().required("This field is required"),
    password: Yup.string().required("This field is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };
  const onSubmit = () => {
    console.log("AdminForm");
  };
  return (
    <div>
      <Stepper activeStep={goSteps}>
        <Step onClick={() => setGoSteps(0)} label="LOGIN" />
        <Step onClick={() => setGoSteps(1)} label="DELIVERY" />
        <Step onClick={() => setGoSteps(2)} label="ORDER SUMMERY" />
      </Stepper>

      <Container>
        <div>
          <div className="row">
            <div className="col-lg-12">
              <h1 className="register-header m-5 text-center">Form</h1>
            </div>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form>
                  <Row className="mb-5">
                    {goSteps === 0 && (
                    <div>
                      <div className="admin_form">
                        <Col sm={12} lg={6}>
                          <div className="form-div pt-1">
                            <div className="row">
                              <div className="col-md-12">
                                <div className="card bg-light">
                                  <div className="card-body form-card">
                                    <div className="card-heading">
                                      <h4 className=" mb-2">All Properties</h4>
                                    </div>
                                    <div className="form-group user-field">
                                      <label htmlFor="name">Image</label>
                                      {/* <Image
                                        src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                                        width="100%"
                                        height="100px"
                                        layout="fill"
                                      /> */}
                                    </div>
                                    <div className="form-group user-field">
                                      <label htmlFor="name">Title</label>
                                      <Field
                                        className="form-control px-2"
                                        type="text"
                                        name="title"
                                        placeholder="Enter title"
                                        autoComplete="off"
                                      />
                                    </div>
                                    <div className="form-group user-field">
                                      <label htmlFor="number" className="mt-3">
                                        Address
                                      </label>
                                      <Field
                                        className="form-control px-2"
                                        type="text"
                                        name="address"
                                        placeholder="Enter  Address"
                                      />
                                    </div>
                                    <div className="form-group user-field">
                                      <label
                                        htmlFor="password"
                                        className="mt-3"
                                      >
                                        Date
                                      </label>
                                      <Field
                                        className="form-control px-2"
                                        type="date"
                                        name="date"
                                        placeholder="Enter Date"
                                      />
                                    </div>
                                    <div className="form-group user-field mb-2">
                                      <label
                                        htmlFor="confirm password"
                                        className="mt-3"
                                      >
                                        Price
                                      </label>
                                      <Field
                                        className="form-control px-2"
                                        type="text"
                                        name="price"
                                        placeholder="Enter Price"
                                      />
                                    </div>
                                    {/* building status */}
                                      {/* <div className="row ps-3">
                                        <div className="col col-sm-6 col-md-6 px-0">
                                          <div className="form-check">
                                            <input
                                              className="form-check-input"
                                              type="checkbox"
                                              name="underconstruction"
                                              value="compeleted"
                                              id="flexRadioDefault1"
                                            />
                                            <label className="form-check-label">
                                              Under Construction
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col col-sm-6 col-md-6 px-0">
                                          <div className="form-check">
                                            <input
                                              className="form-check-input"
                                              type="checkbox"
                                              name="underconstruction"
                                              value="uncompeleted"
                                              id="flexRadioDefault2"
                                              // checked
                                            />
                                            <label className="form-check-label">
                                              Possession by Jun, 2026
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="form-group user-field mb-2">
                                        <label
                                          htmlFor="confirm password"
                                          className="mt-3"
                                        >
                                          2,3 BHK
                                        </label>
                                        <Field
                                          className="form-control px-2"
                                          type="text"
                                          name="bhk"
                                          placeholder="Enter 2,3 BHK"
                                        />
                                      </div>
                                      <FormCheckBox />
                                      <div className="form-group user-field mb-2">
                                        <label
                                          htmlFor="confirm password"
                                          className=""
                                        >
                                        Status
                                        </label>
                                        <Field
                                          className="form-control px-2"
                                          type="text"
                                          name="status"
                                          placeholder="Under Construction"
                                        />
                                      </div>
                                      <div className="form-group user-field mb-2">
                                        <label
                                          htmlFor="confirm password"
                                          className=""
                                        >
                                        Lauch Date
                                        </label>
                                        <Field
                                          className="form-control px-2"
                                          type="date"
                                          name="date"
                                          placeholder="Lauch Date"
                                        />
                                      </div>
                                      <div className="form-group user-field mb-2">
                                        <label
                                          htmlFor="confirm password"
                                          className=""
                                        >
                                        Project Type
                                        </label>
                                        <Field
                                          className="form-control px-2"
                                          type="text"
                                          name="flat"
                                          placeholder="Project Type/flat"
                                        />
                                      </div>
                                      <div className="form-group user-field mb-2">
                                        <label
                                          htmlFor="confirm password"
                                          className=""
                                        >
                                        Full Address
                                        </label>
                                        <Field
                                          className="form-control px-2"
                                          type="text"
                                          name="address"
                                          placeholder="Full Address"
                                        />
                                      </div>
                                      <div className="form-group user-field mb-2">
                                        <label
                                          htmlFor="confirm password"
                                          className=""
                                        >
                                      Pin Code
                                        </label>
                                        <Field
                                          className="form-control px-2"
                                          type="text"
                                          name="pincode"
                                          placeholder="  Pin Code"
                                        />
                                      </div> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </div>
                      <div  className="text-center">
                        <button className="btn" onClick={() => setGoSteps(1)}>
                          Next
                        </button>
                        </div>
                    </div>
                  )}
                    {goSteps === 1 && ( 
                    <div>
                       <h1>hello mam</h1>
                      <button onClick={() => setGoSteps(2)}>Next</button>
                    </div>
                     )}
                    <div>
                    {goSteps === 2 && ( 
                      <div>
                        <h1>hello monika</h1>
                        <button onClick={() => setGoSteps(3)}>Next</button>
                      </div>
                      )}
                      <button onClick={() => setGoSteps(3)}>Submit</button>
                    </div>
                  </Row>

                  <div className=" register-btn text-center mt-3 mb-5">
                    <button type="submit" className="btn btn-submit text-white">
                      <div>
                        <button onClick={() => setGoSteps(3)}>Submit</button>
                      </div>
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </Container>
    </div>
  );
}

export default AdminForm;

{
  /* <Col sm={12} lg={6}>
  <div className="form-div pt-4 pt-lg-0">
    <div className="row">
      <div className="col-md-12">
        <div className="card bg-light">
          <div className="card-body">
            <div className="card-heading">
              <h4 className=" mb-2">Basic Information</h4>
            </div>
            <div className="form-group user-field">
              <label htmlFor="email">Email Address</label>
              <Field
                className="form-control px-2"
                type="text"
                name="email"
                placeholder="Enter Email Address"
                autoComplete="off"
              />
            </div>
            <div className="form-group user-field">
              <label htmlFor="dob" className="mt-3">
                DOB
              </label>
              <Field
                className="form-control px-2"
                type="date"
                id="dob"
                name="dob"
                autoComplete="off"
                placeholder="Enter password"
              />
            </div>
            <div className="form-group user-field">
              <label htmlFor=" gender" className="mt-3">
                Gender
              </label>

              <div className="row">
                <div className="col col-sm-4 col-md-4 px-0">
                  <div className="form-check">
                    <input
                      className="gender-field"
                      type="radio"
                      name="gender"
                      value="male"
                    />
                    <label className="gender-span mx-1">Male</label>
                  </div>
                </div>
                <div className="col col-sm-4 col-md-4 px-0">
                  <div className="form-check">
                    <input
                      className="gender-field"
                      type="radio"
                      name="gender"
                      value="female"
                    />
                    <label className="gender-span mx-1">Female</label>
                  </div>
                </div>
                <div className="col col-sm-4 col-md-4 px-0">
                  <div className="form-check">
                    <input
                      className="gender-field"
                      type="radio"
                      name="gender"
                      value="other"
                      // checked={"Other"}
                    />
                    <label className="gender-span mx-1">Other</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</Col>; */
}
