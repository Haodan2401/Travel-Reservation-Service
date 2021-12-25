import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import currentDate from "./data";

function BookFlight() {
  const [customerEmail, setCustomerEmail] = useState("");
  const [fnum, setFnum] = useState("");
  const [airline, setAirline] = useState("");
  const [seatsNum, setSeatsNum] = useState(0);
  const [cDate, setCDate] = useState("");

  const [flightList, setFlightList] = useState([]);

  const getFlightList = () => {
    Axios.get("http://localhost:4000/get-book-flight").then((res) => {
      setFlightList(res.data);
    });
    setCustomerEmail(currentDate.email);
    setCDate(currentDate.date);
    console.log(currentDate.date,currentDate.email);
  };

  const bookFlight = () => {

    Axios.post("http://localhost:4000/book-flight", {
      customerEmail:customerEmail,
      fnum: fnum,
      airline: airline,
      seatsNum: seatsNum,
      cDate: cDate,
    }).then(() => {
      console.log("success");
    });
  };

  return (
    <div class="book-flight">
      <center>
        <h1>Book Flight</h1>
        <hr />
        <button onClick={getFlightList}>show flight</button>
        <table>
          <tr>
            <th>Airline</th>
            <th>Flight Num</th>
            <th>Available seats</th>
          </tr>
          {flightList.map((val) => {
            return (
              <tr>
                <td>{val.airline}</td>
                <td>{val.flight_id}</td>
                <td>{val.num_empty_seats}</td>
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
            <option value="choose">Choose an Airline to book</option>
            {flightList.map((val) => {
              return <option value={val.airline}>{val.airline}</option>;
            })}
          </select>
          <br />
          Number of Seats:
          <input
            type="text"
            name="seats"
            onChange={(event) => {
              setSeatsNum(event.target.value);
            }}
          />
          <br />
        </form>
        <hr />
        <button>
          <Link to="/customer-home">Back</Link>
        </button>
        <button onClick={bookFlight}>Book</button>
      </center>
    </div>
  );
}

export default BookFlight;
