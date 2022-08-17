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
import ButtonComponent from "../../../../components/button/buttonComponent";
import axios from "axios";
import DataTable from "react-data-table-component";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import DeleteModal from "../../../../components/commonComponent/deleteModal";
import PropertyData from "../propertyData";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
function PropertyType() {

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
    property: yup.string().required("property is required"),
  });
  const initialValues = {
    property: "",
  };

  const onSubmit = async (values) => {
    setLoader(true);
    const payload = {
      type: values.property,
    };
    if (show) {
      axios
        .put(`/api/actions/propertytype/${id}`, payload)
        .then((res) => {
          if (res.data) {
            toast.success("property type Updated successfully",{ theme: "colored",});
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
        .post(`/api/actions/propertytype`, payload)
        .then((res) => {
          if (res.data) {
            setLoader(false);
            toast.success("property type added successfully",{ theme: "colored",});
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
    values.property = "";
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
    formik.setFieldValue("property", row.type, false);
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
      .get(`/api/actions/propertytype`)
      .then((res) => {
        setTypeProperty(res.data);
      })
      .catch((res) => {
        return res || [];
      });
  };

  const deletePropertyType = (_id) => {
    axios
      .delete(`/api/actions/propertytype/${_id}`)
      .then((res) => {
        getPropertyType();
        toast.success("property Type delete successfully",{ theme: "colored",});
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
      name: "Property",
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
    const login= JSON.parse(localStorage.getItem("login"))
    if(!login){
      router.push("/pageadmin")
    }
   }, [])
  return (
    <>
      <Card>
        <div className="mt-5">
          <form onSubmit={formik.handleSubmit}>
            <div className="w-50 mx-auto">
              <label className="mb-3">Property</label>
              <Form.Group
                as={Col}
                md="12"
                className="mb-4"
                controlId="validationFormik01"
              >
                <Form.Control
                  className="p-3"
                  placeholder="Flat/House/Villa"
                  type="text"
                  name="property"
                  {...formik.getFieldProps("property")}
                  onChange={(e) => {
                    formik.setFieldValue("property", e.target.value);
                  }}
                  // value={field.type}
                />
                {formik.touched.property && (
                  <small className="text-danger">
                    {formik.errors.property}
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

export default PropertyType;
