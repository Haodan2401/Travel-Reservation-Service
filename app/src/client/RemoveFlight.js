import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import currentDate from "./data";

function RemoveFlight() {
  const [fnum, setFnum] = useState("");
  const [airline, setAirline] = useState("");
  const [fdate, setFdate] = useState("");
  const [flightList, setFlightList] = useState([]);

  const [sdate, setSdate] = useState("");
  const [edate, setEdate] = useState("");
  const [asc1, setAsc1] = useState(true);
  const [asc2, setAsc2] = useState(true);
  const [asc3, setAsc3] = useState(true);

  const reset = () => {
    Axios.get("http://localhost:4000/get-flight").then((res) => {
      setFlightList(res.data);
    });
  };

  const filter = () => {
    var temp = [];
    const start = Date.parse(sdate);
    const end = Date.parse(edate);
    flightList.forEach((val) => {
      const cur = Date.parse(val.Flight_Date);
      if (cur >= start && cur <= end) {
        temp.push(val);
      }
    });
    setFlightList(temp);
    //render();
  };

  const sortByAirline = () => {
    var temp = [];
    flightList.forEach((val) => {
      temp.push(val);
    });
    temp.sort(function (x, y) {
      if (asc1) {
        if (x.Airline_Name < y.Airline_Name) {
          return -1;
        }
        if (x.Airline_Name > y.Airline_Name) {
          return 1;
        }
        return 0;
      } else {
        if (x.Airline_Name < y.Airline_Name) {
          return 1;
        }
        if (x.Airline_Name > y.Airline_Name) {
          return -1;
        }
        return 0;
      }
    });
    setAsc1(!asc1);
    setFlightList(temp);
  };

  const sortByNumber = () => {
    var temp = [];
    flightList.forEach((val) => {
      temp.push(val);
    });
    temp.sort(function (x, y) {
      if (asc2) {
        if (parseInt(x.Flight_num) < parseInt(y.Flight_num)) {
          return -1;
        }
        if (parseInt(x.Flight_num) > parseInt(y.Flight_num)) {
          return 1;
        }
        return 0;
      } else {
        if (parseInt(x.Flight_num) < parseInt(y.Flight_num)) {
          return 1;
        }
        if (parseInt(x.Flight_num) > parseInt(y.Flight_num)) {
          return -1;
        }
        return 0;
      }
    });
    setAsc2(!asc2);
    setFlightList(temp);
  };

  const sortByDate = () => {
    var temp = [];
    flightList.forEach((val) => {
      temp.push(val);
    });
    temp.sort(function (x, y) {
      const x_time = Date.parse(x.Flight_Date);
      const y_time = Date.parse(y.Flight_Date);
      if (asc3) {
        if (x_time < y_time) {
          return -1;
        }
        if (x_time > y_time) {
          return 1;
        }
        return 0;
      } else {
        if (x_time < y_time) {
          return 1;
        }
        if (x_time > y_time) {
          return -1;
        }
        return 0;
      }
    });
    setAsc3(!asc3);
    setFlightList(temp);
  };

  const removeFlight = () => {
    Axios.post("http://localhost:4000/remove-flight", {
      fnum: fnum,
      airline: airline,
      fdate: fdate,
    }).then((res) => {
      console.log(res);
    });
  };

  return (
    <div class="remove-flight">
      <center>
        <h1>Remove Flight</h1>
        <hr />
        current date : {currentDate.date}
        <br />
        <form>
          start date:
          <input
            type="text"
            name="sdate"
            onChange={(event) => {
              setSdate(event.target.value);
            }}
          />
          end date:
          <input
            type="text"
            name="fnum"
            onChange={(event) => {
              setEdate(event.target.value);
            }}
          />
        </form>
        <br />
        <button onClick={reset}>reset</button>
        <br />
        <button onClick={filter}>filter</button>
        <br />
        <button onClick={sortByAirline}>sort by airline</button>
        <br />
        <button onClick={sortByNumber}>sort by number</button>
        <br />
        <button onClick={sortByDate}>sort by date</button>
        <table>
          <tr>
            <th>Airline</th>
            <th>Number</th>
            <th>Date</th>
          </tr>
          {flightList.map((val) => {
            return (
              <tr>
                <td>{val.Airline_Name}</td>
                <td>{val.Flight_num}</td>
                <td>{val.Flight_Date}</td>
              </tr>
            );
          })}
        </table>
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
            <option value="choose">Choose an Airline</option>
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
          Flight Date:
          <input
            type="text"
            name="fdate"
            onChange={(event) => {
              setFdate(event.target.value);
            }}
          />
          <br />
        </form>
        <hr />
        <button>
          <Link to="/admin-home">Cancel</Link>
        </button>
        <button onClick={removeFlight}>Remove</button>
      </center>
    </div>
  );
}

export default RemoveFlight;
