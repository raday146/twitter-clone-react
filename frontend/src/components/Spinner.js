import React from "react";
import { Spinner as LoadingSpinner, Col } from "react-bootstrap";

const Spinner = () => {
  return (
    <Col className="d-flex justify-content-center py-5">
      <LoadingSpinner variant="primary" animation="border" role="status" />
    </Col>
  );
};
export default Spinner;
