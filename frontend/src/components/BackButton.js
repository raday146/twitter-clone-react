import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const history = useNavigate();

  return (
    <button
      onClick={history.goBack}
      className="ml-2 btn btn-naked-primary rounded-circle text-primary"
    >
      <FontAwesomeIcon icon={faArrowLeft} size="lg" />
    </button>
  );
}
