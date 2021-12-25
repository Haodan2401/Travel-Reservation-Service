import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import currentDate from "./data";

function ScheduleFlight() {
  const [fnum, setFnum] = useState("");
  const [airline, setAirline] = useState("");
  const [fairport, setFairport] = useState("");
  const [tairport, setTairport] = useState("");
  const [dtime, setDtime] = useState("");
  const [atime, setAtime] = useState("");
  const [fdate, setFdate] = useState("");
  const [cost, setCost] = useState(0);
  const [cap, setCap] = useState(0);

  const scheduleFlight = () => {
    Axios.post("http://localhost:4000/schedule-flight", {
      fnum: fnum,
      airline: airline,
      fairport: fairport,
      tairport: tairport,
      dtime: dtime,
      atime: atime,
      fdate: fdate,
      cost: cost,
      cap: cap,
      cdate: currentDate.date,
    }).then((res) => {
      console.log(res);
    });
  };

  return (
    <div class="schedule-flight">
      <center>
        <h1>Schedule Flight</h1>
        <hr />
        <form>
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
            <option value="NA">Please choose an airline</option>
            <option value="Delta Airlines">Delta Airlines</option>
            <option value="Southwest Airlines">Southwest Airlines</option>
            <option value="American Airlines">American Airlines</option>
            <option value="United Airlines">United Airlines</option>
            <option value="JetBlue Airways">JetBlue Airways</option>
            <option value="Spirit Airlines">Spirit Airlines</option>
            <option value="WestJet">WestJet</option>
            <option value="Interjet">Interjet</option>
          </select>
          <br />
          From Airport:
          <input
            type="text"
            name="fairport"
            onChange={(event) => {
              setFairport(event.target.value);
            }}
          />
          <br />
          To Airport:
          <input
            type="text"
            name="tairport"
            onChange={(event) => {
              setTairport(event.target.value);
            }}
          />
          <br />
          Departure Time:
          <input
            type="text"
            name="dtime"
            onChange={(event) => {
              setDtime(event.target.value);
            }}
          />
          <br />
          Arrival Time:
          <input
            type="text"
            name="atime"
            onChange={(event) => {
              setAtime(event.target.value);
            }}
          />
          <br />
          Flight Date:
          <input
            type="text"
            name="fdate"
            onChange={(event) => {
              setFdate(event.target.value);
            }}
          />
          <br />
          $ Per person:
          <input
            type="number"
            name="cost"
            onChange={(event) => {
              setCost(event.target.value);
            }}
          />
          <br />
          Capacity:
          <input
            type="number"
            name="cap"
            onChange={(event) => {
              setCap(event.target.value);
            }}
          />
          <br />
        </form>
        <hr />
        <button>
          <Link to="/admin-home">Cancel</Link>
        </button>
        <button onClick={scheduleFlight}>Schedule</button>
      </center>
    </div>
  );
}

export default ScheduleFlight;
