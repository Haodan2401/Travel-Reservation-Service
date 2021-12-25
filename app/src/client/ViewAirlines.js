import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function ViewAirlines() {
  const [airlineList, setAirlineList] = useState([]);
  const [name, setName] = useState("");
  const [asc1, setAsc1] = useState(true);
  const [asc2, setAsc2] = useState(true);
  const [asc3, setAsc3] = useState(true);

  const reset = () => {
    Axios.get("http://localhost:4000/view-airlines").then((res) => {
      setAirlineList(res.data);
    });
  };

  const filter = () => {
    var temp = [];
    airlineList.forEach((val) => {
      if (val.airline_name === name) {
        temp.push(val);
      }
    });
    setAirlineList(temp);
    // render();
  };

  const sortByRating = () => {
    var temp = [];
    airlineList.forEach((val) => {
      temp.push(val);
    });
    temp.sort(function (x, y) {
      if (asc1) {
        if (x.rating < y.rating) {
          return -1;
        }
        if (x.rating > y.rating) {
          return 1;
        }
        return 0;
      } else {
        if (x.rating < y.rating) {
          return 1;
        }
        if (x.rating > y.rating) {
          return -1;
        }
        return 0;
      }
    });
    setAsc1(!asc1);
    setAirlineList(temp);
    // render();
  };

  const sortByTotal = () => {
    var temp = [];
    airlineList.forEach((val) => {
      temp.push(val);
    });
    temp.sort(function (x, y) {
      if (asc2) {
        if (x.total_flights < y.total_flights) {
          return -1;
        }
        if (x.total_flights > y.total_flights) {
          return 1;
        }
        return 0;
      } else {
        if (x.total_flights < y.total_flights) {
          return 1;
        }
        if (x.total_flights > y.total_flights) {
          return -1;
        }
        return 0;
      }
    });
    setAsc2(!asc2);
    setAirlineList(temp);
    // render();
  };

  const sortByCost = () => {
    var temp = [];
    airlineList.forEach((val) => {
      temp.push(val);
    });
    temp.sort(function (x, y) {
      if (asc3) {
        if (x.min_flight_cost < y.min_flight_cost) {
          return -1;
        }
        if (x.min_flight_cost > y.min_flight_cost) {
          return 1;
        }
        return 0;
      } else {
        if (x.min_flight_cost < y.min_flight_cost) {
          return 1;
        }
        if (x.min_flight_cost > y.min_flight_cost) {
          return -1;
        }
        return 0;
      }
    });
    setAsc3(!asc3);
    setAirlineList(temp);
    //render();
  };
  return (
    <div>
      <table>
        <tr>
          <th>airline_name</th>
          <th>rating</th>
          <th>total_flights</th>
          <th>min_flight_cost</th>
        </tr>
        {airlineList.map((val, key) => {
          return (
            <tr>
              <td>{val.airline_name}</td>
              <td>{val.rating}</td>
              <td>{val.total_flights}</td>
              <td>{val.min_flight_cost}</td>
            </tr>
          );
        })}
      </table>
      <br />
      <form>
        Name:{" "}
        <input type="text" onChange={(val) => setName(val.target.value)} />
      </form>
      <br />
      <button onClick={reset}>reset</button>
      <br />
      <br />
      <button onClick={filter}>filter</button>
      <br />
      <br />
      <button onClick={sortByRating}>sort by rating</button>
      <br />
      <br />
      <button onClick={sortByTotal}>sort by total flights</button>
      <br />
      <br />
      <button onClick={sortByCost}>sort by minimum flight cost</button>
      <br />
      <br />
      <button>
        <Link to="/admin-home">Back</Link>
      </button>
    </div>
  );
}

export default ViewAirlines;