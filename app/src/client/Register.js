import { useState } from "react";
import Axios from "axios";
function Register() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [ccnum, setCcnum] = useState("");
  const [cvv, setCvv] = useState("");
  const [expdate, setExpdate] = useState("");
  const [location, setLocation] = useState("");
  const [isOwner, setIsOwner] = useState(true);

  const registerClient = () => {
    if (password !== passwordConfirm) {
      alert("password missmatch");
      return;
    }

    if (isOwner) {
      Axios.post("http://localhost:4000/register-owner", {
        fname: fname,
        lname: lname,
        email: email,
        password: password,
        phone: phone,
      }).then((res) => {
        console.log(res);
      });
    } else {
      Axios.post("http://localhost:4000/register-customer", {
        fname: fname,
        lname: lname,
        email: email,
        password: password,
        phone: phone,
        ccnum: ccnum,
        cvv: cvv,
        exp: expdate,
        location: location,
      }).then((res) => {
        console.log(res);
      });
    }
  };
  return (
    <div class="Registration">
      <center>
        <h1>Register</h1>
        <hr />
        <form>
          First Name:
          <input
            type="text"
            name="fname"
            onChange={(event) => {
              setFname(event.target.value);
            }}
          />
          <br />
          Last Name:
          <input
            type="text"
            name="lname"
            onChange={(event) => {
              setLname(event.target.value);
            }}
          />
          <br />
          Phone number:
          <input
            type="text"
            name="phone"
            onChange={(event) => {
              setPhone(event.target.value);
            }}
          />{" "}
          <br />
          Email:
          <input
            type="text"
            name="email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <br />
          Password:
          <input
            type="password"
            name="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <br />
          Confirm Password:
          <input
            type="password"
            name="confirm"
            onChange={(event) => {
              setPasswordConfirm(event.target.value);
            }}
          />
          <br />
          <hr />
          <label>
            <input
              type="radio"
              name="owner-register"
              checked={isOwner}
              onChange={() => {
                setIsOwner(!isOwner);
              }}
              className="radio-button"
            />
            register as Owner
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="customer-register"
              checked={!isOwner}
              onChange={() => {
                setIsOwner(!isOwner);
              }}
              className="radio-button"
            />
            register as Customer
          </label>
          <hr />
          {!isOwner && (
            <label>
              credit card number:{" "}
              <input
                type="text"
                name="cardNumber"
                onChange={(event) => {
                  setCcnum(event.target.value);
                }}
              />
            </label>
          )}
          <br />
          {!isOwner && (
            <label>
              CVV:{" "}
              <input
                type="text"
                name="cvv"
                onChange={(event) => {
                  setCvv(event.target.value);
                }}
              />
            </label>
          )}
          <br />
          {!isOwner && (
            <label>
              Exp date:{" "}
              <input
                type="text"
                name="exp"
                onChange={(event) => {
                  setExpdate(event.target.value);
                }}
              />
            </label>
          )}
          <br />
          {!isOwner && (
            <label>
              Location:{" "}
              <input
                type="text"
                name="location"
                onChange={(event) => {
                  setLocation(event.target.value);
                }}
              />
            </label>
          )}
        </form>
        <hr />
        <br />

        <button onClick={registerClient}>Create Account</button>
      </center>
    </div>
  );
}

export default Register;
