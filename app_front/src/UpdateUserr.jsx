import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";

const Updateuser = () => {
  const { id } = useParams();

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [age, setage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://crud-wqs3.onrender.com/getUser/' + id)
      .then((result) => {console.log(result.data)
      setname(result.data.name)
      setemail(result.data.email)
      setage(result.data.age)})
  }, []);

  const update = (e) =>{
    e.preventDefault();
  axios
  .put('https://crud-wqs3.onrender.com/updateUser/' + id, { name, email, age })
  .then(result => {  
    console.log(result);
    navigate('/user');
  })
  .catch((err) => console.log(err));


  } 
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Form onSubmit={update}>
          <h2>Update User</h2>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setname(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPasswo">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setemail(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEma">
            <Form.Label>Age</Form.Label>
            <Form.Control type="number" placeholder="Enter Age" value={age} onChange={(e) => setage(e.target.value)}/>
          </Form.Group>

          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Updateuser;
