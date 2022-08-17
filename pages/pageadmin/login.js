import React from 'react'
import AdminLogin from '../../components/admin/adminLogin'

function Login({status}) {
    return (
        <div>
         <AdminLogin status={status}/>
        </div>
    )
}

export default Login
