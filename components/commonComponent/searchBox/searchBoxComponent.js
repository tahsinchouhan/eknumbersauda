import React, { useState, useEffect, useCallback, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import "rc-slider/assets/index.css";
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as Yup from "yup";
import { location } from "../../../utils/constants";
import { GrLocation } from "react-icons/gr";
import { VscHome } from "react-icons/vsc";
import { MdKeyboardArrowDown } from "react-icons/md";
import { RiSearchLine } from "react-icons/ri";
import ButtonComponent from "../../button/buttonComponent";
import MultiRangeSlider from "./multiRangSlider";
import axios from "axios";
import { useRouter } from "next/router";
import Slider from "rc-slider";
import debounce from "lodash/debounce";

const marks = {
  500000: "5k",
  200000000: "20Cr",
};

function SearchBoxComponent({
  type,
  buyType,
  setBuyType,
  address,
  propertytype,
  rentType,
  setRentType,
  lowerrange,
  higherrange,
  propertyCallback,
  propertyTypeParam,
  addressParam,
  withOutSearch = false
}) {
  // const [dropDownTypeFlag, setDropDownTypeFlag] = useState(true);
  const [inputValue, setInputValue] = useState(address);
  const [lowerprice, setLowerprice] = useState(lowerrange);
  const [higherprice, setHigherprice] = useState(higherrange);
  const [open, setOpen] = useState(false);
  const [locationValue, setLocationValue] = useState("");
  const [locationError, setLocationError] = useState(false);
  const [propertyType, setPropertyType] = useState([]);
  const [propertyValue, setPropertyValue] = useState(propertytype || "");
  const [dropDownFlag, setDropDownFlag] = useState(false);
  const [sliderMin, setSliderMin] = useState(lowerrange);
  const [sliderMax, setSliderMax] = useState(higherrange);
  const [filterData, setFilterData] = useState([]);


  const [rentSliderMin, setRentSliderMin] = useState(lowerrange);
  const [rentSliderMax, setRentSliderMax] = useState(higherrange);
  const [sliderPrice, setSliderPrice] = useState(false);

  const [showSearch, setShowSearch] = useState("")

  const router = useRouter();

  const handleDropDown = () => {
    setDropDownFlag(!dropDownFlag);
  };



  const sliderHandleDropDown = (sliderMax, sliderMin) => {
    setSliderPrice(!sliderPrice);
    setSliderMin(sliderMin);
    setSliderMax(sliderMax)
    // if(type === "rent" || type === "Rent"){
    //   setSliderMin(sliderMin);
    //   setSliderMax(sliderMax)
    // }else{
    //   setSliderMin(sliderMin);
    //   setSliderMax(sliderMax)
    // }
  };


  const sliderDropdown = () => {
    setSliderPrice(!sliderPrice);
    setSliderMin(sliderMin);
    setSliderMax(sliderMax)
    setSliderPrice(false);
  };


  const propertyDropdownHandler = (item) => {
    setPropertyValue(item.type);
    setDropDownFlag(false);
  };

  useEffect(() => {
    setSliderMin(500000)
    setSliderMax(200000000)
  }, [])

  useEffect(() => {
    if (type === "rent") {
      setSliderMin(5000)
      setSliderMax(1000000)
    }
  }, [])

  const filterHandler = (value) => {
    setInputValue(value);
    if (!value) {
      setOpen(false);
    } else {
      setOpen(true);
      axios({
        method: "get",
        url: `/api/client/getlocation?location=${value}`,
      })
        .then((res) => {
          setFilterData(res.data);
        })
        .catch((err) => {
          return err;
        });
    }
  };

  const dropdownHandler = (item) => {

    setLocationError(false);
    setInputValue(item);
    setLocationValue(item);
    setOpen(false);
  };

  useEffect(() => {
    axios({
      method: "get",
      url: "/api/actions/propertytype",
    }).then((res) => {
      setPropertyType(res.data);
    });
  }, []);


  const initialValues = {
    location: inputValue || buyType,
    propertytype: propertyValue,
    slider: {
      min: sliderMin,
      max: sliderMax,
    },
  };

  const validationSchema = Yup.object({
    location: Yup.string().required("Please Select Location from the list"),
    propertytype: Yup.string().required(
      "Please Select Property type from the list"
    ),
  });

  const onSubmit = (values) => {
    const { location, propertytype } = values;
    let params = {
      type,
      lowerrange: values.slider.min,
      higherrange: values.slider.max,
    }
    if (location) {
      params = {
        ...params,
        address: location
      }
    }
    if (propertytype && propertytype !== '') {
      params = {
        ...params,
        propertytype: propertytype
      }
    }
    {
      axios({
        method: "get",
        url: `/api/client/getfilter`,
        params
      })
        .then((res) => {
          propertyCallback(res.data);
        })
        .catch((err) => {
          return err || null;
        });
    }
    {
      (type === "Sell" && router.pathname !== "/more/moreProperties") &&
        // router.push(
        //   `/buy?type=${type}&address=${location}&propertytype=${propertytype}&lowerrange=${values.slider.min}&higherrange=${values.slider.max}`,
        // );
        router.push({
          pathname: '/buy',
          query: params
        })
    }
    {
      (type === "Rent" &&
        router.pathname !== "/more/moreProperties") &&
        // router.push(
        //   `/rent?type=${type}&address=${location}&propertytype=${propertytype}&lowerrange=${values.slider.min}&higherrange=${values.slider.max}`
        // );
        router.push({
          pathname: '/rent',
          query: params
        })
    }
  };

  const first = useRef(true)

  const debouncedChange = useCallback(debounce(({ min, max }, values) => {
    try {
      if (first.current) {
        first.current = false
        return
      }
      setSliderMin(min);
      setSliderMax(max);
      if (withOutSearch) {
        let newVal = {
          ...values,
          type,
          slider: {
            min,
            max,
          }
        }
        onSubmit(newVal)
      }
    } catch (err) {
      console.log("SearchBoxError", JSON.stringify(err))
    }
  }, 800), [])

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {({ handleSubmit, values }) => (
          <Form>
            <div className="searchBox-main-div p-3 m-auto">
              <Row>
                <Col xs={12} lg={3} xl={4} className="pe-lg-0">
                  <div className="d-flex align-items-center py-3 box-child-div property-type-main">
                    <div className="mx-2 mb-1">
                      <RiSearchLine className="search-icon" />
                    </div>
                    <Field
                      name="location"
                      type="search"
                      placeholder="Enter Property & Location"
                      value={inputValue}
                      onChange={(e) => filterHandler(e.target.value)}
                      onBlur={() => {
                        setTimeout(() => {
                          setOpen(false);
                        }, 100);
                      }}
                      className="searchBox-input"
                      autoComplete="off"
                    />
                    {open && filterData !== "" ? (
                      <ul className="agent-dropdown-filter">
                        <>
                          {filterData.length ? (
                            filterData?.map((item, index) => (
                              <div
                                className="search-dropdown-parent d-flex"
                                key={index}
                                onClick={() => {
                                  dropdownHandler(item)
                                  if (withOutSearch) {
                                    onSubmit({
                                      ...values,
                                      type,
                                      location: item
                                    })
                                  }
                                }}
                              >
                                <div style={{ paddingLeft: "12px" }}>
                                  <div className="search-dropdown d-flex flex-column">
                                    <div
                                      className="d-flex"
                                      style={{ alignItems: "center" }}
                                    >
                                      <GrLocation
                                        style={{ fontSize: "20px" }}
                                      />
                                      <span className="table-item">
                                        <div>{item}</div>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div>No location found</div>
                          )}
                        </>
                      </ul>
                    ) : (
                      ""
                    )}
                  </div>
                  <ErrorMessage
                    className="text-danger"
                    name="location"
                    component="div"
                  />
                  {locationError && (
                    <div name="location" className="text-danger">
                      Please select Location from list
                    </div>
                  )}
                </Col>
                <Col
                  xs={12}
                  lg={3}
                  className="mt-2 mt-lg-0 pe-lg-0 property-type-col"
                >
                  <div className=" p-3 px-2 box-child-div">
                    <Row className="property-type-main">
                      <Col xs={7}>
                        <div className="d-flex align-items-center w-100 ">
                          <div className="p-0">
                            <div className=" me-2 mb-1">
                              <VscHome className="home-icon" />
                            </div>
                          </div>
                          <div className="p-0">
                            <Field
                              type="text"
                              name="propertytype"
                              className="searchBox-input"
                              placeholder="Property Type"
                              value={propertyValue}
                              style={{ border: 0, backgroundColor: "#F8F8F8" }}
                              onClick={handleDropDown}
                              onBlur={() => {
                                setTimeout(() => {
                                  setDropDownFlag(false);
                                }, 100);
                              }}
                              autoComplete="off"
                            />
                          </div>
                        </div>
                      </Col>
                      <Col xs={4} className="pe-0">
                        <div
                          className="p-0 text-end me-2"
                          onClick={handleDropDown}
                          onBlur={() => {
                            setTimeout(() => {
                              setDropDownFlag(false);
                            }, 100);
                          }}
                        >
                          <MdKeyboardArrowDown className="arrow-icon " />
                        </div>
                      </Col>
                      {dropDownFlag && (
                        <div
                          className="cus-dropdown p-4"
                          style={{ zIndex: 100 }}
                        >
                          {propertyType.map((p, k) => {
                            return (
                              <>
                                <div key={k}>
                                  <div
                                    onClick={() => {
                                      propertyDropdownHandler(p)
                                      if (withOutSearch) {
                                        onSubmit({
                                          ...values,
                                          type,
                                          propertytype: p.type
                                        })
                                      }
                                    }}
                                  >
                                    {p.type}
                                  </div>
                                </div>
                              </>
                            );
                          })}
                        </div>
                      )}
                    </Row>
                  </div>
                  <ErrorMessage
                    className="text-danger"
                    name="propertytype"
                    component="div"
                  />
                </Col>

                {/*------------------ monika changes------------------- */}
                <Col xs={12} lg={3} className="pe-lg-0 ">

                  <Row className="property-type-main">
                    <Col xs={12} lg={12}>
                      {/* className=d"-grid position-relative slider-main-div" */}
                      <div className="p-3 px-2 box-child-div" >
                        {(type === "Sell" || type === "buy") && (
                          <>
                            <div className="slider_box ">
                              <Field
                                type="text"
                                name="propertytype"
                                className="searchBox-input text-center"
                                placeholder="slider-price"
                                value={`₹  ${sliderMin}  :  ₹  ${sliderMax}`}
                                style={{ border: 0, backgroundColor: "#F8F8F8" }}
                                onClick={() => sliderHandleDropDown(sliderMax, sliderMin)}
                                onBlur={() => {
                                  setTimeout(() => {
                                    setDropDownFlag(false);
                                  }, 100);
                                }}
                                autoComplete="off"
                              />
                            </div>
                          </>
                        )}
                        {(type === "rent" || type === "Rent") && (
                          <div className="slider_box ">
                            <Field
                              type="text"
                              name="propertytype"
                              className="searchBox-input text-center"
                              placeholder="slider-price"
                              value={`₹  ${sliderMin}  :  ₹  ${sliderMax}`}
                              style={{ border: 0, backgroundColor: "#F8F8F8" }}
                              onClick={() => sliderHandleDropDown(sliderMax, sliderMin)}
                              onBlur={() => {
                                setTimeout(() => {
                                  setDropDownFlag(false);
                                }, 100);
                              }}
                              autoComplete="off"
                            />
                          </div>
                        )}
                      </div>
                    </Col>
                    {sliderPrice && (
                      <>
                        <div
                          className="cus-dropdown p-4 mt-0 "
                          style={{ zIndex: 100 }}
                        >
                          <div className=" py-3 d-grid position-relative slider-main-div" onClick={sliderDropdown}>
                            {(type === "Sell" || type === "buy") && (
                              <>
                                <MultiRangeSlider
                                  type="buy"
                                  name="slider"
                                  min={500000}
                                  max={200000000}
                                  defaultMin={sliderMin}
                                  defaultMax={sliderMax}
                                  // onChange={({ min, max }) => {
                                  //   setSliderMin(min);
                                  //   setSliderMax(max);
                                  // }}
                                  onChange={(e) => debouncedChange(e, values)}

                                />
                              </>
                            )}
                            {(type === "rent" || type === "Rent") && (
                              <MultiRangeSlider
                                type="buy"
                                name="slider"
                                min={5000}
                                max={1000000}
                                //  defaultMin={sliderMin}
                                //  defaultMax={sliderMax}
                                // onChange={({ min, max }) => {
  
                                //   setSliderMin(min);
                                //   setSliderMax(max);
                                // }}
                                onChange={(e) => debouncedChange(e, values)}

                              />
                              // <MultiRangeSlider
                              //   type="rent"
                              //   name="slider"
                              //   min={5000}
                              //   max={1000000}
                              //   // defaultMin={lowerrange}
                              //   // defaultMax={higherrange}
                              //   // defaultMin={sliderMin}
                              //   // defaultMax={sliderMax}
                              //   // onChange={({ min, max }) => {
                              //   //   setSliderMin(min);
                              //   //   setSliderMax(max);
                              //   // }}
                              //   onChange={(e) => debouncedChange(e, values)}
                              // />
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </Row>
                </Col>
                {router.pathname === '/'
                  ?
                  <Col
                    xs={12}
                    lg={3}
                    xl={2}
                    className="text-center text-lg-end search-btn-padding"
                  >
                    <ButtonComponent
                      text="Search"
                      style="px-5 py-3"
                      type="submit"
                    />
                  </Col> : null}
              </Row>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SearchBoxComponent;
