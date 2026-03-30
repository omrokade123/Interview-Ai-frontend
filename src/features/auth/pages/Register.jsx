import React, { useState } from "react";
import {Link, useNavigate} from 'react-router';
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const {loading,handleRegister} = useAuth();
  const navigate = useNavigate();


  const [username, setusername] = useState("");
  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async(e) => {
    e.preventDefault();
    await handleRegister({username,email,password});
    navigate("/");
  };
  if (loading) {
    return (
      <main className="loading-screen">
        <div className="loading-screen__spinner" />
        <p>Loading…</p>
      </main>
    );
  }
  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">UserName</label>
            <input
              onChange={(e)=>{setusername(e.target.value)}}
              type="username"
              id="username"
              name="username"
              placeholder="Enter username"
            ></input>
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e)=>{setEmail(e.target.value)}}
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address"
            ></input>
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e)=>{setPassword(e.target.value)}}
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
            ></input>
          </div>
          <button className="button primary-button">Register</button>
        </form>
        <p>Already have an account?<Link to={"/login"}>Login</Link></p>
      </div>
    </main>
  );
};

export default Register;
