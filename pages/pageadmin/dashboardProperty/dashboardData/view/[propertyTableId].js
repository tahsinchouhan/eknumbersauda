import React from "react";
import PropertyForm from "../../../../../components/Property/PropertyForm";
import{useRouter} from "next/router"
function PropertyTable() {
 
  return (
    <PropertyForm viewMode={true} />
  );
}

export default PropertyTable;
