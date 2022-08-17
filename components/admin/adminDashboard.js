import Router from 'next/router';
import React,{useEffect} from 'react';
import DashboardData from '../../pages/pageadmin/dashboardProperty/dashboardData/dashboardData';

function AdminDashboard() {

 useEffect(() => {
  const login= JSON.parse(localStorage.getItem("login"))
  if(!login){
    Router.push("/pageadmin")
  }
 }, [])
 
 
  return (
    <>
      <DashboardData/>
    </>
  )
}

export default AdminDashboard