import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function CancelFlight() {
  const [cemail, setCemail] = useState("");
  const [fnum, setFnum] = useState("");
  const [airline, setAirline] = useState("");
  const [cdate, setCdate] = useState("");
  const [flightList, setFlightList] = useState([]);

  const getFlightList = () => {
    Axios.get("http://localhost:4000/get-cancel-flight").then((res) => {
      setFlightList(res.data);
      //console.log(res);
    });
  };

  const cancelFlight = () => {
    Axios.post("http://localhost:4000/cancel-flight", {
      cemail: cemail,
      fnum: fnum,
      airline: airline,
      cdate: cdate,
    }).then(() => {
      console.log("success");
    });
  };

  return (
    <div class="cancel-flight">
      <center>
        <h1>Cancel Flight</h1>
        <hr />
        <button onClick={getFlightList}>show flight</button>
        <table>
          <tr>
            <th>Customer Email</th>
            <th>Airline</th>
            <th>Flight Num</th>
            <th>Flight Date</th>
          </tr>
          {flightList.map((val) => {
            return (
              <tr>
                <td>{val.Customer}</td>
                <td>{val.Airline_Name}</td>
                <td>{val.Flight_Num}</td>
                <td>{val.Flight_Date}</td>
              </tr>
            );
          })}
        </table>
        <hr />
        <form>
          Customer Email:
          <input
            type="text"
            name="cemail"
            onChange={(event) => {
              setCemail(event.target.value);
            }}
          />
          <br />
          Flight Number:
          <input
            type="text"
            name="fnum"
            onChange={(event) => {
              setFnum(event.target.value);
            }}
          />
          <br />
          Airline:
          <select
            class="airline"
            onChange={(event) => {
              setAirline(event.target.value);
            }}
          >
            <option value="choose">Choose an Airline to cancel</option>
            {flightList.map((val) => {
              return (
                <option value={val.Airline_Name}>{val.Airline_Name}</option>
              );
            })}
            {flightList.map((val) => {
              return (
                <option value={val.Airline_Name}>{val.Airline_Name}</option>
              );
            })}
          </select>
          <br />
          Current Date:
          <input
            type="text"
            name="cdate"
            onChange={(event) => {
              setCdate(event.target.value);
            }}
          />
        </form>
        <hr />
        <button>
          <Link to="/customer-home">Back</Link>
        </button>
        <button onClick={cancelFlight}>Cancel</button>
      </center>
    </div>
  );
}

export default CancelFlight;
