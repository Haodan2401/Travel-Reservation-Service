import { Link } from "react-router-dom";
import React, { useState } from "react";
import Axios from "axios";
import currentDate from "./data";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  const check = () => {
    setIsAdmin(false);
    setIsCustomer(false);
    setIsOwner(false);
    Axios.get("http://localhost:4000/get-admins").then((res) => {
      res.data.forEach((val) => {
        if (val.Email === email && val.Pass === password) {
          setIsAdmin(true);
          currentDate.email = email;
        }
      });
    });
    Axios.get("http://localhost:4000/get-customers").then((res) => {
      res.data.forEach((val) => {
        if (val.Email === email && val.Pass === password) {
          setIsCustomer(true);
          currentDate.email = email;
        }
      });
    });
    Axios.get("http://localhost:4000/get-owners").then((res) => {
      res.data.forEach((val) => {
        if (val.Email === email && val.Pass === password) {
          setIsOwner(true);
          currentDate.email = email;
        }
      });
    });
  };

  return (
    <div className="Login">
      <center>
        <h1>Log In</h1>
        <form>
          Email:
          <br />
          <input
            type="text"
            name="email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <br />
          Password:
          <br />
          <input
            type="text"
            name="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <br />
        </form>
        <br />
        <button onClick={check}>check</button>
        <br />
        {isAdmin && (
          <button>
            <Link to="/admin-home">login as admin</Link>
          </button>
        )}
        {isCustomer && (
          <button>
            <Link to="/customer-home">login as customer</Link>
          </button>
        )}
        {isOwner && (
          <button>
            <Link to="/owner-home">login as owner</Link>
          </button>
        )}
        <p>Not signed up?</p>
        <button>
          <Link to="/register">Register</Link>
        </button>
      </center>
    </div>
  );
}

export default Login;
