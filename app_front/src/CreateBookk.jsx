import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [pages, setPages] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/createb", { title, name, price, pages })
      .then((result) => {
        console.log(result);
        navigate("/books");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Form onSubmit={submit}>
          <h2>Add Book</h2>

          <Form.Group className="mb-3">
            <Form.Label>Book Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter book title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Author Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter author name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Pages</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter number of pages"
              onChange={(e) => setPages(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreateBook;
