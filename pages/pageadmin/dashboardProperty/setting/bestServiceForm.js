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
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import ButtonComponent from "../../../../components/button/buttonComponent";
import DataTable from "react-data-table-component";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { MOCK_PROPERTY_TABLE_DATA } from "../../../../utils/constants";
import Select from "react-select";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import DeleteModal from "../../../../components/commonComponent/deleteModal";
import SpinnerComponent from "../../../../components/commonComponent/spinner";


// import {BsBuilding} from "react-icons/Bs"
// import {FaMapMarkedAlt} from "react-icons/fa"

// const options = [
//   { value:<BsBuilding/>, label:<BsBuilding/>},
//   { value:<FaMapMarkedAlt/>, label:<FaMapMarkedAlt/>},

// ]
//const snackbar = useSnackbar();

function BestServiceForm() {
  const [serviceTable, setServiceTable] = useState([]);
  const [show, setShow] = useState(false);
  const [id, setId] = useState(false);
  const [change, setChange] = useState(false);
  const [deletId, setDeletId] = useState("");
  const [modalDeleteShow, setModalDeleteShow] = useState(false);
  const handleDeleteClose = () => setModalDeleteShow(false);
  const [loader, setLoader] = useState(false);

  const handleDeleteShow = (row) => {
    setDeletId(row._id);
    setModalDeleteShow(true);
  };

  const validationSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    content: yup.string().required("description is required"),
  });

  const initialValues = {
    icon: "",
    title: "",
    content: "",
  };

  const onSubmit = (values, { resetForm }) => {
    setLoader(true);
    const bestService = {
      title: values.title,
      content: values.content,
    };
    if (show) {
      axios
        .put(`/api/actions/services/${id}`, bestService)
        .then((res) => {
          if (res.data) {
            setLoader(false);
            setChange(!change);
            getServiceForm();
            toast.success("services update successfully",{ theme: "colored",});
            setShow(false);
          }
        })
        .catch((err) => {
          setLoader(false);
        });
    } else {
      axios
        .post("/api/actions/services", bestService)
        .then((res) => {
          //  if(res.data===200){
          setLoader(false);
          toast.success("services added successfully",{ theme: "colored",});
          getServiceForm();
          setChange(!change);
          //  }
        })
        .catch((err) => {
          setLoader(false);
          toast.error("something went wrong",{ theme: "colored",});
        });
    }
    resetForm(initialValues);
  };

  const editHandler = (row) => {
    setId(row._id);
    formik.setFieldValue("title", row.title, false);
    formik.setFieldValue("content", row.content, false);

    window.scroll({
      top: 300,
      behavior: "smooth",
    });
    setShow(true);
  };

  const deleteHandler = (row) => {
    deleteServiceForm(deletId);
    handleDeleteClose();
  };
  useEffect(() => {
    getServiceForm();
  }, []);

  const getServiceForm = () => {
    axios({
      method: "get",
      url: `/api/client/getservice`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setServiceTable(res.data);
      })
      .catch((res) => {
        return res || [];
      });
  };

  const deleteServiceForm = (_id) => {
    axios({
      method: "delete",
      url: `/api/actions/services/${_id}`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        toast.success("services delete successfully",{ theme: "colored",});
        getServiceForm();
      })
      .catch((err) => {
        toast.error("something went wrong",{ theme: "colored",});
      });
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Content",
      selector: (row) => row.content,
    },

    {
      name: "Action",
      cell: (row) => (
        <>
          <FaPen
            className="mx-2"
            onClick={() => editHandler(row)}
            id={row._id}
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
          <Form onSubmit={formik.handleSubmit}>
            <div className="w-50 mx-auto">
              <Form.Group
                as={Col}
                md="12"
                className="mb-4"
                controlId="validationFormik01"
              ></Form.Group>
              <Form.Group
                as={Col}
                md="12"
                className="mb-4"
                controlId="validationFormik01"
              >
                <Form.Control
                  className="p-3"
                  type="text"
                  name="title"
                  placeholder="title"
                  values={formik.title}
                  {...formik.getFieldProps("title")}
                  onChange={(e) => {
                    formik.setFieldValue("title", e.target.value);
                  }}
                />
                {formik.touched.title && formik.errors.title && (
                  <small className="text-danger">{formik.errors.title}</small>
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
                  name="content"
                  placeholder="description"
                  values={formik.content}
                  {...formik.getFieldProps("content")}
                  onChange={(e) => {
                    formik.setFieldValue("content", e.target.value);
                  }}
                />
                {formik.touched.content && formik.errors.content && (
                  <small className="text-danger">{formik.errors.content}</small>
                )}
              </Form.Group>

              <div className="text-center">
                <ButtonComponent
                  type="subm
                it"
                  className="btn btn_contact"
                  text={show ? "Update" : "Submit"}
                  style=" my-3 px-5 py-3"
                />
                {loader?<SpinnerComponent/>:""}
              </div>
            </div>
          </Form>
        </div>
        <hr />
        <DataTable columns={columns} data={serviceTable} pagination />
      </Card>
      <DeleteModal
        showModal={modalDeleteShow}
        hideModal={handleDeleteClose}
        deleteHandler={deleteHandler}
      />
    </>
  );
}

export default BestServiceForm;
