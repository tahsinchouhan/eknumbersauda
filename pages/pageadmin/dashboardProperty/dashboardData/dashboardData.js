import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import SidebarData from "../../../../components/admin/adminContents/sidebarData";
import AdminDashboard from "../../../../components/admin/adminDashboard";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import PropertyTable from "../PropertyTable";
import PropertyData from "../propertyData";

function DashboardData() {
  const router = useRouter()

  const [dashboardData, setDashboardData] = useState({})
  const [open, setOpen] = useState(false);
  const Data = [
    {
      title: "Total Rent",
      totalNo: dashboardData.totalrent,
      path: "../propertyData",
      default: '../propertyData'
    },
    {
      title: "Total Sell",
      totalNo: dashboardData.totalsell,
      path: "../propertyData",
    },
    {
      title: "Total No. Of Featured Properties",
      totalNo: dashboardData.totalfeatured,
      path: "/pageadmin/dashboardProperty/propertyData",
    },
    {
      title: "Total No. Of Projects",
      totalNo: dashboardData.totalproject,
      path: "/pageadmin/dashboardProperty/propertyData",
    },
    {
      title: "Total No. Of Services",
      totalNo: dashboardData.totalservices,
      path: "/pageadmin/dashboardProperty/setting/bestService",
    },
    {
      title: "Total No. Of Contact Form Data ",
      totalNo: dashboardData.totalcontact,
      path: "/pageadmin/dashboardProperty/contactUsData",
    },
    {
      title: "Total No. Of Book Property Request ",
      totalNo: dashboardData.totalbookproperty,
      path: `/pageadmin/dashboardProperty/ContactData?tab=BookNow`,

    },
    {
      title: "Total No. Of Post Property Request ",
      totalNo: dashboardData.totaluserpost,
      path: `/pageadmin/dashboardProperty/ContactData?tab=PostProperty`,
    },
  ];
  useEffect(() => {
    getDashboard()
  }, [])


  const getDashboard = () => {
    axios.get(`/api/actions/dashboard`)
      .then((res) => {
        setDashboardData(res.data)
      })
      .catch((err) => {
        console.log("Dashboard", err)
      })
  }

  useEffect(() => {
    const login= JSON.parse(localStorage.getItem("login"))
    if(!login){
      router.push("/pageadmin")
    }
   }, [])
  return (
    <div>
      <div className="">
        <div className="p-4" style={{ backgroundColor: "#0098DA" }}>
          <h5
            className="text-white m-0 fw-bold andmin-paridhi-text"
            style={{ letterSpacing: "3px" }}
          >
            PARIDHI
          </h5>
        </div>
        <div className="d-flex">
          <div lg={2} md={12}>
            <SidebarData />
          </div>
          <div lg={10} md={10} className="px-4 py-2 w-100 mt-5">
            <h4 className="text-center fw-bold">Dashboard</h4>
            <hr />
            <Row>

            {Data.map((item, index) =>{
              return(
                <>
                <Col sm={6} md={4} xl={3} className="my-5" >
                <Link
                  href={item.path || item.default}
                  key={index}
                  className="admin_link"
                  activeclassName="admin_active"
                >
                  <div
                    className={`${router.pathname === item.path ? "activeNav " : ""
                      }  card dashboardData-card shadow p-5  px-3  py-4   w-75 m-auto`}
                    style={{ height: "225px", cursor: "pointer" }}

                  >
                     <h2 className="text-center  fw-bold my-lg-4">
                          {item.totalNo}
                        </h2>
                        <p className="mt-2 text-center fw-bold my-0 mt-lg-2 mb-4">
                          {item.title}
                        </p>
                  </div>
                </Link>
                </Col>
                </>
              )
            }          
            )}
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardData;
