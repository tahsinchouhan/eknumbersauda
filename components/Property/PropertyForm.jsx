import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import Select from "react-select";
import { toast } from "react-toastify";
import * as yup from "yup";
import SidebarData from "../admin/adminContents/sidebarData";
import ButtonComponent from "../button/buttonComponent";
import ImageUploadMultiple from "../commonComponent/ImageUploadMultiple";

const options = [
  { value: "Gym", label: "Gym" },
  { value: "Power Backup", label: "Power Backup" },
  { value: "Lift(s)", label: "Lift(s)" },
  { value: "Jogging Track", label: "Jogging Track" },
  { value: "Security", label: "Security" },
  { value: "Car Parking", label: "Car Parking" },
  { value: "Garden", label: "Garden" },
  { value: "Water Supply", label: "Water Supply" },
  { value: "Swimming Pool", label: "Swimming Pool" },
  { value: "Maintenace", label: "Maintenace" },
  { value: "Wi-fi", label: "Wi-fi" },
  { value: "Fire safty", label: "Fire safty" },
  { value: "2 Bed", label: "2 Bed " },
  { value: "3 Bed", label: "3 Bed " },
  { value: "4 Bed", label: "4 Bed " },
  { value: "2 Bath", label: "2 Bath " },
];

function PropertyForm({ viewMode = false }) {
  const router = useRouter();
  const id = router.query.propertyTableId;

  const [change, setChange] = useState(false);
  const [btnShow, setBtnShow] = useState(false);
  const [propertyFlat, setPropertyFlat] = useState({ value: "", label: "" });
  const [amenitiesItem, setAmenitiesItem] = useState({
    value: "",
    label: "",
    icon: "",
  });

  const [mapUrl, setmapUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [amenitiesDefault, setAmenitiesDefault] = useState([]);
  const [imgs, setImgs] = useState([]);
  const [imgsError, setImgsError] = useState("");

  // const phoneRegExp = /^[6-9][0-9]{9}$/;

  const validationSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    propertyname: yup.string().required("Atlease one is required"),

    realprice: yup.number().when("propertyname", {
      is: (propertyname) => propertyname === "property",
      then: yup.number().required("Real Price is required"),
    }),
    offerprice: yup.number().when("propertyname", {
      is: (propertyname) => propertyname === "property",
      then: yup.number().required("Offer Price is required"),
    }),

    sqft: yup.number().when("propertyname", {
      is: (propertyname) => propertyname === "property",
      then: yup.number().required("Sqft  is required"),
    }),
    // ratepersqft: yup.number().when("propertyname", {
    //   is: (propertyname) => propertyname === "property",
    //   then: yup.number().required('Rate per sqft is required')
    // }),

    minprice: yup.number().when("propertyname", {
      is: (propertyname) => propertyname === "project",
      then: yup.number().required("Minimum price Price is required"),
    }),
    maxprice: yup.number().when("propertyname", {
      is: (propertyname) => propertyname === "project",
      then: yup.number().required("Maximum price Price is required"),
    }),

    address: yup.string().required("Address is required"),
    description: yup.string().required("Description is required"),
    location: yup.string().required("Location is required"),
    type: yup.string().required("Type is required"),
    images: yup.array().required("Image is required"),
    amenities: yup.array().required("Amenities is required"),
    // amenities: yup.array().required('Atleast One Amenities is required'),
    property: yup.string().required("Property Type is required"),

    whychoose1: yup.string().required("This is required"),
    whychoose2: yup.string().required("This is required"),
    whychoose3: yup.string().required("This is required"),
    whychoose4: yup.string().required("This is required"),
    whychoose5: yup.string().required("This is required"),

    // ownerdetails: yup.object().required('ownerdetails is required'),

    ownername: yup.string().required("Owner Name is required"),
    owneraddress: yup.string().required("Owner Address is required"),
    ownerphone: yup.string().required("Owner Phone is required"),
    rera: yup.string().required("RERA is required"),
    iframe: yup.string().required("Map Area is required"),
  });

  const initialValues = {
    images: [],

    title: "",

    realprice: "",
    offerprice: "",
    sqft: "",
    ratepersqft: "",
    minprice: "",
    maxprice: "",

    address: "",
    description: "",
    location: "",
    propertyname: "",
    type: "",

    amenities: [],
    property: "",

    whychoose1: "",
    whychoose2: "",
    whychoose3: "",
    whychoose4: "",
    whychoose5: "",

    ownername: "",
    owneraddress: "",
    ownerphone: "",
    rera: "",
    iframe: "",
  };

  useEffect(() => {
    const login = JSON.parse(localStorage.getItem("login"));
    if (!login) {
      router.push("/pageadmin");
    }
  }, []);

  useEffect(() => {
    getProperyOption();
    getAmenitiesOption();
  }, []);

  useEffect(() => {
    if (id) {
      setBtnShow(!viewMode);
    }
  }, [id]);

  const getAmenitiesOption = () => {
    axios
      .get(`/api/actions/amenities`)
      .then((res) => {
        const data = res.data.map((item) => {
          return {
            label: item.type,
            value: { value: item.type, icon: item.icon },
            // icon: item.icon,
          };
        });
        setAmenitiesItem(data);
      })
      .catch((res) => {
        return res || [];
      });
  };
  const getProperyOption = () => {
    axios
      .get(`/api/actions/propertytype`)
      .then((res) => {
        const aa = res.data.map((item) => {
          return {
            label: item.type,
            value: item.type,
          };
        });
        setPropertyFlat(aa);
      })
      .catch((res) => {
        return res || [];
      });
  };

  const onChange = (options) => {
    formik.setFieldValue(
      "amenities",
      "isMulti" ? options.map((item) => item?.value) : options.value
    );
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`/api/actions/uploadproperty/${id}`)
        .then((res) => {
          formik.setFieldValue("title", res.data.title);
          formik.setFieldValue("realprice", res.data.realprice || 0);
          formik.setFieldValue("offerprice", res.data.offerprice || 0);
          formik.setFieldValue("minprice", res.data.minprice || 0);
          formik.setFieldValue("maxprice", res.data.maxprice || 0);
          formik.setFieldValue("address", res.data.address);
          formik.setFieldValue("sqft", res.data.sqft || 0);
          formik.setFieldValue("ratepersqft", res.data.ratepersqft || 0);
          formik.setFieldValue("description", res.data.description);
          formik.setFieldValue("location", res.data.location);
          formik.setFieldValue("propertyname", res.data.propertyname);
          formik.setFieldValue("property", res.data.property);
          formik.setFieldValue("type", res.data.type);
          formik.setFieldValue("amenities", res.data.amenities);
          formik.setFieldValue("iframe", res.data.iframe);
          formik.setFieldValue(
            "images",
            res.data.images.map((img) => ({ ...img, src: img }))
          );
          formik.setFieldValue("ownername", res.data.ownername);
          formik.setFieldValue("owneraddress", res.data.owneraddress);
          formik.setFieldValue("ownerphone", res.data.ownerphone);
          formik.setFieldValue("whychoose1", res.data.whychoose1);
          formik.setFieldValue("whychoose2", res.data.whychoose2);
          formik.setFieldValue("whychoose3", res.data.whychoose3);
          formik.setFieldValue("whychoose4", res.data.whychoose4);
          formik.setFieldValue("whychoose5", res.data.whychoose5);
          formik.setFieldValue("rera", res.data.rera);

          setImgs(res.data.images.map((img) => ({ ...img, src: img })));
          setmapUrl(res.data.iframe);
          let amenities =
            res.data.amenities?.length > 0
              ? res.data.amenities?.map((i) => ({ value: i, label: i.value }))
              : [];
          setAmenitiesDefault(amenities);
          setLoading(false);
        })
        .catch((err) => {
          console.log("PropertyForm", err);
        });
    }
  }, [id]);

  const onSubmit = async (values) => {
    try {
      setLoading(true);

      const FORMDATA = new FormData();
      const img = [];
      if (imgs.length < 0) {
        return setImgsError("Atleast one image required");
      }
      for (var i = 0; i < imgs.length; i++) {
        let f = imgs[i];
        const file = f.file;
        if (file) {
          FORMDATA.append("file", file);
          FORMDATA.append("upload_preset", "giyajjxo");

          const res = await axios.post(
            "https://api.cloudinary.com/v1_1/dkpf6ld5a/image/upload",
            FORMDATA
          );
          img.push(res.data.secure_url);
        } else {
          img.push(imgs[i].src);
        }
      }

      const payload = {
        title: values.title,
        realprice: values.realprice,
        offerprice: values.offerprice,
        sqft: values.sqft,
        ratepersqft: values.ratepersqft,
        minprice: values.minprice,
        maxprice: values.maxprice,
        address: values.address,
        description: values.description,
        location: values.location,
        type: values.type,
        amenities: values.amenities,
        property: values.property,
        propertyname: values.propertyname,
        images: img,
        ownername: values.ownername,
        owneraddress: values.owneraddress,
        ownerphone: values.ownerphone,
        whychoose1: values.whychoose1,
        whychoose2: values.whychoose2,
        whychoose3: values.whychoose3,
        whychoose4: values.whychoose4,
        whychoose5: values.whychoose5,
        rera: values.rera,
        iframe: values.iframe,
      };

      if (btnShow) {
        id = axios
          .put(`/api/actions/uploadproperty/${id}`, payload)
          .then((res) => {
            if (res) {
              setChange(!change);
              toast.success("property updated successfully", {
                theme: "colored",
              });
              setLoading(false);
              router.push("../propertyData");
            }
          })
          .catch((res) => {
            toast.error("something went wrong", { theme: "colored" });
            setLoading(false);
            return res || [];
          });
      } else {
        axios
          .post(`/api/actions/uploadproperty`, payload)
          .then((res) => {
            if (res.data) {
              setChange(!change);
              setLoading(false);
              toast.success("property added successfully", {
                theme: "colored",
              });
              router.push("./propertyData");
            }
          })
          .catch((err) => {
            toast.error("something went wrong", { theme: "colored" });
            setLoading(false);
          });
      }
      resetForm(initialValues);
    } catch (error) {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const cancelProperty = () => {
    router.back();
  };

  // const toasterHanle = () => {
  //   return <ToastContainer />
  // }
  if (loading) return <div className="text-center mt-5">loading....</div>;

  return (
    <>
      <div>
        <div className="p-4" style={{ backgroundColor: "#0098DA" }}>
          <h5
            className="text-white m-0 fw-bold andmin-paridhi-text"
            style={{ letterSpacing: "3px" }}
          >
            Ek Number Sauda
          </h5>
        </div>
        <div className="d-flex">
          <div lg={2} md={12} className="px-0">
            <SidebarData />
          </div>
          <div lg={10} md={10} className="px-4 py-2 w-100 mt-5">
            <form onSubmit={formik.handleSubmit} className="mt-1">
              <Card className="mx-auto w-100">
                <div className="row">
                  <div className="col-md-6 mt-5">
                    <div className="mx-4 mb-4">
                      <div>
                        <h4 className="header mx-4 px-3 pt-2 mb-3">
                          Properties
                        </h4>
                      </div>

                      <Row className="mx-4">
                        <Col lg={12} md={12}>
                          <Form.Group
                            as={Col}
                            md="12"
                            className="mb-4"
                            controlId="validationFormik01"
                          >
                            <ImageUploadMultiple
                              isCarousel
                              className="p-3"
                              placeholder=" image"
                              type="file"
                              name="image"
                              accept="image/*"
                              multiple
                              images={imgs}
                              setImages={(images) => {
                                setImgsError("");
                                setImgs(images);
                              }}
                              disabled={viewMode}
                            />
                            {imgsError && (
                              <small className="text-danger">{imgsError}</small>
                            )}
                          </Form.Group>
                        </Col>
                        <Col lg={12} md={12}>
                          <div className="d-flex">
                            <label className="d-flex m-3">
                              <input
                                type="radio"
                                name="propertyname"
                                value="project"
                                disabled={viewMode}
                                checked={
                                  formik.values.propertyname === "project"
                                }
                                onChange={() =>
                                  formik.setFieldValue(
                                    "propertyname",
                                    "project"
                                  )
                                }
                              />
                              <div className="m-2">Our-Project</div>
                            </label>
                            <label className="d-flex m-3">
                              <input
                                type="radio"
                                name="propertyname"
                                value="property"
                                disabled={viewMode}
                                checked={
                                  formik.values.propertyname === "property"
                                }
                                onChange={() =>
                                  formik.setFieldValue(
                                    "propertyname",
                                    "property"
                                  )
                                }
                              />
                              <div className="m-2">Other-Property</div>
                            </label>
                          </div>
                          {formik.touched.propertyname &&
                            formik.errors.propertyname && (
                              <small className="text-danger mx-3">
                                {formik.errors.propertyname}
                              </small>
                            )}
                        </Col>
                        <Col lg={12} md={12}>
                          <div>
                            <label className="d-flex m-3 mb-1">
                              <input
                                type="checkbox"
                                name="featuredname"
                                value="Featured"
                                disabled={viewMode}
                                checked={
                                  formik.values.featuredname === "Featured"
                                }
                                onChange={() =>
                                  formik.setFieldValue(
                                    "featuredname",
                                    "Featured"
                                  )
                                }
                              />
                              <div className="m-2">Featured</div>
                            </label>
                            {formik.touched.featuredname &&
                              formik.errors.featuredname && (
                                <small className="text-danger mx-3">
                                  {formik.errors.featuredname}
                                </small>
                              )}
                          </div>
                        </Col>
                        <Col lg={12} md={12} className="mb-4">
                          <div className="d-flex">
                            <label className="d-flex m-3">
                              <input
                                type="radio"
                                name="type"
                                value="Rent"
                                disabled={viewMode}
                                checked={formik.values.type === "Rent"}
                                onChange={() =>
                                  formik.setFieldValue("type", "Rent")
                                }
                              />
                              <div className="m-2">Rent</div>
                            </label>
                            <label className="d-flex m-3">
                              <input
                                type="radio"
                                name="type"
                                value="Sell"
                                disabled={viewMode}
                                checked={formik.values.type === "Sell"}
                                onChange={() =>
                                  formik.setFieldValue("type", "Sell")
                                }
                              />
                              <div className="p-2">Sell</div>
                            </label>
                          </div>
                          {formik.touched.type && formik.errors.type && (
                            <small className="text-danger mx-3">
                              {formik.errors.type}
                            </small>
                          )}
                        </Col>
                        <Col lg={12} md={12}>
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationFormik02"
                            className="mb-4 mt-3"
                          >
                            <Form.Control
                              className="p-3"
                              placeholder="Enter your title"
                              type="title"
                              name="title"
                              disabled={viewMode}
                              {...formik.getFieldProps("title")}
                              onChange={(e) => {
                                formik.setFieldValue("title", e.target.value);
                              }}
                            />
                            {formik.touched.title && formik.errors.title && (
                              <div className="text-danger">
                                {formik.errors.title}
                              </div>
                            )}
                          </Form.Group>
                        </Col>

                        {formik.values.propertyname === "project" && (
                          <>
                            <Col lg={12} md={12}>
                              <Form.Group
                                as={Col}
                                md="12"
                                className="mb-4"
                                controlId="validationFormik01"
                              >
                                <Form.Control
                                  className="p-3"
                                  placeholder="Minimum price"
                                  disabled={viewMode}
                                  type="number"
                                  name="minprice"
                                  {...formik.getFieldProps("minprice")}
                                  onChange={(e) => {
                                    formik.setFieldValue(
                                      "minprice",
                                      e.target.value
                                    );
                                  }}
                                />
                                {formik.touched.minprice &&
                                  formik.errors.minprice && (
                                    <small className="text-danger">
                                      {formik.errors.minprice}
                                    </small>
                                  )}
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
                                  className="p-3"
                                  placeholder="Maximum price"
                                  disabled={viewMode}
                                  type="number"
                                  name="maxprice"
                                  {...formik.getFieldProps("maxprice")}
                                  onChange={(e) => {
                                    formik.setFieldValue(
                                      "maxprice",
                                      e.target.value
                                    );
                                  }}
                                />
                                {formik.touched.maxprice &&
                                  formik.errors.maxprice && (
                                    <small className="text-danger">
                                      {formik.errors.maxprice}
                                    </small>
                                  )}
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
                                  className="p-3"
                                  placeholder="Rate per Sq Ft"
                                  disabled={viewMode}
                                  type="number"
                                  name="ratepersqft"
                                  {...formik.getFieldProps("ratepersqft")}
                                  onChange={(e) => {
                                    formik.setFieldValue(
                                      "ratepersqft",
                                      e.target.value
                                    );
                                  }}
                                />
                                {formik.touched.ratepersqft &&
                                  formik.errors.ratepersqft && (
                                    <small className="text-danger">
                                      {formik.errors.ratepersqft}
                                    </small>
                                  )}
                              </Form.Group>
                            </Col>
                          </>
                        )}
                        {formik.values.propertyname === "property" && (
                          <>
                            <Col lg={12} md={12}>
                              <Form.Group
                                as={Col}
                                md="12"
                                className="mb-4"
                                controlId="validationFormik01"
                              >
                                <Form.Control
                                  className="p-3"
                                  placeholder="Real price"
                                  disabled={viewMode}
                                  type="number"
                                  name="realprice"
                                  {...formik.getFieldProps("realprice")}
                                  onChange={(e) => {
                                    formik.setFieldValue(
                                      "realprice",
                                      e.target.value
                                    );
                                  }}
                                />
                                {formik.touched.realprice &&
                                  formik.errors.realprice && (
                                    <small className="text-danger">
                                      {formik.errors.realprice}
                                    </small>
                                  )}
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
                                  className="p-3"
                                  placeholder="Offer Price"
                                  disabled={viewMode}
                                  type="number"
                                  name="offerprice"
                                  {...formik.getFieldProps("offerprice")}
                                  onChange={(e) => {
                                    formik.setFieldValue(
                                      "offerprice",
                                      e.target.value
                                    );
                                  }}
                                />
                                {formik.touched.offerprice &&
                                  formik.errors.offerprice && (
                                    <small className="text-danger">
                                      {formik.errors.offerprice}
                                    </small>
                                  )}
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
                                  className="p-3"
                                  placeholder="Sq Ft"
                                  disabled={viewMode}
                                  type="number"
                                  name="sqft"
                                  {...formik.getFieldProps("sqft")}
                                  onChange={(e) => {
                                    formik.setFieldValue(
                                      "sqft",
                                      e.target.value
                                    );
                                  }}
                                />
                                {formik.touched.sqft && formik.errors.sqft && (
                                  <small className="text-danger">
                                    {formik.errors.sqft}
                                  </small>
                                )}
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
                                  className="p-3"
                                  placeholder="Rate per Sq Ft"
                                  disabled={viewMode}
                                  type="number"
                                  name="ratepersqft"
                                  {...formik.getFieldProps("ratepersqft")}
                                  onChange={(e) => {
                                    formik.setFieldValue(
                                      "ratepersqft",
                                      e.target.value
                                    );
                                  }}
                                />
                                {formik.touched.ratepersqft &&
                                  formik.errors.ratepersqft && (
                                    <small className="text-danger">
                                      {formik.errors.ratepersqft}
                                    </small>
                                  )}
                              </Form.Group>
                            </Col>
                          </>
                        )}

                        {/* <Col lg={12} md={12}>
                          <Form.Group
                            as={Col}
                            md="12"
                            className="mb-4"
                            controlId="validationFormik01"
                          >
                            <Form.Control
                              className="p-3"
                              placeholder="Real price"
                              disabled={viewMode}
                              type="number"
                              name="realprice"
                              {...formik.getFieldProps("realprice")}
                              onChange={(e) => {
                                formik.setFieldValue(
                                  "realprice",
                                  e.target.value
                                );
                              }}
                            />
                            {formik.touched.realprice && formik.errors.realprice && (
                              <small className="text-danger">
                                {formik.errors.realprice}
                              </small>
                            )}
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
                              className="p-3"
                              placeholder="Offer Price"
                              disabled={viewMode}
                              type="number"
                              name="offerprice"
                              {...formik.getFieldProps("offerprice")}
                              onChange={(e) => {
                                formik.setFieldValue(
                                  "offerprice",
                                  e.target.value
                                );
                              }}
                            />
                            {formik.touched.offerprice && formik.errors.offerprice && (
                              <small className="text-danger">
                                {formik.errors.offerprice}
                              </small>
                            )}
                          </Form.Group>
                        </Col> */}
                        <Col lg={12} md={12}>
                          <Form.Group
                            as={Col}
                            md="12"
                            className="mb-4"
                            controlId="validationFormik01"
                          >
                            <Form.Control
                              className="p-3"
                              placeholder="Address"
                              disabled={viewMode}
                              type="text"
                              name="address"
                              {...formik.getFieldProps("address")}
                              onChange={(e) => {
                                formik.setFieldValue("address", e.target.value);
                              }}
                            />
                            {formik.touched.address &&
                              formik.errors.address && (
                                <small className="text-danger">
                                  {formik.errors.address}
                                </small>
                              )}
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
                              // as="textarea"
                              // rows={4}
                              className="p-3"
                              placeholder=" Description"
                              disabled={viewMode}
                              type="textarea"
                              name="description"
                              {...formik.getFieldProps("description")}
                              onChange={(e) => {
                                formik.setFieldValue(
                                  "description",
                                  e.target.value
                                );
                              }}
                            />
                            {formik.touched.description &&
                              formik.errors.description && (
                                <small className="text-danger">
                                  {formik.errors.description}
                                </small>
                              )}
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
                              className="p-3"
                              placeholder="Location "
                              disabled={viewMode}
                              type="text"
                              name="location"
                              {...formik.getFieldProps("location")}
                              onChange={(e) => {
                                formik.setFieldValue(
                                  "location",
                                  e.target.value
                                );
                              }}
                            />
                            {formik.touched.location &&
                              formik.errors.location && (
                                <small className="text-danger">
                                  {formik.errors.location}
                                </small>
                              )}
                          </Form.Group>
                        </Col>

                        {/* <Col lg={12} md={12}>
                          <div className="d-flex">
                            <label className="d-flex m-3">
                              <input
                                type="radio"
                                name="propertyname"
                                value="project"
                                disabled={viewMode}
                                checked={
                                  formik.values.propertyname === "project"
                                }
                                onChange={() =>
                                  formik.setFieldValue(
                                    "propertyname",
                                    "project"
                                  )
                                }
                              />
                              <div className="m-2">Our-Project</div>
                            </label>
                            <label className="d-flex m-3">
                              <input
                                type="radio"
                                name="propertyname"
                                value="property"
                                disabled={viewMode}
                                checked={
                                  formik.values.propertyname ===
                                  "property"
                                }
                                onChange={() =>
                                  formik.setFieldValue(
                                    "propertyname",
                                    "property"
                                  )
                                }
                              />
                              <div className="m-2">Property</div>
                            </label>
                          </div>
                          {formik.touched.propertyname && formik.errors.propertyname && (
                            <small className="text-danger mx-3">
                              {formik.errors.propertyname}
                            </small>
                          )}
                        </Col>
                        <Col lg={12} md={12}>
                          <div>
                            <label className="d-flex m-3 mb-1">
                              <input
                                type="checkbox"
                                name="featuredname"
                                value="Featured"
                                disabled={viewMode}
                                checked={
                                  formik.values.featuredname ===
                                  "Featured"
                                }
                                onChange={() =>
                                  formik.setFieldValue(
                                    "featuredname",
                                    "Featured"
                                  )
                                }
                              />
                              <div className="m-2">Featured</div>
                            </label>
                            {formik.touched.featuredname && formik.errors.featuredname && (
                              <small className="text-danger mx-3">
                                {formik.errors.featuredname}
                              </small>
                            )}
                          </div>
                        </Col> */}

                        <Col lg={12} md={12} className="mb-4">
                          <Form.Group>
                            <label className="mb-3">
                              <h6>Amenities</h6>
                            </label>
                            <Select
                              isMulti={true}
                              name="amenities"
                              options={amenitiesItem}
                              className="basic-multi-select"
                              classNamePrefix="Select"
                              disabled={viewMode}
                              onChange={onChange}
                              defaultValue={amenitiesDefault}
                              isOptionDisabled={(v) => viewMode}
                              isClearable={options.map((v) => viewMode)}
                            />
                            {formik.touched.amenities &&
                              formik.errors.amenities && (
                                <small className="text-danger">
                                  {formik.errors.amenities}
                                </small>
                              )}
                          </Form.Group>
                        </Col>
                        <Col lg={12} md={12} className="mb-4">
                          <Form.Group>
                            <label className="mb-3">
                              <h6>Property Type</h6>
                            </label>
                            <Form.Select
                              className="p-2"
                              name="property"
                              disabled={viewMode}
                              // classNamePrefix="Select"
                              // defaultValue={propertyFlat}
                              {...formik.getFieldProps("property")}
                              onChange={(e) => {
                                formik.setFieldValue(
                                  "property",
                                  e.target.value
                                );
                              }}
                            >
                              {propertyFlat.length > 0
                                ? propertyFlat.map((item, _id) => {
                                    return (
                                      <option value={item.label} key={_id}>
                                        {item.label}
                                      </option>
                                    );
                                  })
                                : null}
                            </Form.Select>
                          </Form.Group>
                          {formik.touched.property &&
                            formik.errors.property && (
                              <small className="text-danger">
                                {formik.errors.property}
                              </small>
                            )}
                        </Col>

                        <Col lg={12} md={12}>
                          <label className="mb-3">
                            <h6>Why Choose This Property?</h6>
                          </label>
                          <Form.Group
                            as={Col}
                            md="12"
                            className="mb-4"
                            controlId="validationFormik01"
                          >
                            <Form.Control
                              className="p-3"
                              placeholder="School near 5 km"
                              disabled={viewMode}
                              type="text"
                              name="whychoose1"
                              {...formik.getFieldProps("whychoose1")}
                              onChange={(e) => {
                                formik.setFieldValue(
                                  "whychoose1",
                                  e.target.value
                                );
                              }}
                            />
                            {formik.touched.whychoose1 &&
                              formik.errors.whychoose1 && (
                                <small className="text-danger">
                                  {formik.errors.whychoose1}
                                </small>
                              )}
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
                              className="p-3"
                              placeholder="Railway station near 7 km"
                              disabled={viewMode}
                              type="text"
                              name="whychoose2"
                              {...formik.getFieldProps("whychoose2")}
                              onChange={(e) => {
                                formik.setFieldValue(
                                  "whychoose2",
                                  e.target.value
                                );
                              }}
                            />
                            {formik.touched.whychoose2 &&
                              formik.errors.whychoose2 && (
                                <small className="text-danger">
                                  {formik.errors.whychoose2}
                                </small>
                              )}
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
                              className="p-3"
                              placeholder="Airport near 7 km"
                              disabled={viewMode}
                              type="text"
                              name="whychoose3"
                              {...formik.getFieldProps("whychoose3")}
                              onChange={(e) => {
                                formik.setFieldValue(
                                  "whychoose3",
                                  e.target.value
                                );
                              }}
                            />
                            {formik.touched.whychoose3 &&
                              formik.errors.whychoose3 && (
                                <small className="text-danger">
                                  {formik.errors.whychoose3}
                                </small>
                              )}
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
                              className="p-3"
                              placeholder="Top restaurants under 5 km"
                              disabled={viewMode}
                              type="text"
                              name="whychoose4"
                              {...formik.getFieldProps("whychoose4")}
                              onChange={(e) => {
                                formik.setFieldValue(
                                  "whychoose4",
                                  e.target.value
                                );
                              }}
                            />
                            {formik.touched.whychoose4 &&
                              formik.errors.whychoose4 && (
                                <small className="text-danger">
                                  {formik.errors.whychoose4}
                                </small>
                              )}
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
                              className="p-3"
                              placeholder="ATM near 1km"
                              disabled={viewMode}
                              type="text"
                              name="whychoose5"
                              {...formik.getFieldProps("whychoose5")}
                              onChange={(e) => {
                                formik.setFieldValue(
                                  "whychoose5",
                                  e.target.value
                                );
                              }}
                            />
                            {formik.touched.whychoose5 &&
                              formik.errors.whychoose5 && (
                                <small className="text-danger">
                                  {formik.errors.whychoose5}
                                </small>
                              )}
                          </Form.Group>
                        </Col>
                        <Col lg={12} md={12}>
                          {viewMode ? (
                            <ButtonComponent
                              type="button"
                              className="btn btn_contact"
                              text="Back"
                              style=" my-3 px-5 py-3 cancel_btn_property"
                              clickOnButton={() => router.back()}
                              // disabled={viewMode}
                            />
                          ) : (
                            <div className="d-flex justify-content-between">
                              <ButtonComponent
                                type="button"
                                className="btn btn_contact"
                                text="Cancel"
                                style=" my-3 px-5 py-3 cancel_btn_property"
                                clickOnButton={cancelProperty}
                                // disabled={viewMode}
                              />
                              <ButtonComponent
                                type="submit"
                                className="btn btn_contact"
                                text={btnShow ? "Update" : "Submit"}
                                style=" my-3 px-5 py-3"
                                // disabled={viewMode}
                              />
                            </div>
                          )}
                        </Col>
                      </Row>
                    </div>
                  </div>
                  <div className="col-md-6 mt-5">
                    <Form.Group
                      as={Col}
                      md="12"
                      className="mb-4"
                      controlId="validationFormik01"
                    >
                      <label className="mb-3">Map Area</label>
                      <Form.Control
                        className="p-3"
                        placeholder="Area map"
                        type="text"
                        name="iframe"
                        value={mapUrl}
                        // onChange={onChangeInutp}
                        {...formik.getFieldProps("iframe")}
                        onChange={(e) => {
                          formik.setFieldValue("iframe", e.target.value);
                          setmapUrl(e.target.value);
                        }}
                        disabled={viewMode}
                      />
                      {formik.touched.iframe && formik.errors.iframe && (
                        <small className="text-danger">
                          {formik.errors.iframe}
                        </small>
                      )}
                    </Form.Group>
                    <div>
                      <iframe
                        src={mapUrl}
                        width="500"
                        height="450"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>

                    <Col lg={12} md={12} className="mt-3">
                      <label className="mb-3">Owner Details</label>
                      <Form.Group
                        as={Col}
                        md="12"
                        className="mb-4"
                        controlId="validationFormik01"
                      >
                        <Form.Control
                          className="p-3"
                          placeholder="Owner name"
                          disabled={viewMode}
                          type="text"
                          name="ownername"
                          {...formik.getFieldProps("ownername")}
                          onChange={(e) => {
                            formik.setFieldValue("ownername", e.target.value);
                          }}
                        />
                        {formik.touched.ownername &&
                          formik.errors.ownername && (
                            <small className="text-danger">
                              {formik.errors.ownername}
                            </small>
                          )}
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        md="12"
                        className="mb-4"
                        controlId="validationFormik01"
                      >
                        <Form.Control
                          className="p-3"
                          placeholder="Owner address"
                          disabled={viewMode}
                          type="text"
                          name="owneraddress"
                          {...formik.getFieldProps("owneraddress")}
                          onChange={(e) => {
                            formik.setFieldValue(
                              "owneraddress",
                              e.target.value
                            );
                          }}
                        />
                        {formik.touched.owneraddress && (
                          <small className="text-danger">
                            {formik.errors.owneraddress}
                          </small>
                        )}
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="12"
                        className="mb-4"
                        controlId="validationFormik01"
                      >
                        <Form.Control
                          className="p-3"
                          placeholder="Owner phone no.."
                          disabled={viewMode}
                          type="number"
                          name="ownerphone"
                          {...formik.getFieldProps("ownerphone")}
                          onChange={(e) => {
                            formik.setFieldValue("ownerphone", e.target.value);
                          }}
                        />
                        {formik.touched.ownerphone && (
                          <small className="text-danger">
                            {formik.errors.ownerphone}
                          </small>
                        )}
                      </Form.Group>
                    </Col>
                    <Col lg={12} md={12}>
                      <label className="mb-3">RERA </label>
                      <Form.Group
                        as={Col}
                        md="12"
                        className="mb-4"
                        controlId="validationFormik01"
                      >
                        <Form.Control
                          className="p-3"
                          placeholder="RERA ...."
                          disabled={viewMode}
                          type="text"
                          name="rera"
                          {...formik.getFieldProps("rera")}
                          onChange={(e) => {
                            formik.setFieldValue("rera", e.target.value);
                          }}
                        />
                        {formik.touched.rera && (
                          <small className="text-danger">
                            {formik.errors.rera}
                          </small>
                        )}
                      </Form.Group>
                    </Col>
                  </div>
                </div>
              </Card>
            </form>
          </div>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </>
  );
}

export default PropertyForm;
