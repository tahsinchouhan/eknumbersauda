import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import logo from "../public/images/logo1.jpg";
import Rent from "./commonComponent/modal/rentOne";

export default function Footer() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleClose = () => setModalOpen(false); // MODAL STATE SET FALSE
  const handleOpen = () => setModalOpen(true); // MODAL STATE SET TRUE

  return (
    <>
      <div className="footer">
        <div className=" container">
          <Row className=" my-lg-5 p-1 py-lg-5 text-center text-lg-start">
            <Col lg={3} md={12} className="my-2 my-lg-0 ">
              <div>
                <Image
                  src={logo}
                  alt="Paridhi-Group Logo"
                  width={160}
                  height={60}
                />
                <p className="footer-para pt-2 m-auto m-lg-0 w-75">
                  We commited to ensuring digital accessbility for individuals
                </p>
              </div>
            </Col>
            <Col md={12} lg={{ span: 2, offset: 1 }} className="my-2 my-lg-0 ">
              <h5 className="fw-bold"> Important Link </h5>
              <p className="mb-2 footer-text">
                <Link href="/#"> Search Property </Link>
              </p>
              <p className="mb-2 footer-text">
                <Link href="/buy"> Buy Property </Link>
              </p>
              <p
                className="mb-2 footer-text"
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                Rent Property
                {/* <Link href="/rent">Rent Property </Link> */}
              </p>
              <p
                className="mb-2 footer-text"
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                Sell Property
                {/* <Link href="/">Sell Property </Link> */}
              </p>
            </Col>
            <Col lg={2} md={12} className="my-2 my-lg-0 ">
              <h5 className="fw-bold footer-text"> About </h5>
              <p className="mb-2">
                <Link href="/#about">About Us </Link>
              </p>
              <p className="mb-2 footer-text">
                <Link href="/termsOfServices ">Terms of Services </Link>
              </p>
              <p className="mb-2 footer-text">
                <Link href="/termsConditions">Terms &amp; Conditions</Link>
              </p>
              <p className="mb-2 footer-text">
                <Link href="/privacyPolicy">Privacy Policy </Link>
              </p>
            </Col>
            <Col lg={4} md={12} className="my-2 my-lg-0">
              <h5 className="fw-bold"> Our Address </h5>
              <p className="mb-2">
                Infront of KPS Junior School, St. Xavier's School Road, Avanti
                Vihar Raipur C.G.
              </p>
              <p className="mb-2">Çontact: +91-7000028760</p>
              <div className="d-flex justify-content-lg-start justify-content-center my-4">
                <div className="icon-div rounded-circle me-2">
                  <Link href="https://www.facebook.com/facebook">
                    <FaFacebook />
                  </Link>
                </div>
                <div className="icon-div rounded-circle mx-2">
                  <Link href="https://www.instagram.com/instagram">
                    <FaInstagram />
                  </Link>
                </div>
                <div className="icon-div rounded-circle mx-2">
                  <Link href="https://twitter.com/twitter">
                    <FaTwitter />
                  </Link>
                </div>
                <div className="icon-div rounded-circle mx-2">
                  <Link href="https://www.youtube.com/yuotube">
                    <FaYoutube />
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {/* --------------------------------Copyright-section----------------------------- */}

        <div className="copyright-section text-center py-3 mt-5">
          Copyright &copy;Paridhi group Inc. 2022. All right reserved
        </div>
      </div>
      {modalOpen && <Rent show={handleOpen} close={handleClose} />}
    </>
  );
}
