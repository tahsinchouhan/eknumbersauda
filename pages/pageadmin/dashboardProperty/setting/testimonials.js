import React, { useState, useEffect, useMemo } from "react";
import DataTable from "react-data-table-component";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { MOCK_PROPERTY_TABLE_DATA } from "../../../../utils/constants";
import {
  Card,
  Container,
  Row,
  Col,
  Form,
  Button,
  ToggleButton,
} from "react-bootstrap";
import ButtonComponent from "../../../../components/button/buttonComponent";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import DeleteModal from "../../../../components/commonComponent/deleteModal";
import axios from "axios";
import ImageUploadMultiple from "../../../../components/commonComponent/ImageUploadMultiple";
import { useRouter } from "next/router";
import SpinnerComponent from "../../../../components/commonComponent/spinner";

function Testimonials() {
  const router = useRouter();
  const [testimonialData, setTestimonialData] = useState([]);
  const [show, setShow] = useState(false);
  const [deletId, setDeletId] = useState("");
  const [modalDeleteShow, setModalDeleteShow] = useState(false);
  const handleDeleteClose = () => setModalDeleteShow(false);
  const [loading, setLoading] = useState(false);
  const [testimonialId, setTestimonialId] = useState("");

  const handleDeleteShow = (row) => {
    setDeletId(row._id);
    setModalDeleteShow(true);
  };

  const validationSchema = yup.object().shape({
    star: yup.string().required("rating is required"),
    name: yup.string().required("name is required"),
    address: yup.string().required("loction is required"),
    images: yup.array().required("image is required"),
    content: yup.string().required("description is required"),
  });

  const initialValues = {
    star: "",
    name: "",
    address: "",
    images: [],
    content: "",
  };

  const onSubmit = async (values, { resetForm }) => {
    if (values.star > Number(5)) {
      toast.error('Rating cannot be more than 5')
    }
    else if (values.star < Number(0)) {
      toast.error('Rating cannot be less than 0')
    }
    else {
      setLoading(true);
      const FORMDATA = new FormData();
      const img = [];
      for (var i = 0; i < values.images.length; i++) {
        const file = values.images[i].file;

        if (file) {
          FORMDATA.append("file", file);
          FORMDATA.append("upload_preset", "giyajjxo");
          const res = await axios.post(
            "https://api.cloudinary.com/v1_1/dkpf6ld5a/image/upload",
            FORMDATA
          );
          img.push(res.data.secure_url);
        } else {
          img.push(values.images[i].src);
        }
      }
      const testimonialTab = {
        star: values.star,
        name: values.name,
        address: values.address,
        content: values.content,
      };
      if (img) {
        testimonialTab.image = img;
      }

      if (show) {
        axios
          .put(`/api/actions/testimonial/${testimonialId}`, testimonialTab)
          .then((res) => {
            if (res.data) {
              setLoading(false);
              getTestimonial();
              toast.success("testimonial updated successfully", { theme: "colored", });
            }
          })
          .catch((err) => {
            setLoading(false);
            toast.error("Something went wrong", { theme: "colored", });
            return err || [];
          });
      } else {
        axios
          .post(`/api/actions/testimonial`, testimonialTab)
          .then((res) => {
            if (res.data) {
              setLoading(false);
              getTestimonial();
              toast.success("testimonial added successfully", { theme: "colored", });
            }
          })
          .catch((err) => {
            setLoading(false);
            toast.error("Something went wrong", { theme: "colored", });
          });
      }
      resetForm(initialValues);
    }
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  useEffect(() => {
    getTestimonial();
  }, []);

  const editHandler = (row) => {
    setTestimonialId(row._id);
    formik.setFieldValue("star", row.star, false);
    formik.setFieldValue("name", row.name, false);
    formik.setFieldValue("address", row.address, false);
    formik.setFieldValue(
      "images",
      row?.image?.map((img) => ({ src: img })),
      false
    );
    formik.setFieldValue("content", row.content, false);
    window.scroll({
      top: 300,
      behavior: "smooth",
    });
    setShow(true);
  };
  const deleteHandler = (row) => {
    deleteTestimonial(deletId);
    handleDeleteClose();
  };

  const getTestimonial = () => {
    axios
      .get(`/api/actions/testimonial`)
      .then((res) => {
        setTestimonialData(res.data);
      })
      .catch((err) => {
        console.log("Testimonial", err);
      });
  };
  const deleteTestimonial = (_id) => {
    axios({
      method: "delete",
      url: `/api/actions/testimonial/${_id}`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.data) {
          getTestimonial();
          toast.success("testimonial delete successfully", { theme: "colored", });
        }
      })
      .catch((err) => {
        return err || [];
      });
  };
  const testimonialsColumns = [
    {
      name: "Rating",
      selector: (row) => row.star,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },

    {
      name: "Location",
      selector: (row) => row.address,
    },
    {
      name: "Image",
      selector: (row) => row.image,
    },

    {
      name: "Description",
      selector: (row) => row.content,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <FaPen
            className="mx-2"
            onClick={() => editHandler(row)}
            id={row.id}
          />
          <FaTrashAlt className="mx-2" onClick={() => handleDeleteShow(row)} />
        </>
      ),
    },
  ];


  return (
    <>
      <Card>
        <div className="mt-5">
          <div>
            <h4 className="text-center py-2">Testimonials</h4>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="w-50 mx-auto">
              <Form.Group
                as={Col}
                md="12"
                className="mb-4"
                controlId="validationFormik01"
              >
                <Form.Control
                  className="p-3"
                  type="text"
                  name="star"
                  placeholder="star"
                  values={formik.star}
                  {...formik.getFieldProps("star")}
                  onChange={(e) => {
                    formik.setFieldValue("star", e.target.value);
                  }}
                />
                {formik.touched.star && (
                  <small className="text-danger">{formik.errors.star}</small>
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
                  type="text"
                  name="name"
                  placeholder="name"
                  values={formik.name}
                  {...formik.getFieldProps("name")}
                  onChange={(e) => {
                    formik.setFieldValue("name", e.target.value);
                  }}
                />
                {formik.touched.name && (
                  <small className="text-danger">{formik.errors.name}</small>
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
                  type="text"
                  name="address"
                  placeholder="address"
                  values={formik.address}
                  {...formik.getFieldProps("address")}
                  onChange={(e) => {
                    formik.setFieldValue("address", e.target.value);
                  }}
                />
                {formik.touched.address && (
                  <small className="text-danger">{formik.errors.address}</small>
                )}
              </Form.Group>
              <ImageUploadMultiple
                isCarousel
                className="p-3"
                placeholder=" images"
                type="file"
                name="images"
                accept="image/*"
                multiple
                images={formik.values.images}
                setImages={(images) => {
                  formik.setFieldValue("images", images);
                }}
              />
              {formik.touched.images && (
                <small className="text-danger">{formik.errors.images}</small>
              )}
              <Form.Group
                as={Col}
                md="12"
                className="mb-4"
                controlId="validationFormik01"
              >
                <Form.Control
                  className="p-3"
                  type="text"
                  name="content"
                  placeholder="description"
                  values={formik.content}
                  {...formik.getFieldProps("content")}
                  onChange={(e) => {
                    formik.setFieldValue("content", e.target.value);
                  }}
                />
                {formik.touched.content && (
                  <small className="text-danger">{formik.errors.content}</small>
                )}
              </Form.Group>

              <div className="text-center">
                <ButtonComponent
                  type="submit"
                  className="btn btn_contact"
                  text={show ? "Update" : "Submit"}
                  style=" my-3 px-5 py-3"
                  disabled={loading}
                />
                {loading && <SpinnerComponent />}
              </div>
            </div>
          </form>
        </div>
        <hr />
        <DataTable
          columns={testimonialsColumns}
          data={testimonialData}
          pagination
        />
      </Card>
      <DeleteModal
        showModal={modalDeleteShow}
        hideModal={handleDeleteClose}
        deleteHandler={deleteHandler}
      />
    </>
  );
}

export default Testimonials;
