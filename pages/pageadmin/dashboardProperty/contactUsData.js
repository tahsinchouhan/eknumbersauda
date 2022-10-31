import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import SidebarData from "../../../components/admin/adminContents/sidebarData";
function ContactUs() {
  const router = useRouter();

  const [contactData, setContactData] = useState([]);
  useEffect(() => {
    initialLoad();
  }, []);

  const initialLoad = () => {
    axios({
      url: "/api/actions/contact",
      method: "get",
    })
      .then((res) => {
        setContactData(res.data);
      })
      .catch((err) => {
        return err || "";
      });
  };

  // const deleteHandler = (row) => {
  //   axios({
  //     url: `/api/actions/contact/${row._id}`,
  //     method: "delete",
  //   })
  //     .then((res) => {
  //       initialLoad();
  //     })
  //     .catch((err) => {return err ||''});
  // };

  useEffect(() => {
    const login = JSON.parse(localStorage.getItem("login"));
    if (!login) {
      router.push("/pageadmin");
    }
  }, []);
  const ServicesData = [
    {
      id: 1,
      name: "Beetlejuice",
      email: "abc@gamil.com",
      selectedServices: "Selected Services",
      mobile: 123456789,
    },
    {
      id: 2,
      name: "Beetlejuice",
      email: "abc@gamil.com",
      selectedServices: "Selected Services",
      mobile: 123456789,
    },
    {
      id: 3,
      name: "Beetlejuice",
      email: "abc@gamil.com",
      selectedServices: "Selected Services",
      mobile: 123456789,
    },
    {
      id: 4,
      name: "Beetlejuice",
      email: "abc@gamil.com",
      selectedServices: "Selected Services",
      mobile: 123456789,
    },
  ];

  const contactFormColumns = [
    {
      name: "Date",
      selector: (row) => moment(row.createdAt).format("DD/MM/YYYY"),
    },
    {
      name: "User-Name",
      selector: (row) => row.name,
    },
    {
      name: "User-Email",
      selector: (row) => row.email,
    },
    {
      name: "User Mobile Number",
      selector: (row) => row.phone,
    },
    {
      name: "Message",
      selector: (row) => row.messages || "",
    },
    // {
    //   name: "Action",
    //   selector: (row) => (
    //     <FaTrashAlt className="mx-2" onClick={() => deleteHandler(row)} />
    //   ),
    // },
  ];
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
        <div className=" ">
          <div className="d-flex ">
            <div lg={2} md={12} className="px-0">
              <SidebarData />
            </div>
            <div lg={10} md={10} className="px-3  w-100 ">
              <div>
                <h4 className="header mx-4 px-3 pt-3 my-5 fw-bold">
                  Contact Us
                </h4>
              </div>
              <div>
                <DataTable
                  columns={contactFormColumns}
                  data={contactData}
                  responsive
                  highlightOnHover={true}
                  pagination
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
