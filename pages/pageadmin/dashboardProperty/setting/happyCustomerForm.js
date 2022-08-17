import React, { useEffect, useMemo } from "react";
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
import DataTable from "react-data-table-component";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { MOCK_PROPERTY_TABLE_DATA } from "../../../../utils/constants";
import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import DeleteModal from "../../../../components/commonComponent/deleteModal";
import SpinnerComponent from "../../../../components/commonComponent/spinner";
import { toaster } from "evergreen-ui";

function HappyCustomerForm() {
  const [counterData, setCounterData] = useState([]);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);
  const [change, setChange] = useState(false);
  const [id, setId] = useState(false);
  const [deletId, setDeletId] = useState("");
  const [modalDeleteShow, setModalDeleteShow] = useState(false);
  const handleDeleteClose = () => setModalDeleteShow(false);
  const [loader, setLoader] = useState(false);

  const handleDeleteShow = (row) => {
    setDeletId(row._id);
    setModalDeleteShow(true);
  };

  const validationSchema = yup.object().shape({
    countNumber: yup.string().required("Number is required"),
    countTitle: yup.string().required("Title is required"),
  });

  const initialValues = {
    countNumber: name,
    countTitle: title,
  };

  const onSubmit = (values, { resetForm }) => {
    setLoader(true);
    const happyCustomerData = {
      countNumber: values.countNumber,
      countTitle: values.countTitle,
    };

    if (show) {
      axios
        .put(`/api/actions/counters/${id}`, happyCustomerData)
        .then((res) => {
          setLoader(false);
          setChange(!change);
          getHappyCustome();
          toast.success("counter update successfully",{ theme: "colored",});
          setShow(false);
        })
        .catch((err) => {
          toast.error("Something went wrong",{ theme: "colored",});
          setLoader(false);
        });
    } else {
      if (counterData.length > 3) {
        setLoader(false);
        toast.error("cannot add more than 4 customers",{ theme: "colored",});
      } else {
        axios
          .post("/api/actions/counters", happyCustomerData)
          .then((res) => {
            if (res.data) {
              setChange(!change);
              setLoader(false);
              toast.success("counter added successfully",{ theme: "colored",});
              getHappyCustome();
            }
          })
          .catch((err) => {
            toast.error("Something went wrong",{ theme: "colored",});
            setLoader(false);
          });
      }
    }
    resetForm(initialValues);
  };

  useEffect(() => {
    getHappyCustome();
  }, [change]);

  const getHappyCustome = () => {
    axios({
      method: "get",
      url: `/api/client/getcounter`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setCounterData(res.data);
      })
      .catch((res) => {
        return res || [];
      });
  };

  const deleteHappyCustome = (_id) => {
    axios({
      method: "delete",
      url: `/api/actions/counters/${_id}`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        getHappyCustome();
        toast.success("counter deleted successfully",{ theme: "colored",});
      })
      .catch((res) => {
        return res || [];
      });
  };

  const editHandler = (row) => {
    setId(row._id);
    formik.setFieldValue("countNumber", row.countNumber);
    formik.setFieldValue("countTitle", row.countTitle);
    window.scroll({
      top: 300,
      behavior: "smooth",
    });
    setShow(true);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const deleteHandler = (row) => {
    deleteHappyCustome(deletId);
    handleDeleteClose();
  };
  const happyColumns = [
    {
      name: "Number",
      selector: (row) => row.countNumber,
    },
    {
      name: "Title",
      selector: (row) => row.countTitle,
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
              >
                <Form.Control
                  className="p-3"
                  type="text"
                  name="number"
                  // value={name}
                  placeholder="number"
                  {...formik.getFieldProps("countNumber")}
                  onChange={(e) => {
                    formik.setFieldValue("countNumber", e.target.value);
                  }}
                />
                {formik.touched.countNumber && formik.errors.countNumber && (
                  <small className="text-danger">
                    {formik.errors.countNumber}
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
                  type="text"
                  name="title"
                  // value={title}
                  placeholder="title"
                  {...formik.getFieldProps("countTitle")}
                  onChange={(e) => {
                    formik.setFieldValue("countTitle", e.target.value);
                  }}
                />
                {formik.touched.countTitle && formik.errors.countTitle && (
                  <small className="text-danger">
                    {formik.errors.countTitle}
                  </small>
                )}
              </Form.Group>

              <div className="text-center">
                <ButtonComponent
                  type="submit"
                  className="btn btn_contact"
                  text={show ? "Update" : "Submit"}
                  style=" my-3 px-5 py-3"
                />
                {loader ? <SpinnerComponent /> : ""}
              </div>
            </div>
          </Form>
        </div>

        <hr />
        <DataTable columns={happyColumns} data={counterData} pagination />
      </Card>
      <DeleteModal
        showModal={modalDeleteShow}
        hideModal={handleDeleteClose}
        deleteHandler={deleteHandler}
      />
    </>
  );
}

export default HappyCustomerForm;
