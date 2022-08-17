import React, { useState, useEffect } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Form,
  Button,
  ToggleButton,
} from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import ButtonComponent from "../../../../../components/button/buttonComponent";
import axios from "axios";
import DataTable from "react-data-table-component";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import DeleteModal from "../../../../../components/commonComponent/deleteModal";
// import PropertyData from "../propertyData";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import ImageUploadMultiple from "../../../../../components/commonComponent/ImageUploadMultiple";
import Image from "next/image"
function Amenities() {

  const router = useRouter()

  const [typeProperty, setTypeProperty] = useState([]);
  const [change, setChange] = useState(false);
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [deletId, setDeletId] = useState("");
  const [loader, setLoader] = useState(false);

  const [modalDeleteShow, setModalDeleteShow] = useState(false);
  const handleDeleteClose = () => setModalDeleteShow(false);

  const handleDeleteShow = (row) => {
    setDeletId(row._id);
    setModalDeleteShow(true);
  };
  const validationSchema = yup.object().shape({
    images: yup.array().required("Images is required"),
    amenities: yup.string().required("Amenities is required"),
  });
  const initialValues = {
    images: [],
    amenities: "",
  };

  const onSubmit = async (values,{resetForm}) => {
    setLoader(true);

        //  const stringArray[] = "";
        //  StringBuffer sb = new StringBuffer();
        //  for(var i = 0; i < stringArray.length; i++) {
        //     sb.append(stringArray[i]);
        //  }
        //  String str = sb.toString();
        //  System.out.println(str);



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
        img.push(res.data.url);
      }
      //  else {
      //   img.push(values.images[i].src);
      // }
    }

    const payload = {
      type: values.amenities,
      // icon: values.images,

    };
    if (img) {
      payload.icon = img.toString();
    }
    if (show) {
      axios
        .put(`/api/actions/amenities/${id}`, payload)
        .then((res) => {
          if (res.data) {
            toast.success("amenities Updated successfully",{ theme: "colored",});
            setLoader(false);
            setChange(!change);
            setShow(false);
          }
        })
        .catch((err) => {
          setLoader(false);
          toast.error("Something went wrong");
        });
    } else {
      axios
        .post(`/api/actions/amenities`, payload)
        .then((res) => {
          if (res.data) {
            setLoader(false);
            toast.success("amenities added successfully",{ theme: "colored",});
            getPropertyType(res.data.type);
            setChange(!change);
          }
        })
        .catch((err) => {
          setLoader(false);
          toast.error("Something went wrong");
          return err || [];
        });
    }
    resetForm(initialValues)
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const deleteHandler = () => {
    deletePropertyType(deletId);
    handleDeleteClose();
  };
  const editHandler = (row) => {
    setId(row._id);
    formik.setFieldValue("amenities", row.type, false);
    window.scroll({
      top: 300,
      behavior: "smooth",
    });
    setShow(true);
  };

  useEffect(() => {
    getPropertyType();
  }, [change]);

  const getPropertyType = () => {
    axios
      .get(`/api/actions/amenities`)
      .then((res) => {
        setTypeProperty(res.data);
      })
      .catch((res) => {
        return res || [];
      });
  };

  const deletePropertyType = (_id) => {
    axios
      .delete(`/api/actions/amenities/${_id}`)
      .then((res) => {
        getPropertyType();
        toast.success("property Type delete successfully", { theme: "colored", });
      })
      .catch((res) => {
        return res || [];
      });
  };


  useEffect(() => {
    const login = JSON.parse(localStorage.getItem("login"))
    if (!login) {
      router.push("/pageadmin")
    }
  }, [])
  const homeColumns = [
    {
      name: "Icon",
      selector: (row) => row.icon,
      // cell: (row) => (
      //   <>
      //     <Image src={row.icon} alt="amenities" width={50} height={50}/>
      //   </>
      // ),
    },
    {
      name: "Amenities",
      selector: (row) => row.type,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <FaPen className="mx-2" onClick={() => editHandler(row)} />
          <FaTrashAlt className="mx-2" onClick={() => handleDeleteShow(row)} />
        </>
      ),
    },
  ];


  useEffect(() => {
    const login = JSON.parse(localStorage.getItem("login"))
    if (!login) {
      router.push("/pageadmin")
    }
  }, [])
  return (
    <>
      <Card>
        <div className="mt-5">

          <form onSubmit={formik.handleSubmit}>
            <div className="w-50 mx-auto">

              <Form.Group
                as={Col}
                md="12"
                className="mb-4"
                controlId="validationFormik01"
              >
                {/* <Form.Control
                  className="p-3"
                  placeholder="icon..."
                  type="text"
                  name="icon"
                  {...formik.getFieldProps("icon")}
                  onChange={(e) => {
                    formik.setFieldValue("icon", e.target.value);
                  }}
                /> 
                 {formik.touched.icon && (
                  <small className="text-danger">
                    {formik.errors.icon}
                  </small>
                )}*/}
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

              </Form.Group>
              <Form.Group
                as={Col}
                md="12"
                className="mb-4"
                controlId="validationFormik01"
              >
                <Form.Control
                  className="p-3"
                  placeholder="amenities"
                  type="text"
                  name="amenities"
                  {...formik.getFieldProps("amenities")}
                  onChange={(e) => {
                    formik.setFieldValue("amenities", e.target.value);
                  }}
                // value={field.type}
                />
                {formik.touched.amenities && (
                  <small className="text-danger">
                    {formik.errors.amenities}
                  </small>
                )}
              </Form.Group>
              <div className="d-flex justify-content-between">
                <div className="text-center">
                  <ButtonComponent
                    type="submit"
                    className="btn btn_contact"
                    text={show ? "Update" : "Submit"}
                    style=" my-3 px-5 py-3"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </Card>

      <div>
        <DataTable columns={homeColumns} data={typeProperty} pagination />
      </div>
      <DeleteModal
        showModal={modalDeleteShow}
        hideModal={handleDeleteClose}
        deleteHandler={deleteHandler}
      />
    </>
  );
}

export default Amenities;
