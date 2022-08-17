import Image from 'next/image';
import React from 'react'
import Spinner from 'react-bootstrap/Spinner';
import loader from '/public/images/loader.gif'

function SpinnerComponent() {
  return (
    <Image src={loader} height="100" width="100" alt="loading"/>
  )
}

export default SpinnerComponent