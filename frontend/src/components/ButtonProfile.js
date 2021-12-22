import React, { useEffect } from "react";
import { Figure, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthUser } from "../context/authContext";

const ButtonProfile = () => {
  const { currentUser } = useAuthUser();

  useEffect(() => {
    if (!currentUser) {
      return null;
    }
  }, [currentUser]);

  return (
    <Row className="p-2">
      <Link to={`/user/${currentUser?.user?.name}`}>
        <Figure
          className="bg-border-color rounded-circle overflow-hidden my-auto "
          style={{
            height: "35px",
            width: "35px",
          }}
        >
          <Figure.Image src={currentUser?.user?.avatar} />
        </Figure>
      </Link>
    </Row>
  );
};
export default ButtonProfile;
//d-flex align-items-end
