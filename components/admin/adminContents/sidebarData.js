import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import {
  FaHome,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
  FaThList,
} from "react-icons/fa";
import { MdOutlineAccountBalance, MdOutlineChat } from "react-icons/md";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { GoDashboard } from "react-icons/go";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/images/logo.png";
import { AiOutlineUnorderedList, AiOutlineContacts } from "react-icons/ai";
import { FiDatabase } from "react-icons/fi"
import { VscTypeHierarchySub } from "react-icons/vsc"
import { useRouter } from "next/router";
// import PropertMaster from "../../../pages/pageadmin/dashboardProperty/propertyMaster";

const SidebarData = ({ children }) => {
  const router = useRouter();

  const menuItem = [
    {
      path: "/pageadmin/dashboardProperty/dashboardData/dashboardData",
      default: "/pageadmin/dashboardProperty/dashboardData/dashboardData",
      name: "Dashboard",
      icon: <GoDashboard />,
    },
    {
      path: "/pageadmin/dashboardProperty/propertyData",
      // default: "/pageadmin/dashboardProperty/propertyData",
      name: "Property List",
      icon: <AiOutlineUnorderedList />,
    },
    {
      path: "/pageadmin/dashboardProperty/ContactData",
      name: "Forms Data",
      icon: <FiDatabase />,
    },

    {
      path: "/pageadmin/dashboardProperty/propertyMaster",
      name: "Property Master",
      icon: <VscTypeHierarchySub />,
    },


    {
      path: "/pageadmin/dashboardProperty/setting/bestService",
      name: "Setting",
      icon: <FiSettings />,
    },
    {
      path: "/pageadmin/dashboardProperty/contactUsData",
      name: "Contact Us",
      icon: <AiOutlineContacts />,
    },

    {
      path: "#0",
      name: "Logout",
      icon: <FiLogOut />,
      onclick:()=>
      {localStorage.removeItem("login")
      router.push('/pageadmin')
    },
    },
    
  ];
return (
  <>
    <div className="">
      <div style={{ width: "230px" }} className="admin_sidebar border pt-4">
        {menuItem.map((item, index) => (
          <>

          <div  onClick={item.onclick || null}>
            <Link
              href={item.path || item.default}
              key={index}
              className="admin_link"
              activeclassName="admin_active"
             
            >
              <div
                className={`${router.pathname === item.path ? "activeNav " : ""
                  }  d-flex align-items-center`}
              >
                <span className="admin_icon px-3 my-2">{item.icon}</span>
                <span className="admin_link_text">{item.name}</span>
              </div>
            </Link>
            </div>
          </>
        ))}
      </div>
    </div>
  </>
);
};

export default SidebarData;
