import React from 'react'
import Link from "next/link"
import { BiHomeAlt } from "react-icons/bi";

function ServiceBox({onClose,serviceBox,setServiceBox}) {
    return (
        <>
        {serviceBox === true ?
            <div>
                <div className='services_box mt-4 ms-0  'onClick={()=>setServiceBox(false)}>

                    <div className='d-flex justify-content-evenly' >
                        <BiHomeAlt className='mt-2'/>

                        <Link href="/">
                            <span>Construction</span>
                        </Link>
                    </div>
                    <div className='d-flex justify-content-evenly'>
                        <BiHomeAlt className='mt-2'/>

                        <Link href="/">
                            <span>Construction</span>
                        </Link>
                    </div>
                    <div className='d-flex justify-content-evenly'>
                        <BiHomeAlt className='mt-2'/>

                        <Link href="/">
                            <span>Construction</span>
                        </Link>
                    </div>
                    <div className='d-flex justify-content-evenly'>
                        <BiHomeAlt className='mt-2' />

                        <Link href="/">
                            <span>Construction</span>
                        </Link>
                    </div>
                    <div className='d-flex justify-content-evenly'>
                        <BiHomeAlt className='mt-2'/>

                        <Link href="/">
                            <span>Construction</span>
                        </Link>
                    </div>
                   
                </div>
            </div>
           : "" }
        </>
    )
}

export default ServiceBox