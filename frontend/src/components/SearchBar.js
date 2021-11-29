import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const history = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const searchTerm = event.target.elements.search.value;
    const searchQuery = encodeURIComponent(searchTerm);
    history.push(`/search?q=${searchQuery}`);
  }

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
            name="search"
          />
        </InputGroup>
      </Form.Group>
    </Form>
  );
};
export default SearchBar;
