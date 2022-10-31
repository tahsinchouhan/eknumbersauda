import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { FiMenu } from "react-icons/fi";
import logo from "../public/images/logo1.jpg";
import ButtonComponent from "./button/buttonComponent";
import Rent from "./commonComponent/modal/rentOne";

export default function Header() {
  const router = useRouter();

  const { slug } = router.query;

  const [modalOpen, setModalOpen] = useState(false); // MODAL STATE TRUE FALSE
  const [serviceActive, setServiceActive] = useState(0);
  const [serviceBox, setServiceBox] = useState(false);

  const activeHandler = (index) => {
    setServiceActive(index);
    setServiceBox(true);
  };

  const handleClose = () => setModalOpen(false); // MODAL STATE SET FALSE
  const handleOpen = () => setModalOpen(true); // MODAL STATE SET TRUE

  const [expand, setExpand] = useState(false);

  const navHandleClose = () => setExpand(false);
  const navHandleShow = () => setExpand("expanded");

  // const testimonialRef = useRef('testimonials')

  // const testimonialsScroll = () => {
  //   testimonialRef.current.scrollIntoView({ behavior: "smooth" });
  //   // router.push({
  //   pathname: '#testimonials',
  //   asPath:'#testimonials',
  //   query: { testimonialRef:testimonialRef},
  // })
  // };

  // useEffect(() => {
  //   if ( testimonialRef.current) {
  //     testimonialsScroll();
  //   }
  // },[ testimonialRef]);

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="paridhi_header d-none d-lg-block"
      >
        <Container>
          <Navbar.Brand className="me-0 logo-brand" href="#home">
            <div className="img-logo">
              <Link href="/">
                <Image src={logo} alt="logo" height={60} width={180} />
              </Link>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            style={{ justifyContent: " space-between" }}
          >
            <Nav className="mx-auto justify-content-around align-items-center w-75">
              <div className=" active-link-div sm-mb-5 ">
                <Link href="/">
                  <p className={router.pathname === "/" ? "active " : ""}>
                    Home
                  </p>
                </Link>
                <div className="small-line "></div>
              </div>
              <div className="active-link-div sm-mb-5">
                <Link href="/buy">
                  <p className={router.pathname === "/buy" ? "active " : ""}>
                    Buy
                  </p>
                </Link>
                <div className="small-line "></div>
              </div>
              <div className=" active-link-div sm-mb-5">
                <Link href="/rent">
                  <p className={router.pathname === "/rent" ? "active " : ""}>
                    Rent
                  </p>
                </Link>
                <div className="small-line "></div>
              </div>

              <div className="active-link-div">
                <Link href="/#testimonials">
                  <p
                    className={
                      router.pathname === "/#testimonials" ? "active" : ""
                    }
                  >
                    Testimonials
                  </p>
                </Link>
                <div className="small-line "></div>
              </div>
              <div className="active-link-div">
                <Link href="/#services">
                  <p
                    className={
                      router.pathname === "/common/services" ? "active" : ""
                    }
                  >
                    Services
                  </p>
                </Link>
                <div className="small-line "></div>
              </div>
              <div className=" active-link-div">
                <Link href="/#about">
                  <p className={router.pathname === "/#about" ? "active " : ""}>
                    About us
                  </p>
                </Link>
                <div className="small-line "></div>
              </div>
              <div className=" active-link-div">
                <Link href="/#contact">
                  <p
                    className={
                      router.pathname === "/common/contact" ? "active " : ""
                    }
                  >
                    Contact us
                  </p>
                </Link>
                <div className="small-line "></div>
              </div>
            </Nav>
            <Nav>
              <div
                className="text-center mt-lg-0 mt-md-3 ms-lg-0 ms-md-2"
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                <ButtonComponent text="Post Property" style="px-4 py-2" />
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {modalOpen && <Rent show={handleOpen} close={handleClose} />}
      <div className="mobile_view_home d-lg-none">
        <Navbar className="d-block" expanded={expand}>
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
            // expanded={expand}
          >
            <Offcanvas.Header closeButton onClick={navHandleClose}>
              <Navbar.Brand className="me-0 logo-brand">
                <div className="img-logo">
                  <Link href="/">
                    <Image src={logo} alt="logo" />
                  </Link>
                </div>
              </Navbar.Brand>
            </Offcanvas.Header>
            <Offcanvas.Body onClick={navHandleClose}>
              <Nav className="mx-auto justify-content-around align-items-center w-75">
                <div className=" active-link-div sm-mb-5 ">
                  <Link href="/">
                    <p className={router.pathname === "/" ? "active " : ""}>
                      Home
                    </p>
                  </Link>
                  <div className="small-line "></div>
                </div>
                <div className="   active-link-div sm-mb-5">
                  <Link href="/buy">
                    <p className={router.pathname === "/buy" ? "active " : ""}>
                      Buy
                    </p>
                  </Link>
                  <div className="small-line "></div>
                </div>
                <div className=" active-link-div sm-mb-5">
                  <Link href="/rent">
                    <p className={router.pathname === "/rent" ? "active " : ""}>
                      Rent
                    </p>
                  </Link>
                  <div className="small-line "></div>
                </div>
                <div className=" active-link-div">
                  <Link href="/#testimonials">
                    <p
                      className={
                        router.pathname === "/common/testimonials"
                          ? "active"
                          : ""
                      }
                    >
                      Testimonials
                    </p>
                  </Link>
                  <div className="small-line "></div>
                </div>
                <div className=" active-link-div">
                  <Link href="/#services">
                    <p
                      className={
                        router.pathname === "/common/services" ? "active" : ""
                      }
                    >
                      Services
                    </p>
                  </Link>
                  <div className="small-line "></div>
                </div>
                <div className=" active-link-div">
                  <Link href="/#about">
                    <p
                      className={router.pathname === "/#about" ? "active " : ""}
                    >
                      About us
                    </p>
                  </Link>
                  <div className="small-line "></div>
                </div>
                <div className=" active-link-div">
                  <Link href="/#contact">
                    <p
                      className={
                        router.pathname === "/common/contact" ? "active " : ""
                      }
                    >
                      Contact us
                    </p>
                  </Link>
                  <div className="small-line "></div>
                </div>
              </Nav>
              <Nav>
                <div
                  className="text-center mt-lg-0 mt-md-3 ms-lg-0 ms-md-2"
                  onClick={() => {
                    setModalOpen(true);
                  }}
                >
                  <ButtonComponent text="Post Property" style="px-4 py-2" />
                </div>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          <div className="d-flex justify-content-between">
            <div className="img-logo ms-2">
              <Link href="/">
                <Image src={logo} alt="logo" />
              </Link>
            </div>
            <span className="me-4 fs-5 mt-2" onClick={() => navHandleShow()}>
              <FiMenu />
            </span>
          </div>
        </Navbar>
      </div>
    </>
  );
}
