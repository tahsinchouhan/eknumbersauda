import React from "react";
import CardComponet from "../../../components/commonComponent/CardComponent";
import CardImg from "../../../public/images/CardImg.png";

function BookViewProperty() {
  const data = [
    {
      id: 1,
      propertiFor: "For sell",
      img: "/public/images/CardImg.png",
      flatName: "Beach Villa",
      location: "Korba Chhattisgrah",
      bed: "2 Beds",
      bath: "1 Bath",
      flatSize: "1200 Sq ft",
      price: "₹ 120000",
    },
  ];
  return (
    <>
      <div className="w-25 mx-auto">
        <CardComponet
          propertiFor={data.propertiFor}
          img={CardImg}
          flatName={data.flatName}
          location={data.location}
          bed={data.bed}
          bath={data.bath}
          flatSize={data.flatSize}
          price={data.price}
        />
      </div>
    </>
  );
}

export default BookViewProperty;
