import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const searchRef = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchQuery = encodeURIComponent(searchRef.current.value);
    searchRef.current.value = "";
    navigate(`/search?keyword=${searchQuery}`);
  };

  return (
    <Form onSubmit={handleSubmit} className="form-inline w-100" role="search">
      <Form.Group
        className="w-100 mb-0 rounded-pill border-0 px-3"
        style={{ backgroundColor: "rgb(233,236,239)" }}
      >
        <InputGroup className="w-100">
          <InputGroup.Text>
            <FontAwesomeIcon icon={faSearch} />
          </InputGroup.Text>
          <Form.Control
            style={{ backgroundColor: "rgb(233,236,239)" }}
            size="sm"
            type="search"
            placeholder="Search posts, #hashtags, or @users"
            ref={searchRef}
          />
        </InputGroup>
      </Form.Group>
    </Form>
  );
};
export default SearchBar;
