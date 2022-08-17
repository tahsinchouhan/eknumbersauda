import React, { useState, useEffect } from "react";

import {
  Container,
  Row,
  Col,
  Card,
  InputGroup,
  Form,
  Dropdown,
  NavDropdown,
  Tabs,
  Tab,
} from "react-bootstrap";
import { MOCK_PROPERTY_TYPE_DATA } from "../../../utils/constants";
import { VscHome } from "react-icons/vsc";
import { MdKeyboardArrowDown } from "react-icons/md";

import { RiSearchLine } from "react-icons/ri";
import ButtonComponent from "../../button/buttonComponent";
import MultiRangeSlider from "./multiRangSlider";
import SearchBoxComponent from "./searchBoxComponent";

function SearchBox({ propertyCallback, withOutSearch = false }) {
  // const [dropDownTypeFlag, setDropDownTypeFlag] = useState(true);
  const [type, setType] = useState("Sell");

  const [dropDownFlag, setDropDownFlag] = useState(false);

  const handleDropDown = () => {
    setDropDownFlag(!dropDownFlag);
  };

  const handleSelect = (key) => {
    if (key === "buy") {
      setType("Sell");
    }
    if (key === "rent") {
      setType("Rent");
    }
  };
  return (
    <div>
      <div className="m-auto searchBox-div">
        <Tabs
          justify
          defaultactivekey="buy"
          id="uncontrolled-tab-example"
          className="tabs-div"
          onSelect={handleSelect}
        >
          <Tab
            defaultactivekey="buy"
            eventKey={"buy"}
            title="BUY"
            className="best_real_nav"
          >
            <SearchBoxComponent type={type} propertyCallback={propertyCallback } withOutSearch={withOutSearch} />
          </Tab>
          <Tab defaultactivekey="rent" eventKey={"rent"} title="RENT">
            <SearchBoxComponent type={type} propertyCallback={propertyCallback } withOutSearch={withOutSearch} />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default SearchBox;
