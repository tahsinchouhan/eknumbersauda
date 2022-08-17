import React, { useState, useEffect } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import AdminDashboard from "../../../components/admin/adminDashboard";
import { useRouter } from "next/router";
import Link from "next/link";
import DataTable from "react-data-table-component";
// import PropertyTable from './PropertyTable';
import axios from "axios";
// import PropertyData from './propertyData';
import { MOCK_PROPERTY_TABLE_DATA } from "../../../utils/constants";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import SidebarData from "../../../components/admin/adminContents/sidebarData";
import { MenuItemLink } from "react-admin";
import PropertyTable from "./PropertyTable";
import DeleteModal from "../../../components/commonComponent/deleteModal";
import { toast, ToastContainer } from "react-toastify";
import { BsFillEyeFill } from "react-icons/bs";



function PropertyData() {

  const router = useRouter();

  const [AddView, setAddView] = useState(0);
  const [getPropertyData, setGetPropertyData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filterProperty, setFilterProperty] = useState([]);
  const [deletId, setDeletId] = useState("")

  const [modalDeleteShow, setModalDeleteShow] = useState(false);
  const handleDeleteClose = () => setModalDeleteShow(false);

  const handleDeleteShow = (row) => {
    setDeletId(row._id)
    setModalDeleteShow(true);

  }

  const addPropertHandler = () => {
    setAddView();
    router.push("/pageadmin/dashboardProperty/PropertyTable");
  };

  const editHandler = (row) => {
    router.push(`./dashboardData/${row._id}`);
  };
  const deleteHandler = (row) => {
    deletePropertyCall(deletId);
    handleDeleteClose()
  };

  useEffect(() => {
    getPropertyCall();
  }, []);

  const getPropertyCall = () => {
    axios({
      method: "get",
      url: `/api/client/getproperty`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setGetPropertyData(res.data);
      })
      .catch((res) => {
        return res || [];
      });
  };

  //put Api
  const putPropertyCall = (_id) => {
    axios({
      method: "put",
      url: `/api/actions/uploadproperty/${_id}`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setGetPropertyData(res.data);
      })
      .catch((res) => {
        return res || [];
      });
  };

  //delete Property call
  const deletePropertyCall = (_id) => {
    axios({
      method: "delete",
      url: `/api/actions/uploadproperty/${_id}`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        toast.success("property delete successfully",{ theme: "colored",});
        getPropertyCall()
      })
      .catch((res) => {
        toast.error("something went wrong",{ theme: "colored",});
        return res || [];

      });
  };

  useEffect(() => {
    const login= JSON.parse(localStorage.getItem("login"))
    if(!login){
      router.push("/pageadmin")
    }
   }, [])

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Property Type",
      selector: (row) => row.type,
      sortable: true, 
    },
    {
      name: "Owner Name",
      selector: (row) => row.ownername,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.realprice,
      sortable: true,
    },
    {
      name: "Minimumprice",
      selector: (row) => row.minprice,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <BsFillEyeFill style={{ cursor: "pointer" }} className="mx-2" onClick={() => router.push(`dashboardData/view/${row._id}`)} />

          <FaPen style={{ cursor: "pointer" }} className="mx-2" onClick={() => editHandler(row)} />

          <FaTrashAlt style={{ cursor: "pointer" }} className="mx-2" onClick={() => handleDeleteShow(row)} />
        </>
      ),
    },

  ];

  useEffect(() => {
    const results = !searchInput
      ? getPropertyData
      : getPropertyData.filter((item) =>
        item.title.toLowerCase().includes(searchInput)
      );
    setFilterProperty(results);
  }, [getPropertyData, searchInput]);

  return (
    <>
      <div className="p-4" style={{ backgroundColor: "#0098DA" }}>
        <h5
          className="text-white m-0 fw-bold andmin-paridhi-text"
          style={{ letterSpacing: "3px" }}
        >
          PARIDHI
        </h5>
      </div>
      <div className="d-flex">
        <div lg={2} md={12} className="px-0">
          <SidebarData />
        </div>
        <div lg={10} md={10} className="px-4 py-2 w-100 mt-5">
          <Button
            className="btn btn-primary"
            onClick={() => addPropertHandler()}
            style={{ float: "right", marginBottom: "15px" }}
          >
            Add Property
          </Button>

          <div>
            <div>
              <h4 className="header px-2 pt-3 mb-5 fw-bold">Property List</h4>
            </div>
            <Col md={3} className="marginLeft-auto">
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Search By Title"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </InputGroup>
            </Col>


            <DataTable columns={columns} data={filterProperty} pagination />
          </div>
        </div>
      </div>
      <DeleteModal
        showModal={modalDeleteShow}
        hideModal={handleDeleteClose}
        deleteHandler={deleteHandler} />

      <ToastContainer />

    </>
  );
}

export default PropertyData;
