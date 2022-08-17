import React from 'react'
import { BsChevronRight } from 'react-icons/bs'
import { useRouter } from "next/router"
import Breadcrumbs from "nextjs-breadcrumbs";


function SubHeader(subHeaderData) {
    const router = useRouter()

    const subHeaderMenu = [
        {
            path: "/",
            name: "Home",
            icon: <BsChevronRight />,
        },
        {
            path: "/rent",
            name: "Rent",
            icon: <BsChevronRight />,
        },

        {
            path: "/buy",
            name: "Buy",
            icon: <BsChevronRight />,
        },

    ];


    return (
        <>
            <div className='subHeader_div d-md-none' style={{ height: "50px", backgroundColor: "#FFFFFF", }}>
                <Breadcrumbs
                    useDefaultStyle
                    rootLabel="Home"
                    activeItemClassName="brActive"
                />
            </div>
        </>
    )
}

export default SubHeader








