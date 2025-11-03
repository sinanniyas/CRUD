import React, { useState } from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://crud-wqs3.onrender.com/auth/register", {
        username,
        email,
        password,
      });
      alert("Registered successfully!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Error registering");
    }
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Form onSubmit={handleRegister}>
          <h2>Register</h2>

          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>
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
            Register
          </Button>
          <div className="w-50 mt-3 m-auto">
            <GoogleLogin
  onSuccess={async (credentialResponse) => {
    const id_token = credentialResponse.credential;
    console.log("Google token:", id_token);
    try {
      const res = await axios.post(
        "https://crud-wqs3.onrender.com/auth/google",
        { token: id_token }   // ✅ send correct token
      );
      console.log("Logged in user:", res.data);
      alert(`Welcome ${res.data.user.name}`);
      navigate("/user");
    } catch (err) {
      console.error("Backend auth error", err?.response?.data || err);
      alert("Google login failed");
    }
  }}
  onError={() => console.log("Login Failed")}
/>

          </div>

          <p className="mt-3">
            Already registered? <Link to="/login">Login here</Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Register;
