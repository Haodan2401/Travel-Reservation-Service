import { useState } from "react";
import Axios from "axios";
import { render } from "@testing-library/react";
import { Link } from "react-router-dom";

function ViewProperties() {
  const [propertyList, setPropertyList] = useState([]);
  const [capacity1, setCapacity1] = useState(0);
  const [capacity2, setCapacity2] = useState(0);

  const getPropertyList = () => {
    Axios.get("http://localhost:4000/selectProperty").then((res) => {
      setPropertyList(res.data);
      //console.log(res);
    });
  };

  const filter = () => {
    var temp = [];
    propertyList.forEach((val) => {
      if (val.capacity >= capacity1 && val.capacity <= capacity2) {
        temp.push(val);
      }
    });
    setPropertyList(temp);
    render();
  };

  const sortList = () => {
    var temp2 = [];
    propertyList.forEach((val) => {
      temp2.push(val);
    });
    temp2.sort(function (x, y) {
      if (x.cost_per_night < y.cost_per_night) {
        return -1;
      }
      if (x.cost_per_night > y.cost_per_night) {
        return 1;
      }
      return 0;
    });
    console.log(temp2);
    setPropertyList(temp2);
    render();
  };

  const desortList = () => {
    var temp2 = [];
    propertyList.forEach((val) => {
      temp2.push(val);
    });
    temp2.sort(function (x, y) {
      if (x.cost_per_night < y.cost_per_night) {
        return 1;
      }
      if (x.cost_per_night > y.cost_per_night) {
        return -1;
      }
      return 0;
    });
    console.log(temp2);
    setPropertyList(temp2);
    render();
  };


  return (
    <div>
      <button onClick={getPropertyList}>Properties</button>
      <button>
          <Link to="/customer-home">Back</Link>
      </button>
      <br/>
      set capacity:
        from
        <input
          type="text"
          name="capacity1"
          onChange={(event) => {
            setCapacity1(event.target.value);
          }}
        />
        to
        <input
          type="text"
          name="capacity2"
          onChange={(event) => {
            setCapacity2(event.target.value);
          }}
        />
        <button onClick={filter}>filter</button>
        <br/> 
        <button onClick={sortList}>ascending sort</button>
        <button onClick={desortList}>descending sort</button>
      <table>
        <tr>
          <th>property_name</th>
          <th>address</th>
          <th>description</th>
          <th>average_rating_score</th>
          <th>capacity</th>
          <th>cost_per_night</th>
        </tr>
        {propertyList.map((val, key) => {
          return (
            <tr>
              <td>{val.property_name}</td>
              <td>{val.address}</td>
              <td>{val.address}</td>
              <td>{val.average_rating_score}</td>
              <td>{val.capacity}</td>
              <td>{val.cost_per_night}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default ViewProperties;
