
import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function ViewAirports() {
  const [airportList, setAirportList] = useState([]);
  const [id, setId] = useState("");
  const [timezone, setTimezone] = useState("");
  const [asc1, setAsc1] = useState(true);
  const [asc2, setAsc2] = useState(true);
  const [asc3, setAsc3] = useState(true);

  const reset = () => {
    Axios.get("http://localhost:4000/view-airports").then((res) => {
      setAirportList(res.data);
      //console.log(res);
    });
  };

  const filter = () => {
    var temp = [];
    airportList.forEach((val) => {
      if (val.Airport_Id === id && val.Time_Zone === timezone) {
        temp.push(val);
      }
    });
    setAirportList(temp);
    // render();
  };

  const sortById = () => {
    var temp = [];
    airportList.forEach((val) => {
      temp.push(val);
    });
    temp.sort(function (x, y) {
      if (asc1) {
        if (x.Airport_Id < y.Airport_Id) {
          return -1;
        }
        if (x.Airport_Id > y.Airport_Id) {
          return 1;
        }
        return 0;
      } else {
        if (x.Airport_Id < y.Airport_Id) {
          return 1;
        }
        if (x.Airport_Id > y.Airport_Id) {
          return -1;
        }
        return 0;
      }
    });
    setAsc1(!asc1);
    setAirportList(temp);
    //render();
  };

  const sortByName = () => {
    var temp = [];
    airportList.forEach((val) => {
      temp.push(val);
    });
    temp.sort(function (x, y) {
      if (asc2) {
        if (x.Airport_Name < y.Airport_Name) {
          return -1;
        }
        if (x.Airport_Name > y.Airport_Name) {
          return 1;
        }
        return 0;
      } else {
        if (x.Airport_Name < y.Airport_Name) {
          return 1;
        }
        if (x.Airport_Name > y.Airport_Name) {
          return -1;
        }
        return 0;
      }
    });
    setAsc2(!asc2);
    setAirportList(temp);
    //render();
  };

  const sortByTimezone = () => {
    var temp = [];
    airportList.forEach((val) => {
      temp.push(val);
    });
    temp.sort(function (x, y) {
      if (asc3) {
        if (x.Time_Zone < y.Time_Zone) {
          return -1;
        }
        if (x.Time_Zone > y.Time_Zone) {
          return 1;
        }
        return 0;
      } else {
        if (x.Time_Zone < y.Time_Zone) {
          return 1;
        }
        if (x.Time_Zone > y.Time_Zone) {
          return -1;
        }
        return 0;
      }
    });
    setAsc3(!asc3);
    setAirportList(temp);
    //render();
  };
  return (
    <div>
      <h1> View Airports </h1>
      <br />
      <table>
        <tr>
          <th>
            ID
          </th>
          <th>
            Name
          </th>
          <th>
            Time Zone
          </th>
          <th>Address</th>
        </tr>
        {airportList.map((val, key) => {
          return (
            <tr>
              <td>{val.Airport_Id} </td>
              <td>{val.Airport_Name} </td>
              <td>{val.Time_Zone} </td>
              <td>{val.Address}</td>
            </tr>
          );
        })}
      </table>
      <br />
      <form>
        ID:
        <br />
        <input
          type="text"
          name="id"
          onChange={(event) => {
            setId(event.target.value);
          }}
        />
        <br />
      </form>
      <select
        class="timezone"
        onChange={(event) => {
          setTimezone(event.target.value);
        }}
      >
        <option value="NA">Please choose a time zone</option>
        <option value="EST">EST</option>
        <option value="CST">CST</option>
        <option value="PST">PST</option>
      </select>
      <br />
      <br />
      <button onClick={reset}>reset</button>

      <br />
      <br />
      <button onClick={filter}>filter</button>
      <br />
      <br />
      <button onClick={sortById}>sort by ID</button>
      <br />
      <br />
      <button onClick={sortByName}>sort by Name</button>
      <br />
      <br />
      <button onClick={sortByTimezone}>sort by Time zone</button>
      <br />
      <br />
      <button>
        <Link to="/admin-home">Back</Link>
      </button>
    </div>
  );
}

export default ViewAirports;