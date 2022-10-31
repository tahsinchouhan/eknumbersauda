import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Col, FormControl, InputGroup, Row, Tab, Tabs } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { BsFillEyeFill } from "react-icons/bs";
import SidebarData from "../../../components/admin/adminContents/sidebarData";

function ContactData() {
  const [propertyFormData, setPropertyFormData] = useState([]);
  const [serviceFormData, setServiceFormData] = useState([]);
  const [bookData, setBookData] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [filterService, setfilterService] = useState([]);
  const [filterPropertyData, setFilterPropertyData] = useState([]);

  // -------------------------------------book now--------------------
  const router = useRouter();
  const { query } = useRouter();

  const bookViewHandler = (propertyID, bookViewData) => {
    router.push(`./dashboardData/view/${propertyID}`);
  };
  const handleSelect = (key) => {
    // {query ?}
    if (key === "PostProperty") {
      postPropertyCall();
    }
    if (key === "Services") {
      servicesCall();
    }
  };
  useEffect(() => {
    bookNowCall();
    if (query?.tab) {
      handleSelect(query.tab);
    }
  }, []);

  const postPropertyCall = () => {
    axios({
      method: "get",
      url: `/api/actions/userpostproperty`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setPropertyFormData(res.data);
      })
      .catch((res) => {
        return res || [];
      });
  };

  const servicesCall = () => {
    axios({
      method: "get",
      url: `/api/actions/bestservice`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setServiceFormData(res.data);
      })
      .catch((res) => {
        return res || [];
      });
  };

  const bookNowCall = () => {
    axios
      .get(`/api/actions/getintouch`)
      .then((res) => {
        setBookData(res.data);
      })
      .catch((err) => {
        console.log("ContactData", err);
      });
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Mobile Number",
      selector: (row) => row.phone,
    },
    {
      name: "Message",
      selector: (row) => row.message,
      wrap: true,
      cell: (row) => (
        <div style={{ maxWidth: "600px", whiteSpace: "break-spaces" }}>
          <ReadMore>{row.message}</ReadMore>
        </div>
      ),
    },
    {
      name: "Booked Property ",
      cell: (row) => (
        <BsFillEyeFill onClick={() => bookViewHandler(row.propertyID)} />
      ),
    },
  ];

  // -----------------------------------services---------------------
  const ServicesColumns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Mobile Number",
      selector: (row) => row.phone,
    },
    {
      name: "Selected Services",
      selector: (row) => row.service,
    },
  ];

  // -------------------------------properties-------------------
  const propertyColumns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Mobile Number",
      selector: (row) => row.phone,
    },
    {
      name: "Type",
      selector: (row) => row.type,
    },
    {
      name: "Message",
      selector: (row) => row.message,
    },
  ];

  //---- booknow-filter-list----//

  useEffect(() => {
    const results = !searchInput
      ? bookData
      : bookData.filter((item) =>
          item.name.toLowerCase().includes(searchInput)
        );
    setFilterData(results);
  }, [bookData, searchInput]);

  //---- Services-filter-list----//

  useEffect(() => {
    const results = !searchInput
      ? serviceFormData
      : serviceFormData.filter((item) =>
          item.name.toLowerCase().includes(searchInput)
        );
    setfilterService(results);
  }, [serviceFormData, searchInput]);

  //---- propertyFormData-filter-list----//

  useEffect(() => {
    const results = !searchInput
      ? propertyFormData
      : propertyFormData.filter((item) =>
          item.name.toLowerCase().includes(searchInput)
        );
    setFilterPropertyData(results);
  }, [propertyFormData, searchInput]);

  // ----- ReadMore -----//
  const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <p className="text">
        {isReadMore ? text.slice(0, 10) : text}
        {text.length > 10 && (
          <span onClick={toggleReadMore} className="read-or-hide">
            {isReadMore ? "...read more" : " show less"}
          </span>
        )}
      </p>
    );
  };

  useEffect(() => {
    const login = JSON.parse(localStorage.getItem("login"));
    if (!login) {
      router.push("/pageadmin");
    }
  }, []);
  return (
    <div>
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
                  All Form Data
                </h4>
              </div>

              <Tabs
                justify
                defaultactivekey={query?.tab ? query.tab : "BookNow"}
                // defaultactivekey="Book Now"
                id="uncontrolled-tab-example"
                className="mb-3 mb-md-5 best_real_tab"
                onSelect={handleSelect}
              >
                <Tab
                  eventKey="BookNow"
                  title=" Book Now"
                  className="best_real_nav"
                >
                  <div>
                    <Row>
                      <Col md={3} className="marginLeft-auto mb-4">
                        <InputGroup className="mb-3">
                          <FormControl
                            placeholder="Search By Name"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                          />
                        </InputGroup>
                      </Col>
                    </Row>
                    <DataTable
                      columns={columns}
                      data={filterData}
                      responsive
                      highlightOnHover={true}
                      wrap={true}
                      pagination
                    />
                  </div>
                </Tab>
                <Tab
                  eventKey="Services"
                  title="Services"
                  className="best_real_nav"
                >
                  <div>
                    <Row>
                      <Col md={3} className="marginLeft-auto mb-4">
                        <InputGroup className="mb-3">
                          <FormControl
                            placeholder="Search By Name"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                          />
                        </InputGroup>
                      </Col>
                    </Row>
                    <DataTable
                      columns={ServicesColumns}
                      data={filterService}
                      responsive
                      highlightOnHover={true}
                      pagination
                    />
                  </div>
                </Tab>
                <Tab
                  // return={query}
                  // defaultactivekey="PostProperty"
                  eventKey="PostProperty"
                  title="Post Property"
                  className="best_real_nav"
                >
                  <div>
                    <Row>
                      <Col md={3} className="marginLeft-auto mb-4">
                        <InputGroup className="mb-3">
                          <FormControl
                            placeholder="Search By Name"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                          />
                        </InputGroup>
                      </Col>
                    </Row>
                    <DataTable
                      columns={propertyColumns}
                      data={filterPropertyData}
                      responsive
                      highlightOnHover={true}
                      pagination
                    />
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactData;
