import React,{useState,useEffect} from "react";
import PagesAdminDashboard from "./dashboard";
import Login from './login';

function Test() {
  // const [flag, setFlag] = useState(false);
  // const status = (value) => {
  //   setFlag(value);
  // };
  
    const[showAdmin,setShowAdmin]=useState(false)

  const status = (value) => {
    setShowAdmin(value);
    };
    
    // useEffect(() =>
    // {
    //     const user = JSON.parse(localStorage.getItem("login"));
    //     if (user) {
    //       setShowAdmin(user)
    //     }
    // }, [])

  return (
    <>
    <div>
      {showAdmin ? <PagesAdminDashboard/>:<Login status={status}/>}
      </div>
    </>
  );
}

export default Test;
