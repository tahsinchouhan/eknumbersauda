import React from "react";
import { Button } from "react-bootstrap";

export default function ButtonComponent(secondBtn) {
  return (
    <>
      <div>
        <Button
          className={`${secondBtn.style} card_view_property `}
          type={secondBtn.type}
          onClick={secondBtn.clickOnButton}
        >
         {secondBtn.icon}
          {secondBtn.text}
        </Button>
      </div>
    </>
  );
}
