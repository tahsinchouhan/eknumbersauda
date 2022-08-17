import { useState, useEffect} from 'react';
import Header from './navbar'
import Footer from './footer'
import { useRouter } from "next/router"
import { ToastContainer } from "react-toastify";

export default function Layout({ children }) {
  const router = useRouter()
  const url = router.pathname
  const [authUrl, setAuthUrl] = useState(true)

  useEffect(() => {
    if (url.includes("/pageadmin")) {
      setAuthUrl(false)
    }
  }, [url])

  
  // localStorage.getItem('login')

  return (
    <>
      <ToastContainer />
      {authUrl === true ? <Header  /> : null}
      <main>{children}</main>
      {authUrl === true ? <Footer /> : null}

    </>
  )
}