import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function OwnerAddProperty() {
  const [pname, setPname] = useState("");
  const [oemail, setOemail] = useState("");
  const [desp, setDesp] = useState("");
  const [cost, setCost] = useState(0.0);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState(0);
  const [nearestAirport, setNearestAirport] = useState("");
  const [distAirport, setDisAirport] = useState("");
  const [capacity, setCapacity] = useState(0);



  const addProperty = () => {
    Axios.post("http://localhost:4000/add-property", {
      pname: pname,
      oemail: oemail,
      desp: desp,
      cost: cost,
      street: street,
      capacity: capacity,
      city: city,
      state: state,
      zip: zip,
      nearestAirport: nearestAirport,
      distAirport: distAirport,
    }).then(() => {
      console.log("success");
    });
  };
  return (
    <div class="AddProperty">
      <center>
        <h1>Owner Add Property</h1>
        <hr />
        <form>
          Owner Email:
          <input
            type="text"
            name="oemail"
            onChange={(event) => {
              setOemail(event.target.value);
            }}
          />
          <br />

          Property Name:
          <input
            type="text"
            name="pname"
            onChange={(event) => {
              setPname(event.target.value);
            }}
          />
          <br />

          Description
          <input
            type="text"
            name="desp"
            onChange={(event) => {
              setDesp(event.target.value);
            }}
          />
          <br />

          Street:
          <input
            type="text"
            name="street"
            onChange={(event) => {
              setStreet(event.target.value);
            }}
          />
          <br />

          City:
          <input
            type="text"
            name="city"
            onChange={(event) => {
              setCity(event.target.value);
            }}
          />
          <br />

          State:
          <input
            type="text"
            name="state"
            onChange={(event) => {
              setState(event.target.value);
            }}
          />
          <br />

          Zip:
          <input
            type="text"
            name="zip"
            onChange={(event) => {
              setZip(event.target.value);
            }}
          />
          <br />

          Cost:
          <input
            type="text"
            name="cost"
            onChange={(event) => {
              setCost(event.target.value);
            }}
          />
          <br />

          Nearest Airport:
          <input
            type="text"
            name="nearestAirport"
            onChange={(event) => {
              setNearestAirport(event.target.value);
            }}
          />
          <br />

          Distance to Airport:
          <input
            type="text"
            name="distAirport"
            onChange={(event) => {
              setDisAirport(event.target.value);
            }}
          />
          <br />

          Capacity:
          <input
            type="text"
            name="capacity"
            onChange={(event) => {
              setCapacity(event.target.value);
            }}
          />
          <br />

          <hr />


          <button>
          <Link to="/owner-home">Back</Link>
          </button>
          {' '}
          <button onClick={addProperty}>add</button>
          <br />


        </form>
      </center>
    </div>




  );
}
export default OwnerAddProperty;


