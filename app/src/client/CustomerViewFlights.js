import { useState } from "react";
import Axios from "axios";
import { render } from "@testing-library/react";

function CustomerViewFlights() {
  const [flightList, setFlightList] = useState([]);
  const [seats, SetSeats] = useState(0);

  const filter = () => {
    var temp = [];
    flightList.forEach((val) => {
      if (val.num_empty_seats >= seats) {
        temp.push(val);
      }
    });
    setFlightList(temp);
    render();
  };

  const getFlightList = () => {
    Axios.get("http://localhost:4000/selectFlight").then((res) => {
      setFlightList(res.data);
      console.log(res.data);
    });
  };  

  return (
    <div>
      <h1> View Flights </h1>  
      <button onClick={getFlightList}>View Flights</button>
      Available seats:
      <input
          type="text"
          name="seats"
          onChange={(event) => {
            SetSeats(event.target.value);
          }}
        />
        <button onClick={filter}>filter</button>
        <br />   
      <table>
        <tr>
          <th>flight_id</th>
          <th>flight_date</th>
          <th>airline</th>
          <th>destination</th>
          <th>seat_cost</th>
          <th>num_empty_seats</th>
          <th>total_spent</th>
        </tr>
        {flightList.map((val, key) => {
          return (
            <tr>
              <td>{val.flight_id}</td>
              <td>{val.flight_date}</td>
              <td>{val.airline}</td>
              <td>{val.destination}</td>
              <td>{val.seat_cost}</td>
              <td>{val.num_empty_seats}</td>
              <td>{val.total_spent}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default CustomerViewFlights;
