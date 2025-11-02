import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/auth/login", { email, password });
      localStorage.setItem("token", res.data.token); 
      alert("Login successful!");
      navigate("/user"); 
    } catch (err) {
      alert(err.response?.data?.message || "Error logging in");
    }
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
    <Form onSubmit={handleLogin}>
      <h2>Login</h2>
      
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Login
        </Button>
      
      <p className="mt-3">
        New here? <Link to="/">Register now</Link>
      </p>
    </Form>
    </div>
    </div>
  );
};

export default Login;
