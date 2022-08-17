import React, { useState, useEffect, useMemo } from "react";
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
import ButtonComponent from "../../../../components/button/buttonComponent";
import axios from "axios";
import DataTable from "react-data-table-component";
import { MOCK_PROPERTY_TABLE_DATA } from "../../../../utils/constants";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import ImageUploadMultiple from "../../../../components/commonComponent/ImageUploadMultiple";
import DeleteModal from "../../../../components/commonComponent/deleteModal";
import { toast, ToastContainer } from "react-toastify";
import SpinnerComponent from "../../../../components/commonComponent/spinner";

function TestimonialHome() {
  const homeColumns = [
    {
      name: "Image",
      selector: (row) => row.bannername,
    },
    {
      name: "Url",
      selector: (row) => row.url,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <FaTrashAlt className="mx-2" onClick={() => handleDeleteShow(row)} />
        </>
      ),
    },
  ];

  const [show, setShow] = useState(true);
  const [image, setImage] = useState([]); // UPDATE IMAGE FROM INPUT
  const [url, setUrl] = useState(""); // UPDATE API URL WHEN SUCCESS
  const [dynobtn, setDynobtn] = useState("SUBMIT"); // UPDATE BUTTON TEXT
  const [bennerName, setBennerName] = useState("");
  const [deletId, setDeletId] = useState("");
  const [modalDeleteShow, setModalDeleteShow] = useState(false);
  const handleDeleteClose = () => setModalDeleteShow(false);
  const [loader, setLoader] = useState(false);

  const handleDeleteShow = (row) => {
    setDeletId(row._id);
    setModalDeleteShow(true);
  };
  const validationSchema = yup.object().shape({
    image: yup.array(),
  });

  const initialValues = {
    images: [],
  };

  const onSubmit = async (values, { resetForm }) => {
    setLoader(true);
    const FORMDATA = new FormData();
    const file = values.images[0].file;
    FORMDATA.append("file", file);
    FORMDATA.append("upload_preset", "giyajjxo");
    try {
      const response = await axios
        .post(
          "https://api.cloudinary.com/v1_1/dkpf6ld5a/image/upload",
          FORMDATA
        )
        .then((res) => {
          setLoader(false);
          setUrl(res.data.secure_url);
          setBennerName(res.data.original_filename);
          getHomebenner();
        });
    } catch (err) {
      setLoader(false);
      setDynobtn("ERROR!");
    }
    resetForm(initialValues);
    
  };

  useEffect(() => {
    if (url) {
      const imagePayload = {
        bannername: bennerName,
        url,
      };
      axios
        .post("/api/actions/banner", imagePayload)
        .then((res) => {
          if (res.data) {
            toast.success("image Uploaded successfully",{ theme: "colored",});
            // getHomebenner();
            setLoader(false);
          }
        })
        .catch((err) => {
          setLoader(false);
          return err || [];
        });
    }
  }, [url]);

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  useEffect(() => {
    getHomebenner();
  }, []);

  const getHomebenner = () => {
    axios
      .get("/api/client/getbanner")
      .then((res) => {
        setImage(res.data);
      })
      .catch((res) => {
        return res || [];
      });
  };

  const deleteHandler = (row) => {
    handleDeleteClose();
    deleteHomebenner(deletId);
  };
  const deleteHomebenner = (_id) => {
    axios
      .delete(`/api/actions/banner/${_id}`)
      .then((res) => {
        // setImage(res.data);
        getHomebenner();
        toast.success("image delete successfully",{ theme: "colored",});
      })
      .catch((res) => {
        return res || [];
      });
  };

  return (
    <>
      <Card>
        <div className="mt-5">
          <div>
            <h4 className="text-center py-2">Home</h4>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="w-50 mx-auto">
              <Form.Group
                as={Col}
                md="12"
                className="mb-4 text-center"
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
                  images={formik.values.images}
                  setImages={(images) => {
                    formik.setFieldValue("images", images);
                  }}
                />
                {formik.touched.images && (
                  <small className="text-danger">{formik.errors.images}</small>
                )}
              </Form.Group>
                <div className="text-center">
                  <ButtonComponent
                    type="submit"
                    className="btn btn_contact"
                    text={show ? "Upload" : " Submit"}
                    style=" my-3 px-5 py-3"
                  />
                  {loader ? <SpinnerComponent /> : ""}
              </div>
            </div>
          </form>
        </div>
        <hr />
        <div>
          <DataTable columns={homeColumns} data={image} pagination />
        </div>
      </Card>
      <DeleteModal
        showModal={modalDeleteShow}
        hideModal={handleDeleteClose}
        deleteHandler={deleteHandler}
      />
    </>
  );
}

export default TestimonialHome;
