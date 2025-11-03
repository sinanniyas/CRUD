import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [age, setage] = useState();
  const navigate =useNavigate()

  const submit = (e) => {
    e.preventDefault();
    axios
      .post("https://crud-wqs3.onrender.com/createuser", { name, email, age })
      .then(result =>{  console.log(result)
        navigate('/user')
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Form onSubmit={submit}>
          <h2>Add User</h2>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              onChange={(e) => setname(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              onChange={(e) => setemail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Age"
              onChange={(e) => setage(e.target.value)}
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

export default CreateUser;
