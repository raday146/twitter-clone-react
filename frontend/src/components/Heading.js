import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
//import BackButton from "./BackButton";
import ButtonProfile from "./ButtonProfile";
import LogoutButton from "./LogoutButton";

const Heading = (props) => {
  const { title, btnLogout, btnProfile } = props;
  const isMobile = useMediaQuery({ query: "(max-width: 571px)" });
  const [mobileMode, setMobileMode] = useState(false);

  useEffect(() => {
    if (isMobile) {
      console.log("isMobile");
      setMobileMode(isMobile && btnProfile);
    } else {
      setMobileMode(false);
    }
  }, [btnProfile, isMobile]);
  return (
    <div className="d-flex justify-content-between border-bottom  bg-white align-items-center">
      <Row className="d-flex align-items-center">
        <Col>
          {mobileMode && <ButtonProfile />}
          <h5 className={` ${!mobileMode ? "my-3" : ""} mx-2 font-weight-bold`}>
            {title}
          </h5>
        </Col>
      </Row>
      {btnLogout && <LogoutButton />}
    </div>
  );
};
export default Heading;
//          {backButton && <BackButton />}
