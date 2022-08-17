import React, { useState, useEffect } from 'react'
import AdminDashboard from '../../components/admin/adminDashboard'
import { useRouter } from "next/router"

function PagesAdminDashboard() {
// const router=useRouter()

//     useEffect(() => {
//         const login= JSON.parse(localStorage.getItem("login"))
//         if(!login){
//           router.push("/pageadmin")
//         }
//        }, [])
   
    return (
        <div>
            <AdminDashboard />
        </div>
    )
}

export default PagesAdminDashboard;
